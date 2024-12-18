import mongoose from 'mongoose';

const laborSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    mobile: {
        type: String,
        default: '',
    },

    employcode: {
        type: String,
    },

    employname: {
        type: String,
    },

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

    landmark: {
        type: String,
    },

    details: {
        type: String,
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
      },

    // Updated to allow multiple subcategories
    subCategory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
    }],

    qyt: {
        type: String,
    },

    othersubCategory: {
        type: String,
    },

    othercategory: {
        type: String,
    },

    startDate: {
        type: String,
    },

    img: {
        type: String,
    },

}, {
    timestamps: true,
});

const Customer = mongoose.model('Customer', laborSchema);

export default Customer;
