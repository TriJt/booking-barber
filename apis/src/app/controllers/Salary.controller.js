import { Salary } from "../models/Staff/Staff.model";

// create
export const CreateNewSalary = async (req, res) => {
  const responseType = {};
  const input = req.body;
  const total = input.Allowance + input.Salary;
  const status = "Paid";
  try {
    const New = new Salary({
      StaffId: input.StaffId,
      Name: input.Name,
      Status: status,
      Date: input.Date,
      Salary: input.Salary,
      Allowance: input.Allowance,
      Total: total,
    });
    const save = await New.save();
    responseType.message = "Create salary successfully";
    responseType.status = 200;
    responseType.value = save;
  } catch (error) {
    responseType.message = "Crete salary failed";
    responseType.status = 400;
  }

  res.json(responseType);
};

// update
export const UpdateSalary = async (req, res) => {
  const responseType = {};
  const input = req.body;
  try {
    const data = {
      StaffId: input.StaffId,
      Name: input.Name,
      Status: input.Status,
      Date: input.Date,
      Salary: input.Salary,
      Allowance: input.Allowance,
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

// get salary by month to insert to chart

export const GetByMonth = async (req, res) => {
  const responseType = {};
  try {
    const getByMonth = await Salary.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          totalAmount: { $sum: "$Total" },
          count: { $sum: 1 },
        },
      },
    ]);
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
