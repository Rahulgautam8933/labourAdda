// models/Labor.js

import mongoose from 'mongoose';

const laborSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
        unique: true,
    },
    profileImage: {
        type: String, // Assuming the image is stored as a URL or path
        required: true,
    },
    aadharImage: {
        type: String, // Same as above
        required: true,
    },
    address: {
        type: String,
        required: true,
    }
}, {
    timestamps: true, // This will add createdAt and updatedAt timestamps
});

// Create the model
const Labor = mongoose.model('Labor', laborSchema);

export default Labor;
