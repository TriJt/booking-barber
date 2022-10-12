import mongoose, {
    Schema
} from "mongoose";
const StaffSchema = new mongoose.Schema({
    Name: {
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
    Image: {
        type: [String],
        default: "https://docsach24.co/no-avatar.png"
    },
    Number: {
        type: String, 
        default: null
    },
    Street: {
        type: String,
        default: null
    },
    District: {
        type: String,
        default: null
    },
    City: {
        type: String,
        default: null
    },
    Gender: {
        type: String,
        default: null
    },
    Birthday: {
        type: Date,
        default: null
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const Staff = mongoose.model('Staff', StaffSchema);
export default Staff;