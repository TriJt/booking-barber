import mongoose from "mongoose";

const Schema = mongoose.Schema;

const StyleSchema = new Schema(
  {
    Name: {
      type: String,
      require: true,
    },
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

const CustomerSchema = new Schema(
  {
    Name_Customer: {
      type: String,
      require: true,
    },
    Telephone: {
      type: String,
      require: true,
    },
    Email: {
      type: String,
      require: true,
      unique: true,
    },
    Password: {
      type: String,
    },
    Image: {
      type: [String],
      default: "https://docsach24.co/no-avatar.png",
    },
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
    Gender: {
      type: String,
    },
    Interests: [StyleSchema],
    Birthday: {
      type: Date,
    },
    Collect: {
      type: String,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
const Styles = mongoose.model("Styles", StyleSchema);
const Customer = mongoose.model("Customer", CustomerSchema);
export { Customer, Styles };
