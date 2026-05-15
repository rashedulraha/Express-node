import express, {
  type Application,
  type Request,
  type Response,
} from "express";

import { pool } from "./db";
import { userRoute } from "./modules/uesr/user.router";

export const app: Application = express();

//* middleware
app.use(express.json());

// router using router
app.use("/api/users", userRoute);
