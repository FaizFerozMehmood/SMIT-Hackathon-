// import bcrypt from "bcryptjs";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import User from "../Models/userModel.js";
import { sendResponse } from "../utils/sendResponse.js";
//RESISTER
export const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return sendResponse(res, 400, null, true, "User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({ name, email, password: hashedPassword });

        return sendResponse(res, 201, { userId: user._id }, false, "User registered successfully");
    } catch (err) {
        return sendResponse(res, 500, null, true, "Something went wrong");
    }
};
//LOGIN
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return sendResponse(res, 404, null, true, "User not found");
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return sendResponse(res, 400, null, true, "Invalid credentials");
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
       
       

        return sendResponse(res, 200, {...user, token }, false, "Login successful");
    } catch (err) {
        return sendResponse(res, 500, null, true, "Something went wrong");
    }
};
