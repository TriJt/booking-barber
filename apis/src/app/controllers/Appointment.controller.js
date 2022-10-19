import Appointment from "../models/Appointment.model.js";
import {
  Staff,
  Salary,
  Slot,
  DateSchedule,
} from "../models/Staff/Staff.model.js";

// add new appointment
export const AddAppointment = (req, res) => {
  const staffId = req.body.StaffId; // staff id
  const customerId = req.body.CustomerId; // Customer id
  const customerName = req.body.CustomerName;
  const customerTelephone = req.body.CustomerTelephone;
  const slotId = req.body.SlotId; // slot id
  const dateId = req.body.DateId;
  const status = "pending"; // date id

  Staff.findOne({ _id: staffId }).then((staff) => {
    const date = staff.Dates.id(dateId);
    const slot = date.slots.id(slotId);
    slot.isBooked = true;

    staff.save().then(() => {
      // create an entry in the appointment database
      const newAppointment = new Appointment({
        staffId,
        dateId,
        slotId,
        customerId,
        date: date.date,
        slotTime: slot.Time,
        Staff: staff.Name,
        CustomerName: customerName,
        CustomerTelephone: customerTelephone,
        Status: status,
      });
      console.log(newAppointment);
      newAppointment
        .save()
        .then((appointment) => {
          return res.status(200).json(appointment);
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json(err);
        });
    });
  });
};

// update information of Appointment
export const UpdateAppointment = async (req, res) => {};

// delete information of Appointment
export const DeleteAppointment = async (req, res) => {};

// get information of Appointment by id
export const GetAppointmentById = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const appointment = await Appointment.findOne({
      _id: appointmentId,
    });
    res.status(200).json(appointment);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

// post appointment today
export const AppointmentToday = async (req, res) => {
  try {
    const date = new Date();
    let currDate = date.getFullYear().toString();
    const month = date.getMonth() + 1;
    const day = get.getDate();

    currDate += month < 10 ? "-0" + month.toString() : "-" + month.toString();
    currDate += day < 10 ? "-0" + day.toString() : "-" + day.toString();

    const doctorId = req.body.doctorId;

    const appointments = await Appointment.find({
      doctorId: doctorId,
      date: currDate,
    });

    const sortedAppointments = appointments.sort((a, b) => {
      return (
        Date.parse(a.date + "T" + a.slotTime) -
        Date.parse(b.date + "T" + b.slotTime)
      );
    });

    res.status(200).json(sortedAppointments);
  } catch (error) {
    res.status(404).json(error);
  }
};

// get all information of Appointment
export const GetAppointments = async (req, res) => {};
