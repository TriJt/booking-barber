import mongoose from "mongoose";

const Schema = mongoose.Schema;

const EvaluateSchema = new Schema(
  {
    Customer_id: {
      type: String,
    },
    Title: {
      type: String,
      default: "",
    },
    Star: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    Review: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const ServiceSchema = new Schema(
  {
    Name_Service: {
      type: String,
    },
    Price: {
      type: Number,
    },
    Description: {
      type: String,
    },
    Image: {
      type: [String],
    },
    Category: {
      type: Array,
    },
    Evaluate: [EvaluateSchema],
  },
  {
    timestamps: true,
  }
);

const Category = new Schema({
  Title: {
    type: String,
    required: true,
  },
  service: [ServiceSchema],
});

const Evaluate = mongoose.model("Evaluate", EvaluateSchema);

const Service = mongoose.model("Service", ServiceSchema);
export { Service, Evaluate };
