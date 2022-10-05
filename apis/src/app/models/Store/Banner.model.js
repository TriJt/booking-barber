import mongoose, {
    Schema
} from "mongoose";
const BannerSchema = new mongoose.Schema({
    Image: {
        type: String
    },
    Description: {
        type: String
    }
}, {
    timestamps: true
})

const Banner = mongoose.model('Banner', BannerSchema);
export default Banner;