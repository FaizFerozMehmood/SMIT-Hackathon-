import mongoose from "mongoose";

const tokenSchema = mongoose.Schema({
    token: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    beneficiary: { type: mongoose.Schema.Types.ObjectId, ref: "Beneficiary" },
});

export default mongoose.model("Token", tokenSchema);
