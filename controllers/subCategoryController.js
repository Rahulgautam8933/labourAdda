// controllers/subCategoryController.js

import SubCategory from '../models/subCategory.js';
import { apiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asynchandler.js';

// Add SubCategory
const addSubCategory = asyncHandler(async (req, res) => {
    try {
        const { name, categoryId } = req.body;

        if (!name || !categoryId) {
            return res.status(400).json(new apiResponse(400, null, "Subcategory name and category ID are required."));
        }

        const newSubCategory = new SubCategory({ name, categoryId });
        await newSubCategory.save();

        res.status(201).json(new apiResponse(201, newSubCategory, "Subcategory added successfully."));
    } catch (error) {
        console.error("Error adding subcategory:", error);
        res.status(500).json(new apiResponse(500, null, error.message));
    }
});


const getAllSubCategories = asyncHandler(async (req, res) => {
    try {
        const subCategories = await SubCategory.find().populate('categoryId', 'name');

        if (!subCategories.length) {
            return res.status(404).json(new apiResponse(404, null, "No subcategories found."));
        }

        res.status(200).json(new apiResponse(200, subCategories || [], "Subcategories fetched successfully."));
    } catch (error) {
        console.error("Error fetching subcategories:", error);
        res.status(500).json(new apiResponse(500, null, error.message));
    }
});

// Get SubCategory by ID
const getSubCategoryById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const subCategory = await SubCategory.findById(id).populate('categoryId', 'name');

        if (!subCategory) {
            return res.status(404).json(new apiResponse(404, null, "Subcategory not found."));
        }

        res.status(200).json(new apiResponse(200, subCategory, "Subcategory fetched successfully."));
    } catch (error) {
        console.error("Error fetching subcategory:", error);
        res.status(500).json(new apiResponse(500, null, error.message));
    }
});

// Update SubCategory
const updateSubCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updateFields = req.body;

    try {
        const updatedSubCategory = await SubCategory.findByIdAndUpdate(id, updateFields, { new: true, runValidators: true });

        if (!updatedSubCategory) {
            return res.status(404).json(new apiResponse(404, null, "Subcategory not found."));
        }

        res.status(200).json(new apiResponse(200, updatedSubCategory, "Subcategory updated successfully."));
    } catch (error) {
        console.error("Error updating subcategory:", error);
        res.status(500).json(new apiResponse(500, null, error.message));
    }
});

// Delete SubCategory
const deleteSubCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const deletedSubCategory = await SubCategory.findByIdAndDelete(id);

        if (!deletedSubCategory) {
            return res.status(404).json(new apiResponse(404, null, "Subcategory not found."));
        }

        res.status(200).json(new apiResponse(200, null, "Subcategory deleted successfully."));
    } catch (error) {
        console.error("Error deleting subcategory:", error);
        res.status(500).json(new apiResponse(500, null, error.message));
    }
});


const getSubCategoriesByCategoryId = asyncHandler(async (req, res) => {
    const { categoryId } = req.query;

    try {
        let subCategories;

        if (categoryId) {
            subCategories = await SubCategory.find({ categoryId }).populate('categoryId', 'name');
        } else {
            subCategories = await SubCategory.find().populate('categoryId', 'name');
        }

        // Return an empty array if no subcategories are found
        res.status(200).json(new apiResponse(200, subCategories || [], "Subcategories fetched successfully."));
    } catch (error) {
        console.error("Error fetching subcategories:", error);
        res.status(500).json(new apiResponse(500, null, error.message));
    }
});



export {
    addSubCategory,
    getAllSubCategories,
    getSubCategoryById,
    updateSubCategory,
    deleteSubCategory,
    getSubCategoriesByCategoryId
};
