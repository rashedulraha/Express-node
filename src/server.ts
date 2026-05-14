import express, {
  type Application,
  type Request,
  type Response,
} from "express";
const app: Application = express();
const port = 3000;

// middleware
app.use(express.json());

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
  console.log("Hello user data  and request:", req.body);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
