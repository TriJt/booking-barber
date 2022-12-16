import express from "express";
import { GetAppointmentByUserId } from "../app/controllers/Appointment.controller.js";
const router = express.Router();
import {
  CreateReceipt,
  UpdateReceipt,
  DeleteReceipt,
  GetReceiptByName,
  GetReceipts,
  GetADate,
  GetByMonth,
  GetByDateChoose,
  GetByYear,
  GetListReceiptByDate,
  GetAWeek,
  GetReceiptByUserId,
  GetReceiptsById,
  GetForStaff,
} from "../app/controllers/Receipt.controller.js";

// create Receipt
router.post("/add", CreateReceipt);

// update information of Receipt
router.put("/update/:id", UpdateReceipt);

// delete Receipt
router.delete("/delete/:id", DeleteReceipt);

// get all Receipt
router.get("/all", GetReceipts);

// get Receipt by id
router.post("/get-by-id", GetReceiptsById);

//get list receipt by date
router.post("/list/date", GetListReceiptByDate);

// sum total get by date i choose
router.post("/Choose", GetByDateChoose);

// chart week
router.post("/week", GetAWeek);

//sum total in a day
router.get("/date", GetADate);

// sum total in a month
router.get("/month", GetByMonth);

//sum total in a  year
router.get("/year", GetByYear);

// get Receipt by id
router.get("/", GetReceiptByName);

// get receipt with user Id
router.post("/customer-evaluate", GetReceiptByUserId);

// get for staff in day current
router.post("/staff-current-day", GetForStaff);

export default router;
