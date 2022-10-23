import express from "express";
const router = express.Router();
import {
  CreateReceipt,
  UpdateReceipt,
  DeleteReceipt,
  GetReceiptByName,
  GetReceipts,
  GetReceiptByStatus,
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

export default router;
