import express from "express";
const router = express.Router();
import {
    CreateStaff,
    UpdateStaff,
    DeleteStaff,
    GetStaffById,
    GetStaffs,
    CountStaff
} from "../app/controllers/Staff.controller.js"

//count staff
router.get("/count_staff", CountStaff)

// create Staff
router.post("/create", CreateStaff);

// update information of Staff
router.put("/update/:id", UpdateStaff);

// delete Staff 
router.delete("/delete/:id", DeleteStaff);

// get Staff by id 
router.get("/", GetStaffById);

// get all Staff by id 
router.get("/all", GetStaffs)
export default router;