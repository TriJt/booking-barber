import { Staff } from "../models/Staff/Staff.model.js";
import bcryptjs from "bcryptjs";

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

// create information of Staff
// COMPLETE in back-end
export const CreateStaff = async (req, res) => {
  const responseType = {};
  const input = req.body;
  //create new user
  try {
    const salt = bcryptjs.genSaltSync(10);
    const pass = await input.Telephone;
    const hashPassword = bcryptjs.hashSync(pass, salt);
    const newStaff = new Staff({
      Name: input.Name,
      Telephone: input.Telephone,
      Email: input.Email,
      Password: hashPassword,
      Gender: input.Gender,
      isAdmin: input.isAdmin,
    });
    //save Customer in database and return response
    const save = await newStaff.save();
    responseType.statusText = "Success";
    responseType.message = "Create new staff successfully";
    responseType.status = 200;
    responseType.value = save;
  } catch {
    responseType.statusText = "Failed";
    responseType.status = 404;
    responseType.message = "Create staff failed";
  }
  res.json(responseType);
};

// update information of Staff
// COMPLETE in back-end
export const UpdateStaff = async (req, res) => {
  const input = req.body;
  const responseType = {};
  // check input
  if (req.body.StaffId === req.params.id) {
    const staff = await Staff.findByIdAndUpdate(
      req.params.id,
      {
        $set: input,
      },
      {
        new: true,
      }
    );

    const save = await staff.save();
    responseType.statusText = "Success";
    responseType.message = "Update successfully";
    responseType.status = 200;
    responseType.value = save;
  } else {
    responseType.statusText = "Error";
    responseType.message = "Update Failed ";
    responseType.status = 404;
  }
  res.json(responseType);
};

// delete information of Staff
// COMPLETE in back-end
export const DeleteStaff = async (req, res) => {
  const responseType = {};
  try {
    const staff = await Staff.findByIdAndDelete(req.params.id);
    responseType.statusText = "Success";
    responseType.message = "Delete Successfully";
    responseType.status = 200;
  } catch {
    responseType.statusText = "Failed";
    responseType.message = "Delete Failed";
    responseType.status = 500;
  }
  res.json(responseType);
};

// get information of Staff by id
// COMPLETE in back-end
export const GetStaffById = async (req, res) => {
  const responseType = {};
  const StaffId = req.query.StaffId;
  const Name = req.query.Name;
  if (Staff) {
    const staff = (await StaffId)
      ? await Staff.findById(StaffId)
      : await Staff.findOne({
          Name: Name,
        });
    responseType.statusText = "Success";
    responseType.message = "Get customer successfully";
    responseType.status = 200;
    responseType.value = staff;
  } else {
    responseType.statusText = "Error";
    responseType.message = "We have error in somewhere";
    responseType.status = 404;
  }
  res.json(responseType);
};

// get all information of Staff
// COMPLETE in back-end
export const GetStaffs = async (req, res) => {
  const responseType = {};
  if (Staff) {
    const staff = await Staff.find();
    responseType.statusText = "Success";
    responseType.message = "Get customer successfully";
    responseType.status = 200;
    responseType.value = staff;
  } else {
    responseType.statusText = "Error";
    responseType.message = "We have error in somewhere";
    responseType.status = 404;
  }
  res.json(responseType);
};

// count staff
// COMPLETE in back-end
export const CountStaff = async (req, res) => {
  const responseType = {};
  if (Staff) {
    const count = await Staff.countDocuments({});
    responseType.statusText = "Success";
    responseType.message = "Count customer successfully";
    responseType.status = 200;
    responseType.value = count;
  } else {
    responseType.statusText = "Error";
    responseType.message = "We have error in somewhere";
    responseType.status = 404;
  }
  res.json(responseType);
};

// get-slots
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
    for (const i of staff.Dates) {
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
