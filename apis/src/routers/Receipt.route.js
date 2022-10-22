import express from "express";
const router = express.Router();
import {
  CreateReceipt,
  UpdateReceipt,
  DeleteReceipt,
  GetReceiptById,
  GetReceipts,
} from "../app/controllers/Receipt.controller.js";

// create Receipt
router.post("/add", CreateReceipt);

// update information of Receipt
router.put("/update/:id", UpdateReceipt);

// delete Receipt
router.delete("/delete/:id", DeleteReceipt);

// get Receipt by id
router.get("/:id", GetReceiptById);

// get all Receipt by id
router.get("/", GetReceipts);
export default router;
