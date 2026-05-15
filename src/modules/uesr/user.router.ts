import { Router, type Request, type Response } from "express";
import { pool } from "../../db";

const router = Router();

//* landing route
router.get("/", (req: Request, res: Response) => {
  res.json({ success: true, message: "Welcome to the main server" });
});

//* post user data
router.post("/", async (req: Request, res: Response) => {
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

export const userRoute = router;
