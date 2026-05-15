import { Pool } from "pg";
import config from "../config/config";

//* create pool express to postgressql
export const pool = new Pool({
  connectionString: config.connection_string,
});

//* init db
export const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        is_active BOOLEAN DEFAULT true,
        age INT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log("Database connected and users table created successfully");
  } catch (error) {
    const e = error as Error;
    console.error("Database initialization error:", e.message);
  }
};
