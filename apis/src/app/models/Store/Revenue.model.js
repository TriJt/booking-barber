import mongoose, {
    Schema
} from "mongoose";
const RevenueSchema = new mongoose.Schema({
    Date: {
        type: Date,
        default: Date.now()
    },
    Total: {
        type: Number,
        default: 0
    },
    Note: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
})

const Revenue = mongoose.model('Revenue', RevenueSchema);
export default Revenue;