import mongoose, {
    Schema
} from "mongoose";
const StylesSchema = new mongoose.Schema({
    Name_Styles: {
        type: String,
        require: true
    },
    Image: {
        type: String
    },
    Description: {
        type: String
    }
}, {
    timestamps: true
})

const Styles = mongoose.model('Styles', StylesSchema);
export default Styles;