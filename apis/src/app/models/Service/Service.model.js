import mongoose from "mongoose";

const Schema = mongoose.Schema;

const EvaluateSchema = new Schema(
  {
    Customer_id: {
      type: String,
    },
    Title: {
      type: String,
    },
    Star: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    Review: {
      type: String,
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
      type: String,
    },
    Evaluate: [EvaluateSchema],
  },
  {
    timestamps: true,
  }
);

const CategorySchema = new Schema({
  Title: {
    type: String,
    required: true,
  },
  Services: [ServiceSchema],
});

const Evaluate = mongoose.model("Evaluate", EvaluateSchema);
const Category = mongoose.model("Category", CategorySchema);
const Service = mongoose.model("Service", ServiceSchema);
export { Category, Service, Evaluate };
