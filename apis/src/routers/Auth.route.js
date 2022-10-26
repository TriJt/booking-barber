import express from "express";
const router = express.Router();
import {
  RegisterForCustomer,
  LoginForCustomer,
  LoginForStaff,
  SendEmail,
  ChangePassword,
  SendEmailStaff,
  ChangePasswordStaff,
} from "../app/controllers/Auth.controller.js";

// Sign up for customer don't have account
router.post("/register", RegisterForCustomer);

// Login for customer
router.post("/login_customer", LoginForCustomer);

//Send email for customer
router.post("/send-email", SendEmail);
//Change password for customer
router.post("/change-password", ChangePassword);

// Login for Staff
router.post("/login_staff", LoginForStaff);

//Send email for staff
router.post("/staff-send-email", SendEmailStaff);
//Change password for staff
router.post("/staff-change-password", ChangePasswordStaff);

export default router;
