import express from "express";
const router = express.Router();
import {
  AddAppointment,
  UpdateAppointment,
  DeleteAppointment,
  GetAppointmentById,
  GetAppointments,
  GetSlots,
} from "../app/controllers/Appointment.controller.js";

// get slot of staff to booking appointment
router.post("/get-slots", GetSlots);

// create Appointment
router.post("/add", AddAppointment);

// update information of Appointment
router.put("/update/:id", UpdateAppointment);

// delete Appointment
router.delete("/delete/:id", DeleteAppointment);

// get all Appointment by id
router.get("/all", GetAppointments);

// get Appointment by id
router.get("/:id", GetAppointmentById);

export default router;
