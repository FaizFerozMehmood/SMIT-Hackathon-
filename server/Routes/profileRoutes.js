import express from "express";
import {
    createProfile,
    getProfiles,
    getProfileById,
    updateProfile,
    deleteProfile,
} from "../controllers/profileController.js";

const router = express.Router();


router.post("/", createProfile); 
router.get("/", getProfiles); 
router.get("/:id", getProfileById); 
router.put("/:id", updateProfile); 
router.delete("/:id", deleteProfile); 


// app.use("/api/admin", adminRoutes);
// app.use("/api/receptionist", receptionistRoutes);
// app.use("/api/department", departmentRoutes);

export default router;
