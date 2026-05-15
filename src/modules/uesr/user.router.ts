import { Router, type Request, type Response } from "express";
import { pool } from "../../db";
import { userController } from "./user.controller";

const router = Router();

//* post user data
router.post("/", userController.createUser);
//* get user //! landing route
router.get("/", userController.getAllExistingUser);
// * user get by id
router.get("/:id", userController.getSingleUser);
// update existing user
//* patch user by id
router.put("/:id", userController.updateExistingUser);
// * delete user id by
router.delete("/:id", userController.deleteExistingUser);

export const userRoute = router;
