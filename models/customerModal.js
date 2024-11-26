
import mongoose from 'mongoose';

const laborSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    mobile: {
        type: String,
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
    landmark: {
        type: String,
        required: true,
    },
    details: {
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
    qyt: {
        type: String,
        required: true,
    },
    startDate: {
        type: String,
        required: true,
    },
    img: {
        type: String,

    },

}, {
    timestamps: true,
});


const Customer = mongoose.model('Customer', laborSchema);

export default Customer;
