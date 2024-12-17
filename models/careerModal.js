

import mongoose from 'mongoose';

const careerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    cv:{
        type: String,
        required: true,
    },
    exp:{
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});


const Career = mongoose.model('Career', careerSchema);

export default Career;
