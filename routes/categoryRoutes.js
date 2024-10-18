
import { Router } from 'express';
import {
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
    addCategory,
} from '../controllers/categoryController.js';

const router = Router();

router.post('/addcategory', addCategory);

router.get('/allcategory', getAllCategories);

router.get('getcategory/:id', getCategoryById);

router.patch('updatecategory/:id', updateCategory);

router.delete('deletecategory/:id', deleteCategory);

export default router;
