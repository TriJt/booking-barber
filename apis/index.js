// import library
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

// import components
import AuthRoute from "./src/routers/Auth.route.js";
import StoreRoute from "./src/routers/Store.route.js";
import AppointmentRoute from "./src/routers/Appointment.route.js";
import StaffRoute from "./src/routers/Staff.route.js";
import CustomerRoute from "./src/routers/Customer.route.js";
import ReceiptsRoute from "./src/routers/Receipt.route.js";
import ServiceRoute from "./src/routers/Service.route.js";
import CategoryRoute from "./src/routers/Category.route.js";
import PostRoute from "./src/routers/Post.route.js";
import ContactRoute from "./src/routers/Contact.route.js";
import SalaryRoute from "./src/routers/Salary.route.js";
import EvaluateRoute from "./src/routers/Evaluate.route.js";

const app = express();
dotenv.config();
const corsOptions = {
  credentials: true, // This is important.
  origin: true,
};
app.use(cors(corsOptions));

//connection to database
mongoose
  .connect(process.env.MONGO_PROD_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

//route for Auth
app.use("/api/auth", AuthRoute);
//route for Store
app.use("/api/store", StoreRoute);
//route for Staff
app.use("/api/staff", StaffRoute);
//route for category
app.use("/api/category", CategoryRoute);
//route for Service
app.use("/api/service", ServiceRoute);
//route for Customer
app.use("/api/customer", CustomerRoute);
//route for Receipts
app.use("/api/receipt", ReceiptsRoute);
//route for Receipts
app.use("/api/post", PostRoute);
// route for Appointment
app.use("/api/appointment", AppointmentRoute);
app.use("/api/salary", SalaryRoute);
// route for Appointment
app.use("/api/contact", ContactRoute);

// route for evaluate
app.use("/api/evaluate", EvaluateRoute);

function getCurrentTime() {
  const date = new Date();
  console.log(date);
}

function getEndDateTime(dateTime) {
  // 2021-03-22T09:00:00
  const hrs = (parseInt(dateTime.split("T")[1].split(":")[0]) + 1)
    .toString()
    .padStart(2, "0");
  const time = hrs + ":00:00";
  const date = dateTime.split("T")[0];
  return date + "T" + time;
}

app.listen(8800, () => {
  console.log("Server is running");
});
