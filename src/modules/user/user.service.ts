import type { QueryResult } from "pg";
import { pool } from "../../db";
import type { IUser } from "./user.interface";

//* create new user  and into db
const createUserIntoDb = async (payload: IUser) => {
  const { name, email, password, age } = payload;
  const result = await pool.query(
    `INSERT INTO users(name,email,password,age) VALUES($1,$2,$3,$4)RETURNING *`,
    [name, email, password, age],
  );
  return result;
};

// * get all existing user
const getAllExistingUser = async (): Promise<QueryResult> => {
  const result = await pool.query(`
      SELECT * FROM users`);
  console.log("check result ", result);
  return result;
};

//* get single user find by id.
const getSingleUserFindById = async (id: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE id=$1`, [id]);
  return result;
};

//* update existing user
const UpdateExistingUser = async (payload: IUser, id: string) => {
  const { name, email, password, is_active, age } = payload;
  const result = await pool.query(
    `UPDATE users
    SET
    name = COALESCE($1, name),
    email = COALESCE($2, email),
    password = COALESCE($3, password),
    is_active = COALESCE($4, is_active),
    age = COALESCE($5, age),
    updated_at = NOW()
        WHERE id = $6
        RETURNING *;
  `,
    [name, email, password, is_active, age, id],
  );
  return result;
};

//* delete existing user
const deleteExistingUser = async (id: string) => {
  const result = await pool.query(
    `DELETE FROM users WHERE id = $1 RETURNING *`,
    [id],
  );
  return result;
};
// export all function
export const userService = {
  createUserIntoDb,
  getAllExistingUser,
  getSingleUserFindById,
  UpdateExistingUser,
  deleteExistingUser,
};
