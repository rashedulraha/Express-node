import bcrypt from "bcryptjs";
import { pool } from "../../db";
import jwt from "jsonwebtoken";
import config from "../../config/config";

const loginUserInToDB = async (payload: {
  email: string;
  password: string;
}) => {
  const { email, password } = payload;
  // console.log("email and password:", email, password);
  // console.log("email and password:", payload);

  // check if the user exist -> done
  // Compare the password -> done
  // Generate token

  const userData = await pool.query(
    `
      SELECT * FROM users WHERE email=$1 
    `,
    [email],
  );

  if (userData.rows.length === 0) {
    throw new Error("Invalid Credential");
  }
  const user = userData.rows[0];
  // console.log(user.password);
  // console.log(userData);

  const matchPassword = await bcrypt.compare(password, user.password);
  // console.log(user);
  // console.log(matchPassword);
  // console.log(user.password);

  if (!matchPassword) {
    throw new Error("Invalid Credential");
  }

  // Generate token

  const jwtPayload = {
    id: user.id,
    name: user.name,
    role: user.role,
    is_active: user.is_active,
    email: user.email,
  };

  const accessToken = jwt.sign(jwtPayload, config.JWT_SECRET as string, {
    expiresIn: "1d",
  });

  // console.log(accessToken);

  return accessToken;
};

export const authService = {
  loginUserInToDB,
};
