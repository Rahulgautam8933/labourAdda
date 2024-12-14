// models/Labor.js

import mongoose from 'mongoose';

const laborSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: String,
    },
    mobile: {
        type: String,
    },
    // Update to handle multiple categories
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    }],
    // Update to handle multiple subCategories
    subCategory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
    }],
    currentAddress: {
        type: String,
    },
    permanentAddress: {
        type: String,
    },
    pincode: {
        type: String,
    },
    state: {
        type: String,
    },
    city: {
        type: String,
    },
    aadharNo: {
        type: String,
    },
    employcode: {
        type: String,
    },
    othersubCategory: {
        type: String,
    },
    othercategory: {
        type: String,
    },
    employname: {
        type: String,
    },
    ss: {
        type: String,
    },
    aadharFrontImage: {
        type: String,
    },
    aadharBackImage: {
        type: String,
    },
    totleExprience: {
        type: String,
    },
    profileImage: {
        type: String,
    },
}, {
    timestamps: true,
});

// Create the model
const Labor = mongoose.model('Labor', laborSchema);

export default Labor;
