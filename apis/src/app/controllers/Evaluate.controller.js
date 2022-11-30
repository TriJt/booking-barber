import { Evaluate } from "../models/Service/Service.model.js";
import mongoose from "mongoose";

export const CreateEvaluate = async (req, res) => {
  const responseType = {};
  const input = req.body;
  try {
    const newEval = new Evaluate({
      Service: input.Service,
      Staff: input.Staff,
      Receipt_id: input.Receipt_id,
      Customer_id: input.Customer_id,
      Star: input.Star,
      Review: input.Review,
    });
    const save = await newEval.save();
    responseType.message = "Evaluate successfully";
    responseType.status = 200;
    responseType.value = save;
  } catch (error) {
    responseType.status = 404;
    responseType.message = "Evaluate failed";
  }
  res.json(responseType);
};

export const UpdateEvaluate = async (req, res) => {};

export const DeleteEvaluate = async (req, res) => {
  const responseType = {};
  // check input
  try {
    const data = await Evaluate.findByIdAndDelete({ _id: req.params.id });
    responseType.message = "Delete successfully";
    responseType.status = 200;
    responseType.value = data;
  } catch (err) {
    responseType.statusText = "Error";
    responseType.message = "Delete Failed ";
    responseType.status = 404;
  }
  res.json(responseType);
};

export const GetEvaluateByIdReceipt = async (req, res) => {
  const responseType = {};
  // check input
  try {
    const data = await Evaluate.find({ Receipt_id: req.body.id });
    responseType.message = "Get successfully";
    responseType.status = 200;
    responseType.value = data;
  } catch (err) {
    responseType.statusText = "Error";
    responseType.message = "Get Failed ";
    responseType.status = 404;
  }
  res.json(responseType);
};

//get all evaluate

export const GetAllEvaluate = async (req, res) => {
  const responseType = {};
  // check input
  try {
    const data = await Evaluate.find();
    responseType.message = "Get successfully";
    responseType.status = 200;
    responseType.value = data;
  } catch (err) {
    responseType.statusText = "Error";
    responseType.message = "Get Failed ";
    responseType.status = 404;
  }
  res.json(responseType);
};

// get limit 3
export const GetEvaluateLimit3 = async (req, res) => {
  const responseType = {};
  // check input
  try {
    const data = await Evaluate.find().limit(3);

    responseType.message = "Get successfully";
    responseType.status = 200;
    responseType.value = data;
  } catch (err) {
    responseType.statusText = "Error";
    responseType.message = "Get Failed ";
    responseType.status = 404;
  }
  res.json(responseType);
};
