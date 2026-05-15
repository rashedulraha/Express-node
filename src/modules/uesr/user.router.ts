import { Router, type Request, type Response } from "express";
import { pool } from "../../db";
import { userController } from "./user.controller";

const router = Router();

//* post user data
router.post("/", userController.createUser);
//* get user //! landing route
router.get("/", userController.getAllExistingUser);

export const userRoute = router;
