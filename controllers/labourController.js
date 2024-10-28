import mongoose from "mongoose";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { Country, State, City } from "country-state-city";
import Labor from '../models/labourModal.js';


const uploadImage = asyncHandler(async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json(new apiResponse(400, null, "No file uploaded."));
        }
        const imageUrl = req.file.path;
        const response = new apiResponse(201, imageUrl, "Image uploaded successfully");
        res.status(201).json(response);
    } catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).json(new apiResponse(500, null, error.message));
    }
});


const getCountry = asyncHandler(async (req, res) => {
    try {
        const countries = await Country.getAllCountries();
        res.json(new apiResponse(200, countries, "Countries fetched successfully"));
    } catch (error) {
        console.error("Error fetching countries:", error);
        res.status(500).json(new apiResponse(500, null, error.message));
    }
});

// Get states by country ID
const getStateByCountryId = asyncHandler(async (req, res) => {
    const { CountryId } = req.params;

    try {
        const states = await State.getStatesOfCountry(CountryId);
        if (!states.length) {
            return res.status(404).json(new apiResponse(404, null, "No states found for this country."));
        }
        res.json(new apiResponse(200, states, "States fetched successfully"));
    } catch (error) {
        console.error("Error fetching states:", error);
        res.status(500).json(new apiResponse(500, null, error.message));
    }
});
const getCityByStateId = asyncHandler(async (req, res) => {
    const { StateId } = req.params;
    const selectedCountry = "IN"

    try {
        const citys = await City.getCitiesOfState(selectedCountry, StateId);
        if (!citys.length) {
            return res.status(404).json(new apiResponse(404, null, "No states found for this country."));
        }
        res.json(new apiResponse(200, citys, "States fetched successfully"));
    } catch (error) {
        console.error("Error fetching states:", error);
        res.status(500).json(new apiResponse(500, null, error.message));
    }
});
const addData = asyncHandler(async (req, res) => {
    try {
        // Extract the data from the request body
        const {
            name,
            age,
            mobile,
            category,
            subCategory,
            currentAddress,
            permanentAddress,
            pincode,
            state,
            city,
            aadharNo,
            aadharFrontImage,
            aadharBackImage,
            totleExprience,
            profileImage,
        } = req.body;

        if (!name || !age || !mobile || !category || !subCategory || !currentAddress || !permanentAddress ||
            !pincode || !state || !city || !aadharNo ) {
            return res.status(400).json(new apiResponse(400, null, "All fields are required."));
        }
        

        const newLabor = new Labor({
            name,
            age,
            mobile,
            category,
            subCategory,
            currentAddress,
            permanentAddress,
            pincode,
            state,
            city,
            aadharNo,
            aadharFrontImage,
            aadharBackImage,
            totleExprience,
            profileImage,
        });

        await newLabor.save();

        res.status(201).json(new apiResponse(201, newLabor, "Labor added successfully."));
    } catch (error) {
        console.error("Error adding labor data:", error);
        res.status(500).json(new apiResponse(500, null, error.message));
    }
});

const getAllData = asyncHandler(async (req, res) => {
    try {
        const laborEntries = await Labor.find()
            .populate('category', 'name')
            .populate('subCategory', 'name');

        if (!laborEntries.length) {
            return res.status(404).json(new apiResponse(404, null, "No labor entries found."));
        }

        res.status(200).json(new apiResponse(200, laborEntries || [], "Labor entries fetched successfully."));
    } catch (error) {
        console.error("Error fetching labor entries:", error);
        res.status(500).json(new apiResponse(500, null, error.message));
    }
});


const getDataById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const laborEntry = await Labor.findById(id);

        if (!laborEntry) {
            return res.status(404).json(new apiResponse(404, null, "Labor entry not found."));
        }

        res.status(200).json(new apiResponse(200, laborEntry, "Labor entry fetched successfully."));
    } catch (error) {
        console.error("Error fetching labor entry:", error);
        res.status(500).json(new apiResponse(500, null, error.message));
    }
});

const updateData = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updateFields = req.body;

    try {
        const updatedLabor = await Labor.findByIdAndUpdate(id, updateFields, { new: true, runValidators: true });

        if (!updatedLabor) {
            return res.status(404).json(new apiResponse(404, null, "Labor entry not found."));
        }

        res.status(200).json(new apiResponse(200, updatedLabor, "Labor entry updated successfully."));
    } catch (error) {
        console.error("Error updating labor entry:", error);
        res.status(500).json(new apiResponse(500, null, error.message));
    }
});

const deleteData = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const deletedLabor = await Labor.findByIdAndDelete(id);

        if (!deletedLabor) {
            return res.status(404).json(new apiResponse(404, null, "Labor entry not found."));
        }

        res.status(200).json(new apiResponse(200, null, "Labor entry deleted successfully."));
    } catch (error) {
        console.error("Error deleting labor entry:", error);
        res.status(500).json(new apiResponse(500, null, error.message));
    }
});

export {
    uploadImage,
    getCountry,
    getStateByCountryId,
    getCityByStateId,
    addData,
    getAllData,
    getDataById,
    updateData,
    deleteData
};
