import Career from '../models/careerModal.js';
import { apiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asynchandler.js';

// Add Career
const addCareer = asyncHandler(async (req, res) => {
    try {
        const { title, phone, email, cv, exp } = req.body;

        if (!title || !phone || !email || !cv || !exp) {
            return res.status(400).json(new apiResponse(400, null, "All career fields are required."));
        }

        const newCareer = new Career({ title, phone, email, cv, exp });
        await newCareer.save();

        res.status(201).json(new apiResponse(201, newCareer, "Career added successfully."));
    } catch (error) {
        console.error("Error adding career:", error);
        res.status(500).json(new apiResponse(500, null, error.message));
    }
});

// Get All Careers
const getAllCareers = asyncHandler(async (req, res) => {
    try {
        const careers = await Career.find();

        if (!careers.length) {
            return res.status(404).json(new apiResponse(404, null, "No careers found."));
        }

        res.status(200).json(new apiResponse(200, careers, "Careers fetched successfully."));
    } catch (error) {
        console.error("Error fetching careers:", error);
        res.status(500).json(new apiResponse(500, null, error.message));
    }
});

// Get Career by ID
const getCareerById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const career = await Career.findById(id);

        if (!career) {
            return res.status(404).json(new apiResponse(404, null, "Career not found."));
        }

        res.status(200).json(new apiResponse(200, career, "Career fetched successfully."));
    } catch (error) {
        console.error("Error fetching career:", error);
        res.status(500).json(new apiResponse(500, null, error.message));
    }
});

// Update Career
const updateCareer = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updateFields = req.body;

    try {
        const updatedCareer = await Career.findByIdAndUpdate(id, updateFields, { new: true, runValidators: true });

        if (!updatedCareer) {
            return res.status(404).json(new apiResponse(404, null, "Career not found."));
        }

        res.status(200).json(new apiResponse(200, updatedCareer, "Career updated successfully."));
    } catch (error) {
        console.error("Error updating career:", error);
        res.status(500).json(new apiResponse(500, null, error.message));
    }
});

// Delete Career
const deleteCareer = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCareer = await Career.findByIdAndDelete(id);

        if (!deletedCareer) {
            return res.status(404).json(new apiResponse(404, null, "Career not found."));
        }

        res.status(200).json(new apiResponse(200, null, "Career deleted successfully."));
    } catch (error) {
        console.error("Error deleting career:", error);
        res.status(500).json(new apiResponse(500, null, error.message));
    }
});

export {
    addCareer,
    getAllCareers,
    getCareerById,
    updateCareer,
    deleteCareer,
};
