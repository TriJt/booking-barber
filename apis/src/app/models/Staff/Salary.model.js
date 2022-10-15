import mongoose, { Schema } from "mongoose";
const StaffSchema = new mongoose.Schema(
  {
    StaffId: {
      type: String,
    },
    Month: {
      type: Date,
    },
    Year: {
      type: Date,
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

const Staff = mongoose.model("Staff", StaffSchema);
export default Staff;
