import express from "express";
const router = express.Router();
import {
  CreateNewSalary,
  DeleteSalary,
  GetAll,
  GetByDate,
  GetById,
  GetByMonth,
  UpdateSalary,
} from "../app/controllers/Salary.controller.js";

// create
router.post("/add", CreateNewSalary);

// update
router.put("/update/:id", UpdateSalary);

// delete
router.delete("/delete/:id", DeleteSalary);

// get all
router.get("/all", GetAll);

// get by id
router.get("/:id", GetById);

// post by date
router.post("/date", GetByDate);

// get group by month
router.post("/month", GetByMonth);

export default router;
