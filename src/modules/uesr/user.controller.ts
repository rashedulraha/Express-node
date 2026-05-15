import type { Request, Response } from "express";
import { userService } from "./user.service";

//* create new user
const createUser = async (req: Request, res: Response) => {
  // console.log("Hello user data  and request:", req.body);
  // const { name, email, password, age } = req.body;

  try {
    const result = await userService.createUserIntoDb(req.body);

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
};

//* get all existing user
const getAllExistingUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllExistingUser();
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
};

export const userController = {
  createUser,
  getAllExistingUser,
};
