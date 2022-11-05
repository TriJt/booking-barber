import express from "express";
const router = express.Router();
import { SendEmailContact } from "../app/controllers/Contact.controller.js";

// create and send email to email admin
router.post("/add", SendEmailContact);

export default router;
