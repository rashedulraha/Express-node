import express, {
  type Application,
  type Request,
  type Response,
} from "express";

import { pool } from "./db";
import { userRoute } from "./modules/uesr/user.router";

export const app: Application = express();

//* middleware
app.use(express.json());

// router using router
app.use("/api/users", userRoute);

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
