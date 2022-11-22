import express from "express";
const router = express.Router();
import {
  UpdateCustomer,
  DeleteCustomer,
  GetCustomerById,
  GetCustomers,
  CountCustomer,
  CreateCustomer,
  GetAWeek,
  CountCustomerInASevenDay,
  GetLastCustomerLimit3,
  CheckCustomer,
} from "../app/controllers/Customer.controller.js";

// check telephone
router.post("/check", CheckCustomer);

// count customer
router.get("/count", CountCustomer);

// count customer in 7 day
router.post("/count-7day", CountCustomerInASevenDay);

// get data group customer for week
router.post("/week", GetAWeek);

// create customer for admin page
router.post("/create", CreateCustomer);

// update information of Customer
router.put("/update/:id", UpdateCustomer);

// delete Customer
router.delete("/delete/:id", DeleteCustomer);
// get all Customer by id
router.get("/all", GetCustomers);

// get last customer
router.get("/last-limit3", GetLastCustomerLimit3);

// get Customer by id
router.get("/:id", GetCustomerById);

export default router;
