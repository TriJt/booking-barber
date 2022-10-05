import mongoose, {
    Schema
} from "mongoose";
const Small_categorySchema = new mongoose.Schema({
    Name_Small_category: {
        type: String,
        require: true
    },
    Styles_id: {
        type: Array
    },
    DMN_id: {
        type: String
    }
}, {
    timestamps: true
})

const Small_category = mongoose.model('Small_category', Small_categorySchema);
export default Small_category;