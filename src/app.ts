import express, { type Application } from "express";

import { userRoute } from "./modules/user/user.router";
import { profileRoute } from "./modules/profile/profile.router";

export const app: Application = express();

//* middleware
app.use(express.json());

// router using router
app.use("/api/users", userRoute);
app.use("/api/user/profile", profileRoute);
