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
  GetAppointmentMatchCancel,
  GetAllAppointmentMatchPending,
  GetAllAppointmentMatchPendingWithRangeTime,
  AppointmentPieChart,
  GetAppointmentForStaff,
} from "../app/controllers/Appointment.controller.js";

// get appointment with status cancel
router.get("/cancel", GetAppointmentMatchCancel);

// get appointment with status pending
router.get("/pending", GetAppointmentMatchPending);

// get appointment with status pending
router.post("/all-pending", GetAllAppointmentMatchPending);

//  get appointment with status pending with time range
router.post("/time-range", GetAllAppointmentMatchPendingWithRangeTime);

// pie chart appointment
router.post("/chart", AppointmentPieChart);

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

// get appointment for staff
router.post("/appointment-for-staff", GetAppointmentForStaff);

export default router;
