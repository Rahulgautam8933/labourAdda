import mongoose from "mongoose";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const uploadImage = asyncHandler(async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded." });
        }
        const imageUrl = req.file.path;
        const response = new apiResponse(200, imageUrl, "Customer created successfully");
        res.status(201).json(response);
    } catch (error) {
        console.log("error", error);
        res.status(400).json({ message: error.message });
    }
});

// Add labour handler
const addLabour = asyncHandler(async (req, res) => {
    const { name, role, imageUrl } = req.body;

    // Validate request
    if (!name || !role) {
        return res.status(400).json({ message: "Name and role are required." });
    }

    try {
        // Assuming you have a Labour model
        const newLabour = new Labour({ name, role, imageUrl });
        await newLabour.save();
        res.status(201).json({ message: "Labour added successfully!", labour: newLabour });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export {
    addLabour,
    uploadImage
};
