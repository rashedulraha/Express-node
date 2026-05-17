import { type NextFunction, type Request, type Response } from "express";

export const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // console.log("This is protector route");
    // console.log(req.headers);

    const token = req.headers.authorization;
    // console.log(token);

    if (!token) {
      res.status(401).json({ success: false, message: "unauthorize access!" });
    }
    next();
  };
};
