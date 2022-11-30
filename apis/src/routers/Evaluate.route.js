import express from "express";
import {
  CreateEvaluate,
  DeleteEvaluate,
  GetAllEvaluate,
  GetEvaluateByIdReceipt,
  GetEvaluateLimit3,
  UpdateEvaluate,
} from "../app/controllers/Evaluate.controller.js";
const router = express.Router();

router.post("/", CreateEvaluate);

router.put("/:id", UpdateEvaluate);

router.delete("/:id", DeleteEvaluate);

// get with receipt id
router.post("/receipt_id", GetEvaluateByIdReceipt);

// get with limit 3
router.get("/limit", GetEvaluateLimit3);

// get all
router.get("/all", GetAllEvaluate);

export default router;
