import mongoose from "mongoose";

// use this schema for send mail 
const OptSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    code: {
        type: String
    },
    expireIn: {
        type: Number
    }

}, {
    timestamps: true
})

const Otp = mongoose.model("Otp", OptSchema);
export default Otp;