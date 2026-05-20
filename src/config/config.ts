import dotenv from "dotenv";
import path from "path";
dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

const config = {
  connection_string: process.env.NEON_DATABASE_CONNECTION_STRING as string,
  port: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_Refresh_Token_SECRET: process.env.JWT_REFRESH_TOKEN,
};

export default config;
