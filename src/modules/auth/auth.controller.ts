import type { Request, Response } from "express";
import { authService } from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginUserInToDB(req.body);
    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: result,
    });
  } catch (error) {
    const e = error as Error;
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

export const authController = {
  loginUser,
};
