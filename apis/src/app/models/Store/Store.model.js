import mongoose from "mongoose";
const Schema = mongoose.Schema;

const BannerSchema = new Schema(
  {
    Image: {
      type: [String],
    },
    Description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const StoreSchema = new Schema(
  {
    Name_Store: {
      type: String,
      require: true,
    },
    Telephone: {
      type: String,
    },
    Banner: [],
    Number: {
      type: String,
    },
    Street: {
      type: String,
    },
    District: {
      type: String,
    },
    City: {
      type: String,
    },
    Description: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Store = mongoose.model("Store", StoreSchema);
const Banner = mongoose.model("Banner", BannerSchema);

export { Store, Banner };
