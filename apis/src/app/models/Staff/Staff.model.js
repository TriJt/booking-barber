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
    Address: {
        type: Array
    },
    Gender: {
        type: String
    },
    Birthday: {
        type: Date
    }
}, {
    timestamps: true
})

const Staff = mongoose.model('Staff', StaffSchema);
export default Staff;