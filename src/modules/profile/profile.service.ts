import { pool } from "../../db";

const createProfileIntoDB = async (payload: any) => {
  // console.log(payload);
  // destructuring payload object
  const { user_id, bio, address, phone, gender } = payload;
  // ! first check if user is exist
  const existingUser = await pool.query(
    `
    SELECT * FROM users WHERE id=$1`,
    [user_id],
  );
  // console.log(existingUser);
  if (existingUser.rows.length === 0) {
    throw new Error("User not exist");
  }

  //* create profile
  const result = await pool.query(
    `
      INSERT INTO profile(user_id, bio, address, phone, gender) VALUES($1,$2,$3,$4,$5) RETURNING *
    `,
    [user_id, bio, address, phone, gender],
  );

  console.log("check create user result :", result);
  return result;
};

export const profileService = {
  createProfileIntoDB,
};
