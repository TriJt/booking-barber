import mongoose from "mongoose";
const Schema = mongoose.Schema;

const RevenueSchema = new Schema(
  {
    Date: {
      type: Date,
      default: Date.now(),
    },
    Total: {
      type: Number,
      default: 0,
    },
    Note: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);
const BannerSchema = new mongoose.Schema(
  {
    Image: {
      type: String,
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
      require: true,
    },
    Banner: [BannerSchema],
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
    Revenue: [RevenueSchema],
  },
  {
    timestamps: true,
  }
);

const Store = mongoose.model("Store", StoreSchema);
const Revenue = mongoose.model("Revenue", RevenueSchema);
const Banner = mongoose.model("Banner", BannerSchema);

export { Store, Revenue, Banner };
