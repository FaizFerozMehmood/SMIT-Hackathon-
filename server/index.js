import express from "express";
import cors from "cors"
import { connectDb } from "./connectDatabase.js";
import authRoutes from "./Routes/authRoutes.js"
import dotenv from "dotenv"
import profileRoutes from "./Routes/profileRoutes.js"
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors(
  {
    origin: "http://localhost:5173"
  }
))




//http://localhost:5000/api/auth//login
//http://localhost:5000/api/auth//register

const PORT = process.env.PORT
connectDb();
console.log("server is running!");


app.get("/", (req, res) => {
  res.send("Yes,your server is working well!");
});



app.use("/api/auth", authRoutes);
app.use("/api/profiles", profileRoutes);






app.listen(PORT, () => {
  console.log(`server is running on port : http://localhost:${PORT} `);
});