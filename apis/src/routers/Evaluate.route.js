import express from "express";
import {
  CreateEvaluate,
  DeleteEvaluate,
  GetEvaluateByIdReceipt,
  UpdateEvaluate,
} from "../app/controllers/Evaluate.controller.js";
const router = express.Router();

router.post("/", CreateEvaluate);

router.put("/:id", UpdateEvaluate);

router.delete("/:id", DeleteEvaluate);

router.post("/receipt_id", GetEvaluateByIdReceipt);

export default router;
