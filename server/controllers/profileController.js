import Profile from "../Models/profileModel.js"
import { sendResponse } from "../utils/sendResponse.js";

export const createProfile = async (req, res) => {
    const { name, email, age, address } = req.body;

    try {
        const profile = await Profile.create({ name, email, age, address });
        sendResponse(res, 201, profile, false, "Profile created successfully");
    } catch (err) {
        sendResponse(res, 500, null, true, "Failed to create profile");
    }
};

export const getProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find();
        sendResponse(res, 200, profiles, false, "Profiles fetched successfully");
    } catch (err) {
        sendResponse(res, 500, null, true, "Failed to fetch profiles");
    }
};

export const getProfileById = async (req, res) => {
    const { id } = req.params;

    try {
        const profile = await Profile.findById(id);
        if (!profile) {
            return sendResponse(res, 404, null, true, "Profile not found");
        }
        sendResponse(res, 200, profile, false, "Profile fetched successfully");
    } catch (err) {
        sendResponse(res, 500, null, true, "Failed to fetch profile");
    }
};

export const updateProfile = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const profile = await Profile.findByIdAndUpdate(id, updates, { new: true });
        if (!profile) {
            return sendResponse(res, 404, null, true, "Profile not found");
        }
        sendResponse(res, 200, profile, false, "Profile updated successfully");
    } catch (err) {
        sendResponse(res, 500, null, true, "Failed to update profile");
    }
};

export const deleteProfile = async (req, res) => {
    const { id } = req.params;

    try {
        const profile = await Profile.findByIdAndDelete(id);
        if (!profile) {
            return sendResponse(res, 404, null, true, "Profile not found");
        }
        sendResponse(res, 200, profile, false, "Profile deleted successfully");
    } catch (err) {
        sendResponse(res, 500, null, true, "Failed to delete profile");
    }
};
