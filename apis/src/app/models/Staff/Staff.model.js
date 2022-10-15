import mongoose, { Schema } from "mongoose";
const StaffSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      require: true,
    },
    Telephone: {
      type: String,
    },
    Email: {
      type: String,
      unique: true,
    },
    Password: {
      type: String,
    },
    Image: {
      type: [String],
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
    Active: {
      type: Boolean,
      default: true,
    },
    Salary: {
      type: String,
      default: "Unpaid",
    },
    Gender: {
      type: String,
      default: "",
    },
    Birthday: {
      type: Date,
      default: "",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Staff = mongoose.model("Staff", StaffSchema);
export default Staff;
