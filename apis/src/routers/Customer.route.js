import express from "express";
const router = express.Router();
import {
  UpdateCustomer,
  DeleteCustomer,
  GetCustomerById,
  GetCustomers,
  CountCustomer,
  CreateCustomer,
} from "../app/controllers/Customer.controller.js";

// count customer
router.get("/count", CountCustomer);

// create customer for admin page
router.post("/create", CreateCustomer);

// update information of Customer
router.put("/update/:id", UpdateCustomer);

// delete Customer
router.delete("/delete/:id", DeleteCustomer);

// get Customer by id
router.get("/", GetCustomerById);

// get all Customer by id
router.get("/all", GetCustomers);

export default router;
