// routes/subCategoryRoutes.js

import { Router } from 'express';
import {
    addSubCategory,
    getAllSubCategories,
    getSubCategoryById,
    updateSubCategory,
    deleteSubCategory,
} from '../controllers/subCategoryController.js';

const router = Router();

// Route to add a new subcategory
router.post('/addsubcategory', addSubCategory);

// Route to get all subcategories
router.get('/allsubcategories', getAllSubCategories);

// Route to get a subcategory by ID
router.get('/getsubcategory/:id', getSubCategoryById);

// Route to update a subcategory
router.patch('/updatesubcategory/:id', updateSubCategory);

// Route to delete a subcategory
router.delete('/deletesubcategory/:id', deleteSubCategory);

export default router;
