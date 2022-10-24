import express from "express";
const router = express.Router();
import {
  CreateReceipt,
  UpdateReceipt,
  DeleteReceipt,
  GetReceiptByName,
  GetReceipts,
  GetReceiptByStatus,
  GetADate,
  GetByMonth,
  GetByDateChoose,
  GetByYear,
  GetListReceiptByDate,
} from "../app/controllers/Receipt.controller.js";

// create Receipt
router.post("/add", CreateReceipt);

// update information of Receipt
router.put("/update/:id", UpdateReceipt);

// delete Receipt
router.delete("/delete/:id", DeleteReceipt);

// get all Receipt by id
router.get("/all", GetReceipts);

// get Receipt by id
router.get("/", GetReceiptByName);

//get receipt by status
router.get("/status/", GetReceiptByStatus);

//get list receipt by date
router.get("/list", GetListReceiptByDate);

//sum total in a day
router.get("/date", GetADate);

// sum total get by date i choose
router.get("/Choose", GetByDateChoose);

//sum total in a week

// sum total in a month
router.get("/month", GetByMonth);

//sum total in a  year
router.get("/year", GetByYear);

export default router;
