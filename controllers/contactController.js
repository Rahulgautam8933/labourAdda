// controllers/categoryController.js
import nodemailer from 'nodemailer';
import Contact from '../models/contectModal.js';  // Assuming you have a Contact model for contacts
import { apiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asynchandler.js';

// Add Contact
// const addContact = asyncHandler(async (req, res) => {
//     try {
//         const { name, email, phone, message, address } = req.body;

//         // Validate input fields
//         if (!name || !email || !phone || !message || !address) {
//             return res.status(400).json(new apiResponse(400, null, "All fields are required."));
//         }

//         // Create a new contact document
//         const newContact = new Contact({ name, email, phone, message, address });
//         await newContact.save();

//         // Respond with success
//         res.status(201).json(new apiResponse(201, newContact, "Contact form submitted successfully."));
//     } catch (error) {
//         // Handle server error
//         res.status(500).json(new apiResponse(500, null, error.message));
//     }
// });


const addContact = asyncHandler(async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        // Validate input fields
        if (!name || !email || !phone || !message) {
            return res.status(400).json(new apiResponse(400, null, "All fields are required."));
        }

        // Create a new contact document
        const newContact = new Contact({ name, email, phone, message });
        await newContact.save();

        // Send email after successful contact form submission
        let transporter = nodemailer.createTransport({
            service: 'gmail',  
            auth: {
                user: 'rg307125@gmail.com', 
                pass: 'rxha qeai ochk wsfw',  
            }
        });

        let mailOptions = {
            from: `"Contact Form" ${email}`, 
            to: `izzyclicksupplier@gmail.com`, 
            subject: 'New Contact Form Submission', 
            html: `
                <h3>New Contact Form Submission</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Message:</strong> ${message}</p>
            `, // HTML content
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                return res.status(500).json(new apiResponse(500, null, "Failed to send email."));
            }
            console.log("Email sent: " + info.response);
        });

        // Respond with success
        res.status(201).json(new apiResponse(201, newContact, "Contact form submitted successfully."));
    } catch (error) {
        // Handle server error
        console.error("Server error:", error);
        res.status(500).json(new apiResponse(500, null, error.message));
    }
});

// Get All Contacts
const getAllContacts = asyncHandler(async (req, res) => {
    try {
        const contacts = await Contact.find();

        if (!contacts.length) {
            return res.status(404).json(new apiResponse(404, null, "No contacts found."));
        }

        res.status(200).json(new apiResponse(200, contacts, "Contacts fetched successfully."));
    } catch (error) {
        console.error("Error fetching contacts:", error);
        res.status(500).json(new apiResponse(500, null, error.message));
    }
});

// Get Contact by ID
const getContactById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const contact = await Contact.findById(id);

        if (!contact) {
            return res.status(404).json(new apiResponse(404, null, "Contact not found."));
        }

        res.status(200).json(new apiResponse(200, contact, "Contact fetched successfully."));
    } catch (error) {
        console.error("Error fetching contact:", error);
        res.status(500).json(new apiResponse(500, null, error.message));
    }
});

// Update Contact
const updateContact = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updateFields = req.body;

    try {
        const updatedContact = await Contact.findByIdAndUpdate(id, updateFields, { new: true, runValidators: true });

        if (!updatedContact) {
            return res.status(404).json(new apiResponse(404, null, "Contact not found."));
        }

        res.status(200).json(new apiResponse(200, updatedContact, "Contact updated successfully."));
    } catch (error) {
        console.error("Error updating contact:", error);
        res.status(500).json(new apiResponse(500, null, error.message));
    }
});

// Delete Contact
const deleteContact = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const deletedContact = await Contact.findByIdAndDelete(id);

        if (!deletedContact) {
            return res.status(404).json(new apiResponse(404, null, "Contact not found."));
        }

        res.status(200).json(new apiResponse(200, null, "Contact deleted successfully."));
    } catch (error) {
        console.error("Error deleting contact:", error);
        res.status(500).json(new apiResponse(500, null, error.message));
    }
});

// Export all functions
export {
    addContact,
    getAllContacts,
    getContactById,
    updateContact,
    deleteContact
};
