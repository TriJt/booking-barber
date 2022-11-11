import express from "express";
const router = express.Router();
import {
  AddAppointment,
  UpdateAppointment,
  UpdateCancelStatusAppointment,
  GetAppointmentById,
  GetAppointments,
  GetSlots,
  GetAppointmentByUserId,
  GetAppointmentMatchPending,
  GetByDateChoose,
} from "../app/controllers/Appointment.controller.js";

// get appointment with status pending
router.get("/pending", GetAppointmentMatchPending);

router.post("/choose", GetByDateChoose);

// get slot of staff to booking appointment

router.post("/get-slots", GetSlots);

// create Appointment
router.post("/add", AddAppointment);

// update information of Appointment
router.put("/update", UpdateAppointment);

// update cancel Appointment for customer
router.put("/update-cancel/:id", UpdateCancelStatusAppointment);

// get all Appointment by id
router.get("/all", GetAppointments);

// get Appointment by id
router.get("/:id", GetAppointmentById);

// get appointment with userId
router.get("/", GetAppointmentByUserId);

export default router;
