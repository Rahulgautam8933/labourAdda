// routes/subCategoryRoutes.js

import { Router } from 'express';
import {
    addSubCategory,
    getAllSubCategories,
    getSubCategoryById,
    updateSubCategory,
    deleteSubCategory,
    getSubCategoriesByCategoryId,
} from '../controllers/subCategoryController.js';

const router = Router();

router.post('/addsubcategory', addSubCategory);

router.get('/getAllData', getAllSubCategories);

router.get('/getsubcategory/:id', getSubCategoryById);

router.patch('/updatesubcategory/:id', updateSubCategory);

router.delete('/deletesubcategory/:id', deleteSubCategory);
router.get('/getSubCategoriesByCategoryId', getSubCategoriesByCategoryId);

export default router;
