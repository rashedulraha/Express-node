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
