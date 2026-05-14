import express, {
  type Application,
  type Request,
  type Response,
} from "express";
// import pg admin
import { Pool } from "pg";
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
const initBD = async () => {
  try {
    await pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    age INT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );
`);
    console.log("database connected successfully");
  } catch (error) {
    console.log(error);
  }
};

initBD();

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

// post user data
app.post("/", async (req: Request, res: Response) => {
  // console.log("Hello user data  and request:", req.body);
  const { name, price, password } = req.body;
  res.status(200).json({
    message: "Created",
    data: {
      name,
      price,
    },
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
