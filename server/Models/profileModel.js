import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    address: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
