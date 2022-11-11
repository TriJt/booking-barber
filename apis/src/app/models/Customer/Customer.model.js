import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ContactSchema = new Schema(
  {
    Name: {
      type: String,
    },
    Email: {
      type: String,
    },
    Subject: {
      type: String,
    },
    Message: {
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
      default: "",
    },
    Street: {
      type: String,
      default: "",
    },
    District: {
      type: String,
      default: "",
    },
    City: {
      type: String,
      default: "",
    },
    Gender: {
      type: String,
      default: "Male",
    },
    Collect: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
const Contact = mongoose.model("Contact", ContactSchema);
const Customer = mongoose.model("Customer", CustomerSchema);
export { Customer, Contact };
