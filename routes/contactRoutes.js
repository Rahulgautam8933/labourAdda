import { Router } from 'express';
import { addContact, deleteContact, getAllContacts, getContactById, updateContact } from '../controllers/contactController.js';


const router = Router();

// Add a new contact
router.post('/addcontact', addContact);

// Get all contacts
router.get('/getallcontacts', getAllContacts);

// Get a contact by ID
router.get('/getcontact/:id', getContactById);

// Update contact by ID
router.patch('/updatecontact/:id', updateContact);

// Delete contact by ID
router.delete('/deletecontact/:id', deleteContact);

export default router;
