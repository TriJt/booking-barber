import express from "express";
const router = express.Router();
import {
    CreateReceipt,
    UpdateReceipt,
    DeleteReceipt,
    GetReceiptById,
    GetReceipts
} from "../app/controllers/Receipt.controller.js"

// create Receipt
router.post("/create", CreateReceipt);

// update information of Receipt
router.put("/update", UpdateReceipt);

// delete Receipt 
router.delete("/delete", DeleteReceipt);

// get Receipt by id 
router.get("/:ReceiptId", GetReceiptById);

// get all Receipt by id 
router.get("/", GetReceipts)
export default router;