import express, {
  type Application,
  type Request,
  type Response,
} from "express";

import { userRoute } from "./modules/user/user.route";
import { profileRoute } from "./modules/profile/profile.route";
import { authController } from "./modules/auth/auth.controller";

export const app: Application = express();

//* middleware
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome  to our website" });
});

// router using router
app.use("/api/users", userRoute);
app.use("/api/profile", profileRoute);
app.use("/api/auth", authController.loginUser);
