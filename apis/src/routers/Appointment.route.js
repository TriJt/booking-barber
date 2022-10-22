import express from "express";
const router = express.Router();
import {
  AddAppointment,
  UpdateAppointment,
  DeleteAppointment,
  GetAppointmentById,
  GetAppointments,
} from "../app/controllers/Appointment.controller.js";

// create Appointment
router.post("/add", AddAppointment);

// update information of Appointment
router.put("/update/:id", UpdateAppointment);

// delete Appointment
router.delete("/delete/:id", DeleteAppointment);

// get Appointment by id
router.get("/:id", GetAppointmentById);

// get all Appointment by id
router.get("/", GetAppointments);
export default router;
