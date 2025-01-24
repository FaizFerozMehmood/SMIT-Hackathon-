import mongoose from "mongoose";
export async function connectDb() {
    try {
      const con = await mongoose.connect(process.env.MONGO_URI);
      console.log("Connected with DataBase: " + con.connection.host);
    } catch (error) {
      console.log("Data disconnected");
    }
  }