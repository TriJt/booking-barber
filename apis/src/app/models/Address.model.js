import mongoose, {
    Schema
} from "mongoose";
const AddressSchema = new mongoose.Schema({
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

}, {
    timestamps: true
})

const Address = mongoose.model('Address', AddressSchema);
export default Address;