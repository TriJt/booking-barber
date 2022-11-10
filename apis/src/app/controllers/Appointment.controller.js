import Appointment from "../models/Appointment.model.js";
import {
  Staff,
  Salary,
  Slot,
  DateSchedule,
} from "../models/Staff/Staff.model.js";
import { Service } from "../models/Service/Service.model.js";

// function create new slot for get slots from staff
function createDate(date) {
  return new DateSchedule({
    date: date,
    slots: [
      new Slot({
        Time: "08:00",
        isBooked: false,
      }),
      new Slot({
        Time: "08:30",
        isBooked: false,
      }),
      new Slot({
        Time: "09:00",
        isBooked: false,
      }),
      new Slot({
        Time: "09:30",
        isBooked: false,
      }),
      new Slot({
        Time: "10:00",
        isBooked: false,
      }),
      new Slot({
        Time: "10:30",
        isBooked: false,
      }),
      new Slot({
        Time: "11:00",
        isBooked: false,
      }),
      new Slot({
        Time: "11:30",
        isBooked: false,
      }),
      new Slot({
        Time: "12:00",
        isBooked: false,
      }),
      new Slot({
        Time: "12:30",
        isBooked: false,
      }),

      new Slot({
        Time: "13:00",
        isBooked: false,
      }),
      new Slot({
        Time: "13:30",
        isBooked: false,
      }),
      new Slot({
        Time: "14:00",
        isBooked: false,
      }),
      new Slot({
        Time: "14:30",
        isBooked: false,
      }),
      new Slot({
        Time: "15:00",
        isBooked: false,
      }),
      new Slot({
        Time: "15:30",
        isBooked: false,
      }),
      new Slot({
        Time: "16:00",
        isBooked: false,
      }),
      ,
      new Slot({
        Time: "16:30",
        isBooked: false,
      }),
      ,
      new Slot({
        Time: "17:00",
        isBooked: false,
      }),
      new Slot({
        Time: "17:30",
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
// for client
export const AddAppointment = async (req, res) => {
  const staffId = req.body.StaffId; // staff id
  const customerId = req.body.CustomerId; // Customer id
  const customerName = req.body.NameCustomer;
  const customerTelephone = req.body.TelephoneCustomer;
  const slotId = req.body.SlotId; // slot id
  const dateId = req.body.DateId;
  const email = req.body.Email;
  const status = "pending";
  const manyService = req.body.Services;

  // const staff = await Staff.findById({ _id: staffId });
  // console.log(staff);
  // const date = staff.Dates.in(dateId);
  // console.log(date);
  // const slot = await date.slots.in(slotId);
  // console.log(slot);
  // await slot.findByIdAndUpdate(
  //   { _id: slotId },
  //   { isBooked: true },
  //   { new: true }
  // );

  Staff.findOne({ _id: staffId }).then((staff) => {
    const date = staff.Dates.id(dateId);
    console.log("date", date);
    const slot = date.slots.id(slotId);
    console.log("slot", slot);
    // const slotTime = slot.Time;
    // console.log(slotTime);
    // slot.findByIdAndUpdate({ _id: slotId }, { isBooked: true }, { new: true });
    slot.isBooked = true;

    staff.save().then(() => {
      // create an entry in the appointment database
      const newAppointment = new Appointment({
        StaffId: staffId,
        DateId: dateId,
        SlotId: slotId,
        CustomerId: customerId,
        date: date.date,
        slotTime: slot.Time,
        Staff: staff.Name,
        NameCustomer: customerName,
        TelephoneCustomer: customerTelephone,
        Email: email,
        Services: manyService,
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
// for staff
// cancel
export const UpdateAppointment = async (req, res) => {
  const staffId = req.body.StaffId; // staff id
  const customerId = req.body.CustomerId; // Customer id
  const customerName = req.body.NameCustomer;
  const customerTelephone = req.body.TelephoneCustomer;
  const slotId = req.body.SlotId; // slot id
  const dateId = req.body.DateId;
  const email = req.body.Email;
  const status = req.body.Status;
  const note = req.body.Note;
  const manyService = req.body.Services;

  Staff.findOne({ _id: staffId }).then((staff) => {
    const date = staff.Dates.id(dateId);
    const slot = date.slots.id(slotId);
    slot.isBooked = true;
    const appointmentId = req.params.id;
    staff.save().then(() => {
      // create an entry in the appointment database
      const data = {
        StaffId: staffId,
        DateId: dateId,
        SlotId: slotId,
        CustomerId: customerId,
        date: date.date,
        slotTime: slot.Time,
        Staff: staff.Name,
        NameCustomer: customerName,
        TelephoneCustomer: customerTelephone,
        Email: email,
        Services: manyService,
        Status: status,
        Note: note,
      };
      Appointment.findByIdAndUpdate(
        { appointmentId },
        { $set: data },
        {
          new: true,
        }
      )
        .exec()
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

// delete information of Appointment for customer
export const UpdateCancelStatusAppointment = async (req, res) => {
  const staffId = req.body.StaffId;
  const slotId = req.body.SlotId;
  const dateId = req.body.DateId;
  const status = req.body.Status;

  Staff.findOne({ _id: staffId }).then((staff) => {
    const date = staff.Dates.id(dateId);
    const slot = date.slots.id(slotId);
    slot.isBooked = false;
    const appointmentId = req.params.id;
    staff.save().then(() => {
      // create an entry in the appointment database
      Appointment.findByIdAndUpdate(appointmentId, { Status: status })
        .exec()
        .then((status) => {
          return res.status(200).json(status);
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json(err);
        });
    });
  });
};

// get information of Appointment by id
export const GetAppointmentById = async (req, res) => {
  const responseType = {};
  try {
    const appointmentId = req.params.id;
    const appointment = await Appointment.findOne({
      _id: appointmentId,
    });
    responseType.message = "Get appointment successfully";
    responseType.status = 200;
    responseType.value = appointment;
  } catch (err) {
    responseType.message = "Get appointment failed";
    responseType.status = 500;
  }
  res.json(responseType);
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

    const staffId = req.body.staffId;

    const appointments = await Appointment.find({
      staffId: staffId,
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
export const GetAppointments = async (req, res) => {
  const responseType = {};
  try {
    const appointment = await Appointment.find();
    responseType.message = "Get appointment successfully";
    responseType.status = 200;
    responseType.value = appointment;
  } catch (error) {
    responseType.message = "Get appointment failed";
    responseType.status = 500;
  }
  res.json(responseType);
};

export const GetAppointmentByUserId = async (req, res) => {
  const responseType = {};
  const userId = req.query.UserId;
  try {
    const appointment = await Appointment.find({ CustomerId: userId });
    responseType.message = "Get appointment successfully";
    responseType.status = 200;
    responseType.value = appointment;
  } catch (error) {
    responseType.message = "Get appointment failed";
    responseType.status = 500;
  }
  res.json(responseType);
};

export const GetAppointmentMatchPending = async (req, res) => {
  const userId = req.query.UserId;
  const responseType = {};
  try {
    const appointment = await Appointment.find({
      $and: [{ CustomerId: userId }, { Status: "pending" }],
    });
    responseType.message = "Get appointment successfully";
    responseType.status = 200;
    responseType.value = appointment;
  } catch (error) {
    responseType.message = "Get appointment failed";
    responseType.status = 500;
  }
  res.json(responseType);
};

export const GetAppointmentMatchCancel = async (req, res) => {
  const userId = req.query.UserId;
  const responseType = {};
  try {
    const appointment = await Appointment.find({
      $and: [{ CustomerId: userId }, { Status: "cancel" }],
    });
    responseType.message = "Get appointment successfully";
    responseType.status = 200;
    responseType.value = appointment;
  } catch (error) {
    responseType.message = "Get appointment failed";
    responseType.status = 500;
  }
  res.json(responseType);
};
