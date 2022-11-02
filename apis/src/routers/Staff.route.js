import express from "express";
const router = express.Router();
import {
  CreateStaff,
  UpdateStaff,
  DeleteStaff,
  GetStaffById,
  GetStaffs,
  CountStaff,
  GetTime,
  GetAllDate,
} from "../app/controllers/Staff.controller.js";
import { Staff, DateSchedule, Slot } from "../app/models/Staff/Staff.model.js";

//count staff
router.get("/count", CountStaff);

// create Staff
router.post("/add", CreateStaff);

// update information of Staff
router.put("/update/:id", UpdateStaff);

// delete Staff
router.delete("/delete/:id", DeleteStaff);

// get all Staff by id
router.get("/all", GetStaffs);

// get time of date
router.get("/time", GetTime);

// get all of date
router.get("/date-all", GetAllDate);
// get Staff by id
router.get("/get/:id", GetStaffById);

export default router;
