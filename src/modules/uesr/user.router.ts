import { Router, type Request, type Response } from "express";
import { pool } from "../../db";
import { userController } from "./user.controller";

const router = Router();

//* post user data
router.post("/", userController.createUser);

//* get user //! landing route
router.get("/", async (req: Request, res: Response) => {
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

export const userRoute = router;
