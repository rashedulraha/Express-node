import { Router } from "express";
import { userController } from "./user.controller";
import { auth } from "../../middleware/auth";

const router = Router();

//* auth middleware

//* post user data
router.post("/", userController.createUser);
//* get user //! landing route
router.get("/", auth("admin", "agent"), userController.getAllExistingUser);
// * user get by id
router.get("/:id", userController.getSingleUser);
//* update existing user
router.put("/:id", userController.updateExistingUser);
// * delete user id by
router.delete("/:id", userController.deleteExistingUser);

export const userRoute = router;
