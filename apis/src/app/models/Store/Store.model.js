import mongoose, {
    Schema
} from "mongoose";
const StoreSchema = new mongoose.Schema({
    Name_Store: {
        type: String,
        require: true
    },
    Telephone: {
        type: String,
        require: true
    },
    Banner: {
        type: Array
    },
    Number: {
        type: String
    },
    Street: {
        type: String
    },
    District: {
        type: String
    },
    City: {
        type: String
    },
    Description: {
        type: String,
        require: true
    }
}, {
    timestamps: true
})

const Store = mongoose.model('Store', StoreSchema);
export default Store;