import Receipt from "../models/Receipts/Receipts.model.js";
import { Service } from "../models/Service/Service.model.js";
// create information of Receipt
export const CreateReceipt = async (req, res) => {
  const responseType = {};
  const input = req.body;
  const manyService = input.Services;

  // find service when customer go to barber to get price
  const service = await Service.find({
    Name_Service: { $in: manyService },
  });
  // sum total price
  const length = service.length;
  let totalPrice = 0;
  for (let i = 0; i < length; i++) {
    const price = service[i].Price;
    totalPrice += price;
  }
  //the final price to charge the customer
  const discount = input.Discount;
  const total = (totalPrice * (100 - discount)) / 100;

  // save information to database
  try {
    const newReceipt = new Receipt({
      Staff_Name: input.Staff_Name,
      Name_Customer: input.Name_Customer,
      Telephone: input.Telephone,
      Email: input.Email,
      Services: manyService,
      Status: input.Status,
      Note: input.Note,
      Discount: discount,
      Total: total,
    });
    const save = await newReceipt.save();
    responseType.message = "Create successfully";
    responseType.status = 200;
    responseType.value = save;
  } catch (error) {
    responseType.status = 404;
    responseType.message = "Create service failed";
  }
  res.json(responseType);
};

// update information of Receipt
export const UpdateReceipt = async (req, res) => {
  const responseType = {};
  const input = req.body;
  const manyService = input.Services;
  // find service when customer go to barber to get price
  const service = await Service.find({
    Name_Service: { $in: manyService },
  });
  // sum total price
  const length = service.length;
  let totalPrice = 0;
  for (let i = 0; i < length; i++) {
    const price = service[i].Price;
    totalPrice += price;
  }
  //the final price to charge the customer
  const discount = input.Discount;
  const total = (totalPrice * (100 - discount)) / 100;

  // update receipt
  try {
    const data = {
      Staff_Name: input.Staff_Name,
      Name_Customer: input.Name_Customer,
      Telephone: input.Telephone,
      Email: input.Email,
      Services: manyService,
      Status: input.Status,
      Note: input.Note,
      Discount: discount,
      Total: total,
    };
    const updateReceipt = await Receipt.findByIdAndUpdate(
      req.params.id,
      { $set: data },
      {
        new: true,
      }
    );
    // save information to database
    const save = await updateReceipt.save();
    responseType.message = "Update successfully";
    responseType.status = 200;
    responseType.value = save;
  } catch (error) {
    responseType.status = 404;
    responseType.message = "Create service failed";
  }
  res.json(responseType);
};

// delete information of Receipt
export const DeleteReceipt = async (req, res) => {};

// get information of Receipt by id
export const GetReceiptById = async (req, res) => {};

// get all information of Receipt
export const GetReceipts = async (req, res) => {};
