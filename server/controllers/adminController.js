// import User from "../models/userModel.js";
import User from '../Models/userModel.js'

import asyncHandler from "express-async-handler";
// import User from "../models/userModel.js"; // Importing the User model
import bcrypt from "bcrypt";

// @desc    Create a new user
// @route   POST /api/admin/users
// @access  Admin
const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash the password and create the user
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
// @desc    Get all users
// @route   GET /api/admin/users
// @access  Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select("-password"); // Exclude passwords
    res.status(200).json(users);
  });

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");
  
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  });

  // @desc    Update user details
// @route   PUT /api/admin/users/:id
// @access  Admin
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
  
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.role = req.body.role || user.role;
  
      const updatedUser = await user.save();
      res.status(200).json({
        _id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  });
  
  // @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
  
    if (user) {
      await user.remove();
      res.status(200).json({ message: "User removed successfully" });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  });
  
    // @desc    Get dashboard metrics
// @route   GET /api/admin/metrics
// @access  Admin
const getMetrics = asyncHandler(async (req, res) => {
    // Example: Mock metrics, replace with actual DB queries
    const metrics = {
      dailyVisitors: 120,
      newBeneficiaries: 50,
      departmentActivity: {
        "Medical Assistance": 30,
        "Financial Aid": 70,
      },
    };
  
    res.status(200).json(metrics);
  });

  
  // @desc    Generate reports
// @route   GET /api/admin/reports
// @access  Admin
const generateReports = asyncHandler(async (req, res) => {
    const { startDate, endDate, department } = req.query;
  
    // Example: Filtered data, replace with actual DB queries
    const reports = [
      {
        cnic: "1234567890123",
        name: "John Doe",
        department: department || "All Departments",
        date: new Date(),
        status: "Completed",
      },
    ];
  
    res.status(200).json(reports);
  });

  
  // @desc    Get logs
// @route   GET /api/admin/logs
// @access  Admin
const getLogs = asyncHandler(async (req, res) => {
    // Example: Replace with actual log queries
    const logs = [
      { action: "User created", timestamp: new Date(), user: "Admin" },
      { action: "Beneficiary registered", timestamp: new Date(), user: "Receptionist" },
    ];
  
    res.status(200).json(logs);
  });
  


  export {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    getMetrics,
    getLogs,
    generateReports,
  };
  









// export const createUser = async (req, res) => {
//     try {
//         const { name, email, password, role } = req.body;
//         const user = await User.create({ name, email, password, role });
//         res.status(201).json(user);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// export const getUsers = async (req, res) => {
//     try {
//         const users = await User.find({});
//         res.json(users);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
