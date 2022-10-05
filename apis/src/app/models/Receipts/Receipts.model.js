import mongoose, {
    Schema
} from "mongoose";
const ReceiptsSchema = new mongoose.Schema({
    Staff_id: {
        type: String,
        require: true
    },
    Name_Receipts: {
        type: String,
        require: true
    },
    Phone_Receipts: {
        type: String
    },
    Service: {
        type: Array
    },
    Note: {
        type: String
    },
    Price: {
        type: Number
    },
    Discount: {
        type: Number
    },
    Total: {
        type: Number
    }
}, {
    timestamps: true
})

const Receipts = mongoose.model('Receipts', ReceiptsSchema);
export default Receipts;