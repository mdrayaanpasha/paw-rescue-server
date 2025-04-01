import express, { Request, Response } from "express";
import cors from "cors";
import pool from "./config/connectDB";
import AuthRouter from "./routers/auth.router";
import { VolunteerRouter } from "./routers/volunteer.router";
import { AnimalsRouter } from "./routers/animals.router";
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


pool.connect()
.then(()=>{
  console.log("✅ Connected to PostgreSQL");
})
.catch((err)=>{
  console.error("❌ Database connection error:", err);
});


app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/api/auth",AuthRouter);
app.use("/api/volunteer", VolunteerRouter);
app.use("/api/animals", AnimalsRouter);


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});