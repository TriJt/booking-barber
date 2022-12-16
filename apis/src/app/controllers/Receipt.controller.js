import Receipt from "../models/Receipts/Receipts.model.js";
import { Service } from "../models/Service/Service.model.js";
import { Customer } from "../models/Customer/Customer.model.js";
import bcryptjs from "bcryptjs";
import moment from "moment";

// create information of Receipt
export const CreateReceipt = async (req, res) => {
  const responseType = {};
  const input = req.body;
  const manyService = input.Services;

  // find service when customer go to barber to get price
  const service = await Service.find({
    Name_Service: { $in: manyService },
  });
  // sum total price
  const length = service.length;
  let totalPrice = 0;
  for (let i = 0; i < length; i++) {
    const price = service[i].Price;
    totalPrice += price;
  }
  //the final price to charge the customer
  const discount = input.Discount;
  const total = (totalPrice * (100 - discount)) / 100;
  // check mail in database
  // if check === null  => update collect +=1

  const check = await Customer.findOne({ Email: input.Email });
  if (check !== null) {
    const update = await Customer.findOneAndUpdate(
      { Email: input.Email },
      { $inc: { Collect: 1 } }
    );
  }
  // if  check === null => create new customer
  if (check === null) {
    try {
      const salt = bcryptjs.genSaltSync(10);
      const pass = await input.Telephone;
      const hashPassword = bcryptjs.hashSync(pass, salt);
      const newCus = new Customer({
        Name_Customer: input.Name_Customer,
        Telephone: input.Telephone,
        Email: input.Email,
        Password: hashPassword,
        Collect: 1,
      });
      const save = await newCus.save();
    } catch (error) {
      console.log(error);
    }
  }
  // save information to database
  try {
    const newReceipt = new Receipt({
      Staff_Name: input.Staff_Name,
      Name_Customer: input.Name_Customer,
      Telephone: input.Telephone,
      Email: input.Email,
      Services: manyService,
      SumPrice: totalPrice,
      Discount: discount,
      Total: total,
    });

    const save = await newReceipt.save();
    responseType.message = "Create  successfully";
    responseType.status = 200;
    responseType.value = save;
  } catch (error) {
    responseType.status = 404;
    responseType.message = "Create service failed";
  }
  res.json(responseType);
};

// complete
export const GetByDateChoose = async (req, res) => {
  const input = req.body;
  const start = input.Start;
  const end = input.End;
  try {
    const getByDate = await Receipt.aggregate([
      {
        $match: { createdAt: { $gte: new Date(start), $lt: new Date(end) } },
      },
    ]);
    const length = getByDate.length;

    let sumTotal = 0;
    for (let i = 0; i < length; i++) {
      const total = getByDate[i].Total;
      sumTotal += total;
    }

    res.status(200).json(sumTotal.toFixed(1));
  } catch (err) {
    res.status(400).json(err);
  }
};
// update information of Receipt
export const UpdateReceipt = async (req, res) => {
  const responseType = {};
  const input = req.body;
  const manyService = input.Services;
  // find service when customer go to barber to get price
  const service = await Service.find({
    Name_Service: { $in: manyService },
  });
  // sum total price
  const length = service.length;
  let totalPrice = 0;
  for (let i = 0; i < length; i++) {
    const price = service[i].Price;
    totalPrice += price;
  }
  //the final price to charge the customer
  const discount = input.Discount;
  const total = (totalPrice * (100 - discount)) / 100;

  // update receipt
  try {
    const data = {
      Staff_Name: input.Staff_Name,
      Name_Customer: input.Name_Customer,
      Telephone: input.Telephone,
      Email: input.Email,
      Services: manyService,
      Discount: discount,
      Total: total,
    };
    const updateReceipt = await Receipt.findByIdAndUpdate(
      req.params.id,
      { $set: data },
      {
        new: true,
      }
    );
    // save information to database
    const save = await updateReceipt.save();
    responseType.message = "Update successfully";
    responseType.status = 200;
    responseType.value = save;
  } catch (error) {
    responseType.status = 404;
    responseType.message = "Update receipt failed";
  }
  res.json(responseType);
};

// delete information of Receipt
export const DeleteReceipt = async (req, res) => {
  const responseType = {};
  try {
    await Receipt.findByIdAndDelete(req.params.id);
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

// get information of Receipt by name
export const GetReceiptByName = async (req, res) => {
  const responseType = {};
  const input = req.body;
  const Name_Customer = req.query.Name_Customer;
  const Name_Staff = req.query.Staff_Name;
  if (Receipt) {
    const receipt = (await Name_Staff)
      ? await Receipt.find({ Staff_Name: Name_Staff })
      : await Receipt.find({
          Name_Customer: Name_Customer,
        });
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

// get all information of Receipt
export const GetReceipts = async (req, res) => {
  const responseType = {};
  if (Receipt) {
    const receipt = await Receipt.find();
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

// get by id information of Receipt
export const GetReceiptsById = async (req, res) => {
  const responseType = {};
  if (Receipt) {
    const receipt = await Receipt.findById({ _id: req.body.id });
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

//get with a date in when staff input
export const GetListReceiptByDate = async (req, res) => {
  const responseType = {};
  const input = req.body;
  const start = input.Start;
  const end = input.End;
  if (Receipt) {
    const data = await Receipt.find({
      createdAt: { $gte: new Date(start), $lt: new Date(end) },
    });
    responseType.message = "Get receipt successfully";
    responseType.status = 200;
    responseType.value = data;
  } else {
    responseType.statusText = "Error";
    responseType.message = "We have error in somewhere";
    responseType.status = 404;
  }
  res.json(responseType);
};

// get by one date

export const GetADate = async (req, res) => {
  const responseType = {};
  try {
    const getByDate = await Receipt.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          totalAmount: { $sum: "$Total" },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    responseType.message = "Get receipt successfully";
    responseType.status = 200;
    responseType.value = getByDate;
  } catch (err) {
    responseType.statusText = "Error";
    responseType.message = "We have error ";
    responseType.status = 404;
  }
  res.json(responseType);
};

export const GetAWeek = async (req, res) => {
  const input = req.body;
  const responseType = {};
  const start = moment(input.Start).format("YYYY-MM-DD");
  const end = moment(input.End).add(1, "day").format("YYYY-MM-DD");
  try {
    const getByDate = await Receipt.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(start),
            $lt: new Date(end),
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          totalAmount: { $sum: "$Total" },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    responseType.message = "Get receipt successfully";
    responseType.status = 200;
    responseType.value = getByDate;
  } catch (err) {
    responseType.statusText = "Error";
    responseType.message = "We have error ";
    responseType.status = 404;
  }
  res.json(responseType);
};

// group in month
export const GetByMonth = async (req, res) => {
  const responseType = {};
  try {
    const getByMonth = await Receipt.aggregate([
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
    responseType.message = "We have error";
    responseType.status = 404;
  }
  res.json(responseType);
};

// group in Year
export const GetByYear = async (req, res) => {
  const responseType = {};
  // const date = req.body.Date;
  try {
    const getByYear = await Receipt.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y", date: "$createdAt" } },
          totalAmount: { $sum: "$Total" },
          count: { $sum: 1 },
        },
      },
    ]);
    responseType.message = "Get receipt successfully";
    responseType.status = 200;
    responseType.value = getByYear;
  } catch (err) {
    responseType.statusText = "Error";
    responseType.message = "We have error ";
    responseType.status = 404;
  }
  res.json(responseType);
};

// get reciept with userId
export const GetReceiptByUserId = async (req, res) => {
  const responseType = {};
  try {
    const receipt = await Receipt.find({
      Name_Customer: req.body.Name_Customer,
    }).sort({ createdAt: -1 });
    responseType.message = "Get receipt  successfully";
    responseType.status = 200;
    responseType.value = receipt;
  } catch (error) {
    responseType.message = "Get receipt failed";
    responseType.status = 500;
  }
  res.json(responseType);
};

// get for current day staff
export const GetForStaff = async (req, res) => {
  const input = req.body;
  const start = moment(input.Start).format("YYYY-MM-DD");
  const end = moment(input.End).add(1, "day").format("YYYY-MM-DD");

  const responseType = {};
  try {
    const receipt = await Receipt.find({
      $and: [
        {
          createdAt: {
            $gte: new Date(start),
            $lt: new Date(end),
          },
        },
        { Staff_Name: input.Staff_Name },
      ],
    });
    console.log(receipt);

    responseType.message = "Get receipt successfully";
    responseType.status = 200;
    responseType.value = receipt;
  } catch (error) {
    responseType.message = "Get receipt failed";
    responseType.status = 500;
  }
  res.json(responseType);
};
