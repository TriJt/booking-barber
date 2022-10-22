import express from "express";
const router = express.Router();
import {
  RegisterForCustomer,
  LoginForCustomer,
  LoginForStaff,
  SendEmail,
  ChangePassword,
} from "../app/controllers/Auth.controller.js";

// Sign up for customer don't have account
router.post("/register", RegisterForCustomer);

// Login for customer
router.post("/login_customer", LoginForCustomer);

// Login for Staff
router.post("/login_staff", LoginForStaff);

//Send email
router.post("/send_email", SendEmail);
//Change password
router.post("/change-password", ChangePassword);

export default router;
