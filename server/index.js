import express from "express";
import cors from "cors"
import { connectDb } from "./connectDatabase.js";
import authRoutes from "./Routes/authRoutes.js"
import dotenv from "dotenv"
import profileRoutes from "./Routes/profileRoutes.js"

import adminRoutes from "./Routes/adminRoutes.js"
// import receptionistRoutes from "./Routes/receptionistRoutes.js"
// import departmentRoutes from "./Routes/departmentRoutes.js"




dotenv.config();
const app = express();
app.use(express.json());
app.use(cors(
  {
    origin: "https://smit-hackathon-6ur9.vercel.app"
  }
))
app.options('*', cors())




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

app.use("/api/admin", adminRoutes);
// app.use("/api/receptionist", receptionistRoutes);
// app.use("/api/department", departmentRoutes);




app.listen(PORT, () => {
  console.log(`server is running on port : http://localhost:${PORT} `);
});