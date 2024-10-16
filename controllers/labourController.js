import mongoose from "mongoose";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { Country, State, City } from "country-state-city";

// Upload an image
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

// Get all countries
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

export {
    uploadImage,
    getCountry,
    getStateByCountryId,
    getCityByStateId
};
