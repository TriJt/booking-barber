import express from "express";
const router = express.Router();
import {
  CreateStaff,
  UpdateStaff,
  DeleteStaff,
  GetStaffById,
  GetStaffs,
  CountStaff,
  GetSlots,
} from "../app/controllers/Staff.controller.js";
import { Staff, DateSchedule, Slot } from "../app/models/Staff/Staff.model.js";

//get slot of staff
router.get("/get-slots", GetSlots);

//count staff
router.get("/count_staff", CountStaff);

// create Staff
router.post("/add", CreateStaff);

// update information of Staff
router.put("/update/:id", UpdateStaff);

// delete Staff
router.delete("/delete/:id", DeleteStaff);

// get Staff by id
router.get("/", GetStaffById);

// get all Staff by id
router.get("/all", GetStaffs);
export default router;
