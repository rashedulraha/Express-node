import express, {
  type Application,
  type Request,
  type Response,
} from "express";

// import dotenv
import dotenv from "dotenv";
dotenv.config();

//* import pg admin

import { initDB, pool } from "./db";
import config from "./config/config";
export const app: Application = express();
export const port = config.port;

//* middleware
app.use(express.json());

initDB();

//* post user data
app.post("/api/create-user", async (req: Request, res: Response) => {
  // console.log("Hello user data  and request:", req.body);
  const { name, email, password, age } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO users(name,email,password,age) VALUES($1,$2,$3,$4)RETURNING *`,
      [name, email, password, age],
    );
    res.status(result.rows.length === 0 ? 400 : 200).json({
      success: result.rows.length === 0 ? false : true,
      message:
        result.rows.length === 0
          ? "user create failed"
          : "User create successfully",
      result: result.rows[0],
    });
  } catch (error) {
    const e = error as Error;
    res.status(400).json({
      message: e.message,
      error: e,
    });
  }
  // console.log(result);
});

//* get user
app.get("/api/get-all-users", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT * FROM users`);

    res.status(result.rows.length === 0 ? 400 : 200).json({
      success: result.rows.length === 0 ? false : true,
      message:
        result.rows.length === 0 ? "user not found" : "user get successfully",
      result: result.rows || [],
    });
  } catch (error) {
    const e = error as Error;
    res.status(400).json({
      message: e.message,
      error: e,
    });
  }
});

// * user get by id
app.get("/api/get-user/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  // console.log(id);
  try {
    const result = await pool.query(`SELECT * FROM users WHERE id=$1`, [id]);
    res.status(result.rows.length === 0 ? 400 : 200).json({
      success: result.rows.length === 0 ? false : true,
      message: result.rows.length === 0 ? "user not found" : "user found",
      data: result.rows || [],
    });
  } catch (error) {
    const e = error as Error;
    res.json({
      message: e.message,
      error: e,
    });
  }
});

//* patch user by id
app.put("/api/update-user/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, password, is_active, age } = req.body;
  // console.log(id, name);

  try {
    const result = await pool.query(
      `UPDATE users
    SET
    name = COALESCE($1, name),
    email = COALESCE($3, email),
    password = COALESCE($4, password),
    is_active = COALESCE($5, is_active),
    age = COALESCE($6, age),
    updated_at = NOW()
        WHERE id = $2
        RETURNING *;
  `,
      [name, id, email, password, is_active, age],
    );
    // console.log(result);
    res.status(result.rows.length === 0 ? 400 : 200).json({
      success: result.rows.length === 0 ? false : true,
      message:
        result.rows.length === 0
          ? "User not found"
          : "User Update successfully",
    });
  } catch (error) {
    const e = error as Error;
    res.json({
      message: e.message,
      error: e,
    });
  }
});

// * delete user id by
app.delete("/api/delete-user/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `DELETE FROM users WHERE id = $1 RETURNING *`,
      [id],
    );
    res.status(result.rows.length === 0 ? 400 : 200).json({
      success: result.rows.length === 0 ? false : true,
      message:
        result.rows.length === 0
          ? "User not found"
          : "User delete successfully complete",
    });
  } catch (error) {
    const e = error as Error;
    res.json({
      message: e.message,
      error: e,
    });
  }
});
