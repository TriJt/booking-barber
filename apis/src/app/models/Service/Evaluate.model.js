import mongoose, {
    Schema
} from "mongoose";
const EvaluateSchema = new mongoose.Schema({
    Customer_id: {
        type: String
    },
    Content: {
        type: String
    },
    Point: {
        type: String
    },
    Image: {
        type: [String]
    },


}, {
    timestamps: true
})

const Evaluate = mongoose.model('Evaluate', EvaluateSchema);
export default Evaluate;