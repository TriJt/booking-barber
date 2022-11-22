import mongoose, { Schema } from "mongoose";
const ReceiptsSchema = new mongoose.Schema(
  {
    //   get when you sign in admin page
    Staff_Name: {
      type: String,
      require: true,
    },
    Name_Customer: {
      type: String,
      require: true,
    },
    Email: {
      type: String,
    },
    Telephone: {
      type: String,
    },
    Services: {
      type: Array,
    },
    SumPrice: {
      type: Number,
    },
    // customer requirements when performing the service process
    Discount: {
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

const Receipts = mongoose.model("Receipts", ReceiptsSchema);
export default Receipts;
