import { type NextFunction, type Request, type Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config/config";
import { pool } from "../db";

export const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // console.log("This is protector route");
    // console.log(req.headers);

    const response = (status: number, message: string, error?: any) => {
      res
        .status(status)
        .json({ success: false, message: message, error: error });
    };

    try {
      const token = req.headers.authorization;
      // console.log(token);

      if (!token) {
        response(401, "Unauthorize access!!");
      }

      //* token validation
      const decode = jwt.verify(
        token as string,
        config.JWT_SECRET as string,
      ) as JwtPayload;
      // console.log(decode);

      const userData = await pool.query(`SELECT * FROM users WHERE email=$1`, [
        decode.email,
      ]);

      // console.log(userData.rows);
      if (userData.rows.length === 0) {
        response(404, "User not found");
      }
      next();
    } catch (error) {
      const e = error as Error;
      response(401, "Invalid token", e);
    }
  };
};
