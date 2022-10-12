import express from "express";
const router = express.Router();
import {
    CreateCategory,
    UpdateCategory,
    DeleteCategory,
    GetCategoryById,
    GetCategories
} from "../app/controllers/Category.controller.js"

// create Category
router.post("/create", CreateCategory);

// update information of Category
router.put("/update", UpdateCategory);

// delete Category 
router.delete("/delete", DeleteCategory);

// get Category by id 
router.get("/:CategoryId", GetCategoryById);

// get all Category by id 
router.get("/", GetCategories)
export default router;