import express from "express";
const router = express.Router();
import {
  getAll,
  SendEmailContact,
} from "../app/controllers/Contact.controller.js";

// create and send email to email admin
router.post("/add", SendEmailContact);

// get all contact
router.get("/", getAll);
export default router;
