import mongoose, { Schema } from "mongoose";
const ReceiptsSchema = new mongoose.Schema(
  {
    //   get when you sign in admin page
    Staff_Name: {
      type: String,
      require: true,
    },
    // get when check again name of customer
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
    Status: {
      type: String,
      default: "advise",
      // advise,processing, complete
    },
    // customer requirements when performing the service process
    Note: {
      type: String,
    },
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
