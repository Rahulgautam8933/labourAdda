import { Router } from 'express';
import { addCareer, deleteCareer, getAllCareers, getCareerById, updateCareer } from '../controllers/careerController.js';

const router = Router();

// Route to add a career
router.post('/addcareer', addCareer);

// Route to get all careers
router.get('/getAllCareers', getAllCareers);

// Route to get a career by ID
router.get('/getcareer/:id', getCareerById);

// Route to update a career by ID
router.patch('/updatecareer/:id', updateCareer);

// Route to delete a career by ID
router.delete('/deletecareer/:id', deleteCareer);

export default router;
