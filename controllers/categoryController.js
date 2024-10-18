// controllers/categoryController.js

import Category from '../models/categoryModal.js';
import { apiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asynchandler.js';

// Add Category
const addCategory = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json(new apiResponse(400, null, "Category name is required."));
        }

        const newCategory = new Category({ name });
        await newCategory.save();

        res.status(201).json(new apiResponse(201, newCategory, "Category added successfully."));
    } catch (error) {
        console.error("Error adding category:", error);
        res.status(500).json(new apiResponse(500, null, error.message));
    }
});

// Get All Categories
const getAllCategories = asyncHandler(async (req, res) => {
    try {
        const categories = await Category.find();

        if (!categories.length) {
            return res.status(404).json(new apiResponse(404, null, "No categories found."));
        }

        res.status(200).json(new apiResponse(200, categories, "Categories fetched successfully."));
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json(new apiResponse(500, null, error.message));
    }
});

// Get Category by ID
const getCategoryById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json(new apiResponse(404, null, "Category not found."));
        }

        res.status(200).json(new apiResponse(200, category, "Category fetched successfully."));
    } catch (error) {
        console.error("Error fetching category:", error);
        res.status(500).json(new apiResponse(500, null, error.message));
    }
});

// Update Category
const updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updateFields = req.body;

    try {
        const updatedCategory = await Category.findByIdAndUpdate(id, updateFields, { new: true, runValidators: true });

        if (!updatedCategory) {
            return res.status(404).json(new apiResponse(404, null, "Category not found."));
        }

        res.status(200).json(new apiResponse(200, updatedCategory, "Category updated successfully."));
    } catch (error) {
        console.error("Error updating category:", error);
        res.status(500).json(new apiResponse(500, null, error.message));
    }
});

// Delete Category
const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCategory = await Category.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json(new apiResponse(404, null, "Category not found."));
        }

        res.status(200).json(new apiResponse(200, null, "Category deleted successfully."));
    } catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json(new apiResponse(500, null, error.message));
    }
});

export {
    addCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
};
