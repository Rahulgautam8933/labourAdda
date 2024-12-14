import mongoose from "mongoose";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asynchandler.js";
import Customer from '../models/customerModal.js'; // Ensure this path is correct

// Add Data
// const addData = asyncHandler(async (req, res) => {
//     try {
//         const {
//             name,
//             mobile,
//             currentAddress,
//             permanentAddress,
//             pincode,
//             state,
//             city,
//             landmark,
//             details,
//             category,
//             subCategory,
//             qyt,
//             startDate,
//             employcode,
//             employname,
//             img,othercategory,othersubCategory
//         } = req.body;

//         if (!name ) {
//             return res.status(400).json(new apiResponse(400, null, "All fields are required."));
//         }

//         const newCustomer = new Customer({
//             name,
//             mobile,
//             currentAddress,
//             permanentAddress,
//             pincode,
//             state,
//             city,
//             landmark,
//             details,
//             category,
//             subCategory,
//             qyt,
//             startDate,
//             employcode,
//             employname,
//             img,othercategory,othersubCategory
//         });

//         await newCustomer.save();

//          const populatedLabor = await Customer.findById(newCustomer._id)
//         .populate('category')  
//         .populate('subCategory');

//         res.status(201).json(new apiResponse(201, populatedLabor, "Customer added successfully."));
//     } catch (error) {
//         console.error("Error adding customer data:", error);
//         res.status(500).json(new apiResponse(500, null, error.message));
//     }
// });



const addData = asyncHandler(async (req, res) => {
    try {
        const {
            name,
            mobile,
            currentAddress,
            permanentAddress,
            pincode,
            state,
            city,
            landmark,
            details,
            category, // Expecting an array for category
            subCategory, // Expecting an array for subCategory
            qyt,
            startDate,
            employcode,
            employname,
            img,
            othercategory,
            othersubCategory
        } = req.body;

        if (!name) {
            return res.status(400).json(new apiResponse(400, null, "All fields are required."));
        }

        // Check if category and subCategory are arrays, and handle empty arrays
        if (!Array.isArray(category) || category.length === 0) {
            return res.status(400).json(new apiResponse(400, null, "At least one category is required."));
        }

        if (!Array.isArray(subCategory) || subCategory.length === 0) {
            return res.status(400).json(new apiResponse(400, null, "At least one subCategory is required."));
        }

        // Create a new customer entry
        const newCustomer = new Customer({
            name,
            mobile,
            currentAddress,
            permanentAddress,
            pincode,
            state,
            city,
            landmark,
            details,
            category,
            subCategory,
            qyt,
            startDate,
            employcode,
            employname,
            img,
            othercategory,
            othersubCategory,
        });

        await newCustomer.save();

        // Populate the categories and subCategories in the response
        const populatedCustomer = await Customer.findById(newCustomer._id)
            .populate('category')  // Populate category
            .populate('subCategory');  // Populate subCategory

        res.status(201).json(new apiResponse(201, populatedCustomer, "Customer added successfully."));

    } catch (error) {
        console.error("Error adding customer data:", error);
        res.status(500).json(new apiResponse(500, null, error.message));
    }
});




// Get All Data
const getAllData = asyncHandler(async (req, res) => {
    try {
        const customerEntries = await Customer.find().populate('category', 'name')
            .populate('subCategory', 'name');

        if (!customerEntries.length) {
            return res.status(404).json(new apiResponse(404, null, "No customer entries found."));
        }

        res.status(200).json(new apiResponse(200, customerEntries || [], "Customer entries fetched successfully."));
    } catch (error) {
        console.error("Error fetching customer entries:", error);
        res.status(500).json(new apiResponse(500, null, error.message));
    }
});

// Get Data by ID
const getDataById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const customerEntry = await Customer.findById(id);

        if (!customerEntry) {
            return res.status(404).json(new apiResponse(404, null, "Customer entry not found."));
        }

        res.status(200).json(new apiResponse(200, customerEntry, "Customer entry fetched successfully."));
    } catch (error) {
        console.error("Error fetching customer entry:", error);
        res.status(500).json(new apiResponse(500, null, error.message));
    }
});

// Update Data
const updateData = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updateFields = req.body;

    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(id, updateFields, { new: true, runValidators: true });

        if (!updatedCustomer) {
            return res.status(404).json(new apiResponse(404, null, "Customer entry not found."));
        }

        res.status(200).json(new apiResponse(200, updatedCustomer, "Customer entry updated successfully."));
    } catch (error) {
        console.error("Error updating customer entry:", error);
        res.status(500).json(new apiResponse(500, null, error.message));
    }
});

// Delete Data
const deleteData = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCustomer = await Customer.findByIdAndDelete(id);

        if (!deletedCustomer) {
            return res.status(404).json(new apiResponse(404, null, "Customer entry not found."));
        }

        res.status(200).json(new apiResponse(200, null, "Customer entry deleted successfully."));
    } catch (error) {
        console.error("Error deleting customer entry:", error);
        res.status(500).json(new apiResponse(500, null, error.message));
    }
});

export {
    addData,
    getAllData,
    getDataById,
    updateData,
    deleteData
};
