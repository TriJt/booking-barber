import { Salary } from "../models/Staff/Staff.model.js";
import moment from "moment";

// create
export const CreateNewSalary = async (req, res) => {
  const responseType = {};
  const salary = parseInt(req.body.Salary);
  const allow = parseInt(req.body.Allowance);
  const total = parseInt(req.body.Total);
  console.log(salary);
  console.log(allow);
  console.log(total);
  const newData = new Salary({
    Name: req.body.Name,
    Status: req.body.Status,
    Date: req.body.Date,
    Salary: salary,
    Allowance: allow,
    Total: total,
  });

  const save = await newData.save();
  if (save) {
    responseType.message = "Add successfully";
    responseType.status = 200;
    responseType.value = save;
  } else {
    responseType.statusText = "Failed";
    responseType.message = "Add Failed";
    responseType.status = 500;
  }
  res.json(responseType);
};

// update
export const UpdateSalary = async (req, res) => {
  const responseType = {};
  const input = req.body;
  const salary = parseInt(req.body.Salary);
  const allow = parseInt(req.body.Allowance);
  const total = salary + allow;
  console.log(salary);
  console.log(allow);
  console.log(total);
  try {
    const data = {
      Name: input.Name,
      Status: input.Status,
      Date: input.Date,
      Salary: salary,
      Allowance: allow,
      Total: total,
    };
    const update = await Salary.findByIdAndUpdate(
      req.params.id,
      { $set: data },
      { new: true }
    );
    const save = await update.save();
    responseType.message = "Update successfully";
    responseType.status = 200;
    responseType.value = save;
  } catch (error) {
    responseType.status = 404;
    responseType.message = "Update service failed";
  }

  res.json(responseType);
};

// delete
export const DeleteSalary = async (req, res) => {
  const responseType = {};

  try {
    await Salary.findByIdAndDelete(req.params.id);
    responseType.statusText = "Success";
    responseType.message = "Delete Successfully";
    responseType.status = 200;
  } catch (err) {
    responseType.statusText = "Failed";
    responseType.message = "Delete Failed";
    responseType.status = 500;
  }

  res.json(responseType);
};
// get all
export const GetAll = async (req, res) => {
  const responseType = {};
  if (Salary) {
    const receipt = await Salary.find();
    responseType.message = "Get receipt successfully";
    responseType.status = 200;
    responseType.value = receipt;
  } else {
    responseType.statusText = "Error";
    responseType.message = "We have error in somewhere";
    responseType.status = 404;
  }

  res.json(responseType);
};

// get by id
export const GetById = async (req, res) => {
  const responseType = {};

  try {
    const receipt = await Salary.findById(req.params.id);
    responseType.message = "Get Salary successfully";
    responseType.status = 200;
    responseType.value = receipt;
  } catch (error) {
    responseType.statusText = "Error";
    responseType.message = "We have error !!";
    responseType.status = 404;
  }

  res.json(responseType);
};

// get data with date start and date end

export const GetByDate = async (req, res) => {
  const responseType = {};
  const input = req.body;

  res.json(responseType);
};

// get list salary by month to insert to chart

export const GetByMonth = async (req, res) => {
  const responseType = {};
  const input = req.body;
  const start = moment(input.Start).format("YYYY-MM-DD");
  const end = moment(input.End).add(1, "day").format("YYYY-MM-DD");
  try {
    const getByMonth = await Salary.find({
      Date: { $gte: new Date(start), $lt: new Date(end) },
    }).sort({ Date: 1 });
    responseType.message = "Get receipt successfully";
    responseType.status = 200;
    responseType.value = getByMonth;
  } catch (err) {
    responseType.statusText = "Error";
    responseType.message = "We have error ";
    responseType.status = 404;
  }

  res.json(responseType);
};

// Get salary with name staff with previous month

export const GetSalaryPayInMonth = async (req, res) => {
  const responseType = {};
  const input = req.body;
  const start = moment(input.Start).format("YYYY-MM-DD");
  const end = moment(input.End).add(1, "day").format("YYYY-MM-DD");
  try {
    const getByDate = await Salary.aggregate([
      {
        $match: {
          Date: {
            $gte: new Date(start),
            $lt: new Date(end),
          },
        },
      },
      {
        $group: {
          _id: "$Name",
          totalAmount: { $sum: "$Total" },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    responseType.message = "Get receipt successfully";
    responseType.status = 200;
    responseType.value = getByDate;
  } catch (err) {
    responseType.message = "Error";
    responseType.status = 404;
  }
  res.json(responseType);
};
