import { Customer } from "../models/Customer/Customer.model.js";
import bcryptjs from "bcryptjs";

// check customer exist with telephone

export const CheckCustomer = async (req, res) => {
  const responseType = {};
  const input = req.body;
  try {
    const check = await Customer.findOne({ Telephone: input.Telephone });
    if (check !== null) {
      responseType.message = "Telephone exist";
      responseType.status = 200;
    }
    if (check === null) {
      responseType.status = 400;
      responseType.message = "Please enter the correct phone number!";
    }
  } catch (err) {
    responseType.value = err;
  }
  res.json(responseType);
};

// create information of Staff
// COMPLETE in back-end
export const CreateCustomer = async (req, res) => {
  const responseType = {};
  const input = req.body;

  //create new user
  try {
    const salt = bcryptjs.genSaltSync(10);
    const pass = await input.Telephone;
    const hashPassword = bcryptjs.hashSync(pass, salt);
    const newCustomer = new Customer({
      Name_Customer: input.Name_Customer,
      Telephone: input.Telephone,
      Email: input.Email,
      Password: hashPassword,
      Collect: 1,
    });
    //save Customer in database and return response
    const save = await newCustomer.save();
    responseType.message = "Create new customer successfully";
    responseType.status = 200;
    responseType.value = save;
  } catch (err) {
    responseType.status = 404;
    responseType.message = "Create customer failed";
    responseType.value = err;
  }
  res.json(responseType);
};

// update information of Customer
// Complete in back-end
// Need connection to front-end
export const UpdateCustomer = async (req, res) => {
  const responseType = {};
  // check input

  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    const saveCustomer = await customer.save();
    responseType.status = 200;
    responseType.value = saveCustomer;
    console.log(saveCustomer);
  } catch (err) {
    responseType.message = "Update Failed ";
    responseType.status = 404;
  }
  res.json(responseType);
};

// delete information of Customer
// Complete in back-end
// Need connection to front-end
export const DeleteCustomer = async (req, res) => {
  const responseType = {};
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    responseType.statusText = "Success";
    responseType.message = "Delete Successfully";
    responseType.status = 200;
  } catch (err) {
    responseType.statusText = "Failed";
    responseType.message = "Delete Failed";
    responseType.status = 500;
  }
  res.json(responseType);
};

// get information of Customer by id and name
// Complete in back-end
// Need connection to front-end
export const GetCustomerById = async (req, res) => {
  const responseType = {};

  if (Customer) {
    const customer = await Customer.findById(req.params.id);

    responseType.statusText = "Success";
    responseType.message = "Get customer successfully";
    responseType.status = 200;
    responseType.value = customer;
  } else {
    responseType.statusText = "Error";
    responseType.message = "We have error in somewhere";
    responseType.status = 404;
  }
  res.json(responseType);
};

// get all information of Customer
// Complete in back-end
// Need connection to front-end
export const GetCustomers = async (req, res) => {
  const responseType = {};
  if (Customer) {
    const customer = await Customer.find().sort({ createdAt: -1 });
    responseType.statusText = "Success";
    responseType.message = "Get customer successfully";
    responseType.status = 200;
    responseType.value = customer;
  } else {
    responseType.statusText = "Error";
    responseType.message = "We have error in somewhere";
    responseType.status = 404;
  }
  res.json(responseType);
};

// Count customer
// Complete back-end
// Not connection to front-end
export const CountCustomer = async (req, res) => {
  const responseType = {};
  if (Customer) {
    const count = await Customer.countDocuments({});
    responseType.statusText = "Success";
    responseType.message = "Count customer successfully";
    responseType.status = 200;
    responseType.value = count;
  } else {
    responseType.statusText = "Error";
    responseType.message = "We have error in somewhere";
    responseType.status = 404;
  }
  res.json(responseType);
};

export const GetAWeek = async (req, res) => {
  const responseType = {};
  const input = req.body;
  const start = input.Start;
  const end = input.End;
  try {
    const getByDate = await Customer.aggregate([
      {
        $match: { createdAt: { $gte: new Date(start), $lt: new Date(end) } },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    responseType.message = "Get customer successfully";
    responseType.status = 200;
    responseType.value = getByDate;
  } catch (err) {
    responseType.statusText = "Error";
    responseType.message = "We have error ";
    responseType.status = 404;
  }
  res.json(responseType);
};

// get count in week
export const CountCustomerInASevenDay = async (req, res) => {
  const input = req.body;
  const start = input.Start;
  const end = input.End;
  try {
    const getByDate = await Customer.aggregate([
      {
        $match: { createdAt: { $gte: new Date(start), $lt: new Date(end) } },
      },
    ]);
    const length = getByDate.length;
    res.status(200).json(length);
  } catch (err) {
    res.status(400).json(err);
  }
};

// find last customer with limit = 3
export const GetLastCustomerLimit3 = async (req, res) => {
  const responseType = {};
  if (Customer) {
    const customer = await Customer.find({}).sort({ _id: -1 }).limit(5);
    responseType.message = "Get customer successfully";
    responseType.status = 200;
    responseType.value = customer;
  } else {
    responseType.message = "We have error in somewhere";
    responseType.status = 404;
  }
  res.json(responseType);
};
