import { Customer } from "../models/Customer/Customer.model.js";
import { Staff } from "../models/Staff/Staff.model.js";
import bcryptjs from "bcryptjs";

// Register for customer don't have account

export const RegisterForCustomer = async (req, res) => {
  const responseType = {};
  const input = req.body;
  //create new user
  try {
    const salt = await bcryptjs.genSaltSync(10);
    const pass = await input.Password;
    const hashPassword = bcryptjs.hashSync(pass, salt);
    const newCustomer = new Customer({
      Name_Customer: input.Name_Customer,
      Telephone: input.Telephone,
      Email: input.Email,
      Password: hashPassword,
      Gender: input.Gender,
      isAdmin: input.isAdmin,
    });
    //save Customer in database and return response
    const saveCustomer = await newCustomer.save();
    responseType.statusText = "Success";
    responseType.message = "Sign Up Successfully";
    responseType.status = 200;
    responseType.value = saveCustomer;
  } catch {
    responseType.statusText = "Failed";
    responseType.status = 404;
    responseType.message = "Sign Up Successfully";
  }
  res.json(responseType);
};

// Login for customer have account

export const LoginForCustomer = async (req, res) => {
  const user = await Customer.findOne({
    Email: req.body.Email,
  });
  const responseType = {};
  if (user) {
    const match = await bcryptjs.compare(req.body.Password, user.Password);
    if (match) {
      responseType = user;
    } else {
      responseType = responseType = "Invalid Password";
    }
  } else {
    responseType = "Invalid Email";
  }
  res.json(responseType);
};

// Login for staff
export const LoginForStaff = async (req, res) => {
  const user = await Staff.findOne({
    Email: req.body.Email,
  });

  if (!user) {
    const err = "Invalid Email";
    res.status(500).json(err);
  } else {
    const match = await bcryptjs.compare(req.body.Password, user.Password);
    if (match) {
      res.status(200).json(user);
    } else {
      const err = "Invalid Password";
      res.status(500).json(err);
    }
  }
};
