import mongoose, {
    Schema
} from "mongoose";
const SlotsSchema = new mongoose.Schema({
    Date: {
        type: Array
    },
    Time: {
        type: String
    },
    Vacancies: {
        type: Number,
        default: 1
    }
}, {
    timestamps: true
})

const Slots = mongoose.model('Slots', SlotsSchema);
export default Slots;