import { pool } from "../../db";

const loginUserInToDB = async (payload: {
  email: string;
  password: string;
}) => {
  const { email, password } = payload;

  // check if the user exist
  // Compare the password
  // Generate token

  const userData = await pool.query(
    `
      SELECT * FROM users WHERE email=$1 
    `,
    [email],
  );

  if (userData.rows.length === 0) {
    throw new Error("User not found");
  }
  console.log(userData);
};

export const authService = {
  loginUserInToDB,
};
