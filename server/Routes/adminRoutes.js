import express from "express";
import { createUser, getUsers, getUserById, updateUser, deleteUser, getMetrics, getLogs, generateReports } from "../controllers/adminController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// User Management Routes
router.post("/users", protect, admin, createUser); // Admin can create new users
router.get("/users", protect, admin, getUsers); // Admin can view all users
router.get("/users/:id", protect, admin, getUserById); // Admin can view a specific user
router.put("/users/:id", protect, admin, updateUser); // Admin can update user details
router.delete("/users/:id", protect, admin, deleteUser); // Admin can delete users

// Dashboard Metrics
router.get("/metrics", protect, admin, getMetrics); // Fetch metrics for admin dashboard
router.get("/reports", protect, admin, generateReports); // Generate reports

// Logs and History
router.get("/logs", protect, admin, getLogs); // Fetch all logs for auditing

export default router;
