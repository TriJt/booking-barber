import mongoose from "mongoose";

const Schema = mongoose.Schema;

const slotSchema = new Schema({
  Time: {
    type: String,
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
});

const dateSchedule = new Schema({
  date: {
    type: String,
  },
  slots: [slotSchema],
});

const SalarySchema = new Schema(
  {
    Status: {
      type: String,
      default: "Unpaid",
    },
    Date: { type: Date },
    Month: {
      type: String,
    },
    Year: {
      type: String,
    },
    Salary: {
      type: Number,
    },
    Allowance: {
      type: Number,
    },
    Total: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const StaffSchema = new Schema(
  {
    Name: {
      type: String,
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
    Salary: [],
    Gender: {
      type: String,
    },
    Birthday: {
      type: Date,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    Dates: [dateSchedule],
  },
  {
    timestamps: true,
  }
);

const Staff = mongoose.model("Staff", StaffSchema);
const Salary = mongoose.model("Salary", SalarySchema);
const Slot = mongoose.model("Slot", slotSchema);
const DateSchedule = mongoose.model("DateSchedule", dateSchedule);

export { Staff, Salary, Slot, DateSchedule };
