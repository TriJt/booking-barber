import mongoose, {
    Schema
} from "mongoose";
const DiscountSchema = new mongoose.Schema({
    Content: {
        type: String
    },
    Date_start: {
        type: Date
    },
    Date_end: {
        type: Date
    },
    Small_category: {
        type: Array
    },
    Price: {
        type: Number
    }
}, {
    timestamps: true
})

const Discount = mongoose.model('Discount', DiscountSchema);
export default Discount;