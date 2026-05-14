import express, {
  type Application,
  type Request,
  type Response,
} from "express";

//* import pg admin
import { Pool, Result } from "pg";
const app: Application = express();
const port = 3000;

//* middleware
app.use(express.json());

//* create pool express to postgressql
const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_r5NlXadOIKn3@ep-nameless-forest-abja3kpt-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
});

//* init db
const initDB = async () => {
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

initDB();

//* routeing system
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/user", (req, res) => {
  res.status(200).json({
    message: "Hello developer",
    author: "Programming hero",
  });
});

//* post user data
app.post("/api/create-user", async (req: Request, res: Response) => {
  // console.log("Hello user data  and request:", req.body);
  const { name, email, password, age } = req.body;

  try {
    const result = await pool.query(
      `
    INSERT INTO users(name,email,password,age) VALUES($1,$2,$3,$4)  
    RETURNING *
    `,
      [name, email, password, age],
    );
    res.status(200).json({
      message: "user created successfully",
      result: result.rows[0],
    });
  } catch (error) {
    const e = error as Error;
    res.status(400).json({
      message: e.message,
      error: e,
    });
  }
  // console.log(result);
});

// get user
app.get("/api/get-all-users", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT * FROM users`);
    res.status(200).json({
      message: "user get successfully",
      result: result.rows,
    });
  } catch (error) {
    const e = error as Error;
    res.status(400).json({
      message: "user get failed",
      error: e,
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
