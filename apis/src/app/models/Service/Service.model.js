import mongoose, {
    Schema
} from "mongoose";
const ServiceSchema = new mongoose.Schema({
    Name_Service: {
        type: String
    },
    Price: {
        type: Number
    },
    Description: {
        type: String
    },
    Image: {
        type: Array
    },
    Category: {
        type: Array
    },
    Evaluate: {
        type: Array
    }

}, {
    timestamps: true
})

const Service = mongoose.model('Service', ServiceSchema);
export default Service;