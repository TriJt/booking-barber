import express from "express";
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
} from "../app/controllers/Receipt.controller.js";

// create Receipt
router.post("/add", CreateReceipt);

// update information of Receipt
router.put("/update/:id", UpdateReceipt);

// delete Receipt
router.delete("/delete/:id", DeleteReceipt);

// get all Receipt by id
router.get("/all", GetReceipts);

//get list receipt by date
router.post("/list/date", GetListReceiptByDate);

// sum total get by date i choose
router.post("/Choose", GetByDateChoose);

//sum total in a day
router.get("/date", GetADate);

// sum total in a month
router.get("/month", GetByMonth);

//sum total in a  year
router.get("/year", GetByYear);

// get Receipt by id
router.get("/", GetReceiptByName);

export default router;
