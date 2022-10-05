import mongoose, {
    Schema
} from "mongoose";
const StoreSchema = new mongoose.Schema({
    Name_Store: {
        type: String,
        require: true
    },
    Telephone: {
        type: String
    },
    Banner: {
        type: Array
    },
    Address: {
        type: Array
    },
    Description: {
        type: String
    }
}, {
    timestamps: true
})

const Store = mongoose.model('Store', StoreSchema);
export default Store;