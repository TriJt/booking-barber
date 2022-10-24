import Appointment from "../models/Appointment.model.js";
import {
  Staff,
  Salary,
  Slot,
  DateSchedule,
} from "../models/Staff/Staff.model.js";

// function create new slot for get slots from staff
function createDate(date) {
  return new DateSchedule({
    date: date,
    slots: [
      new Slot({
        Time: "08:00:00",
        isBooked: false,
      }),
      new Slot({
        Time: "08:30:00",
        isBooked: false,
      }),
      new Slot({
        Time: "09:00:00",
        isBooked: false,
      }),
      new Slot({
        Time: "09:30:00",
        isBooked: false,
      }),
      new Slot({
        Time: "10:00:00",
        isBooked: false,
      }),
      new Slot({
        Time: "10:30:00",
        isBooked: false,
      }),
      new Slot({
        Time: "11:00:00",
        isBooked: false,
      }),
      new Slot({
        Time: "11:30:00",
        isBooked: false,
      }),
      new Slot({
        Time: "12:00:00",
        isBooked: false,
      }),
      new Slot({
        Time: "12:30:00",
        isBooked: false,
      }),

      new Slot({
        Time: "13:00:00",
        isBooked: false,
      }),
      new Slot({
        Time: "13:30:00",
        isBooked: false,
      }),
      new Slot({
        Time: "14:00:00",
        isBooked: false,
      }),
      new Slot({
        Time: "14:30:00",
        isBooked: false,
      }),
      new Slot({
        Time: "15:00:00",
        isBooked: false,
      }),
      new Slot({
        Time: "15:30:00",
        isBooked: false,
      }),
      new Slot({
        Time: "16:00:00",
        isBooked: false,
      }),
      ,
      new Slot({
        Time: "16:30:00",
        isBooked: false,
      }),
      ,
      new Slot({
        Time: "17:00:00",
        isBooked: false,
      }),
    ],
  });
}

// get-slots
// check complete success
export const GetSlots = async (req, res) => {
  try {
    const id = req.body.staffId; //staff id
    const date = req.body.date; // date to booking appointment
    const staff = await Staff.findById({ _id: id });
    // staff not found
    if (staff === null) {
      return res.status(201).json({
        message: "Staff not found in the database!",
      });
    }
    // staff found
    // find the date
    let count = 0;
    for (let i of staff.Dates) {
      if (i.date === date) {
        return res.status(200).json(i);
      }
      count++;
    }

    const oldLength = count;

    // add new slots if date not found in the db
    const dateSchedule = createDate(date);
    const updatedStaff = await Staff.findOneAndUpdate(
      {
        _id: staff._id,
      },
      { $push: { Dates: dateSchedule } },
      { new: true }
    );

    if (updatedStaff) {
      return res.status(200).json(updatedStaff.Dates[oldLength]);
    } else {
      const err = { err: "An error occurred!" };
      throw err;
    }
  } catch (err) {
    return res.status(400).json({
      message: err,
    });
  }
};

// add new appointment
// id customer 6340237b2378a5e81354d518
// id staff 6343c7f4eb8b8c758a36a837
// id date 6356d5d446f871f2f213a530
// id slots  6356d5d446f871f2f213a51d

export const AddAppointment = (req, res) => {
  const responseType = {};
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
