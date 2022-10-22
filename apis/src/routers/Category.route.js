import express from "express";
const router = express.Router();
import {
  CreateCategory,
  GetAllCategory,
  UpdateCategory,
  DeleteCategory,
  GetCategoryByQuery,
} from "../app/controllers/Category.controller.js";

// create Service
router.post("/add", CreateCategory);

// update information of Service
router.put("/update/:id", UpdateCategory);

// delete Service
router.delete("/delete/:id", DeleteCategory);
// get all Service by id
router.get("/all", GetAllCategory);

// get Service by id
router.get("/:id", GetCategoryByQuery);

export default router;
