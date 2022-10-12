import mongoose, {
    Schema
} from "mongoose";
const CustomerSchema = new mongoose.Schema({
    Name_Customer: {
        type: String,
        require: true
    },
    Telephone: {
        type: String,
        require: true
    },
    Email: {
        type: String,
        require: true,
        unique: true
    },
    Password: {
        type: String
    },
    Image: {
        type: [String],
        default: "https://docsach24.co/no-avatar.png"
    },
    Number: {
        type: String
    },
    Street: {
        type: String
    },
    District: {
        type: String
    },
    City: {
        type: String
    },
    Gender: {
        type: String
    },
    Interests: {
        type: Array
    },
    Birthday: {
        type: Date
    },
    Collect: {
        type: String,
        default: 0
    }
}, {
    timestamps: true
})

const Customer = mongoose.model('Customer', CustomerSchema);
export default Customer;