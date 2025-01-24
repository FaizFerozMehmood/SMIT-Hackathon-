import Joi from "joi";

export const registerSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        "string.base": "Name must be a string",
        "string.empty": "Name is required",
        "string.min": "Name must have at least 3 characters",
        "string.max": "Name cannot exceed 30 characters",
    }),
    email: Joi.string().email().required().messages({
        "string.email": "Invalid email address",
        "string.empty": "Email is required",
    }),
    password: Joi.string().min(6).max(20).required().messages({
        "string.empty": "Password is required",
        "string.min": "Password must have at least 6 characters",
        "string.max": "Password cannot exceed 20 characters",
    }),
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "Invalid email address",
        "string.empty": "Email is required",
    }),
    password: Joi.string().min(6).max(20).required().messages({
        "string.empty": "Password is required",
        "string.min": "Password must have at least 6 characters",
        "string.max": "Password cannot exceed 20 characters",
    }),
});
