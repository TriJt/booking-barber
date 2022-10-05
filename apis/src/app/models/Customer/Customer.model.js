import mongoose, {
    Schema
} from "mongoose";
const CustomerSchema = new mongoose.Schema({
    Name_Customer: {
        type: String,
        require: true
    },
    Telephone: {
        type: String
    },
    Email: {
        type: String,
        unique: true
    },
    Password: {
        type: String
    },
    Address: {
        type: Array
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
        type: String
    }
}, {
    timestamps: true
})

const Customer = mongoose.model('Customer', CustomerSchema);
export default Customer;