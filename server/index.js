import express from "express";
import cors from "cors"
import { connectDb } from "./connectDatabase.js";
import authRoutes from "./Routes/authRoutes.js"
import dotenv from "dotenv"
dotenv.config();
const app = express();
app.use(express.json());


app.use("/api/auth", authRoutes);

//http://localhost:5000/api/auth//login
//http://localhost:5000/api/auth//register

const PORT = process.env.PORT
connectDb();
console.log("server is running!");


app.get("/", (req, res) => {
  res.send("Yes,your server is working well!");
});


app.listen(PORT, () => {
  console.log(`server is running on port : http://localhost:${PORT} `);
});