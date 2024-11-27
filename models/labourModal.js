// models/Labor.js

import mongoose from 'mongoose';

const laborSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
        required: true,
    },

    currentAddress: {
        type: String,
        required: true,
    },
    permanentAddress: {
        type: String,
        // required: true,
    },
    pincode: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    aadharNo: {
        type: String,
        // required: true,
    },
    employcode: {
        type: String,
        // required: true,
    },
    employname: {
        type: String,
        // required: true,
    },
    ss: {
        type: String,
        // required: true,
    },
    aadharFrontImage: {
        type: String,
        // required: true,
    },
    aadharBackImage: {
        type: String,
        // required: true,
    },
    totleExprience: {
        type: String,
        // required: true,
    },
    profileImage: {
        type: String,
        // required: true,
    },


}, {
    timestamps: true,
});

// Create the model
const Labor = mongoose.model('Labor', laborSchema);

export default Labor;
