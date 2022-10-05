import mongoose, {
    Schema
} from "mongoose";
const CategoriesSchema = new mongoose.Schema({
    Name_categories: {
        type: String,
        require: true
    },
    Small_category: {
        type: Array
    }
}, {
    timestamps: true
})

const Categories = mongoose.model('Categories', CategoriesSchema);
export default Categories;