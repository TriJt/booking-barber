import { Customer } from "../models/Customer/Customer.model.js";
import { Staff } from "../models/Staff/Staff.model.js";
import OTP from "../models/OTP.model.js";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";

// *Useful for getting environment vairables
dotenv.config();

// Register for customer don't have account

export const RegisterForCustomer = async (req, res) => {
  const responseType = {};
  const input = req.body;
  const user = await Customer.findOne({
    Email: input.Email,
  });
  const salt = bcryptjs.genSaltSync(10);
  const pass = await input.Password;
  const hashPassword = bcryptjs.hashSync(pass, salt);
  if (user) {
    responseType.status = 300;
    responseType.message = "Email is exist!";
  } else {
    //create new user
    if (!user) {
      const newCustomer = new Customer({
        Name_Customer: input.Name_Customer,
        Telephone: input.Telephone,
        Email: input.Email,
        Password: hashPassword,
      });
      //save Customer in database and return response
      const saveCustomer = await newCustomer.save();
      responseType.statusText = "Success";
      responseType.message = "Sign Up Successfully";
      responseType.status = 200;
      responseType.value = saveCustomer;
    } else {
      responseType.statusText = "Failed";
      responseType.status = 500;
      responseType.message = "Sign Up Failed";
    }
  }
  res.json(responseType);
};

// Login for customer have account

export const LoginForCustomer = async (req, res) => {
  const responseType = {};
  const user = await Customer.findOne({
    Email: req.body.Email,
  });
  if (!user) {
    responseType.status = 300;
    responseType.message = "Email was wrong!";
  }

  try {
    const match = await bcryptjs.compare(req.body.Password, user.Password);
    if (!match) {
      responseType.status = 301;
      responseType.message = "Password not match!";
    } else {
      responseType.status = 200;
      responseType.message = "Login Successfully";
      responseType.value = user;
    }
  } catch (err) {
    console.log(err);
  }

  res.json(responseType);
};

export const changePasswordWithOldPassword = async (req, res) => {
  const newPassword = req.body.newPassword;
  const pass = req.body.Password;
  const id = req.params.id;
  const responseType = {};
  // find customer with id
  try {
    const user = await Customer.findById({ _id: id });
    if (!user) {
      responseType.message = "Customer not found";
    }
    // valid old Password
    const check = await bcryptjs.compare(pass, user.Password);
    if (!check) {
      responseType.message = "Old password is wrong";
      responseType.status = 500;
    } else {
      const salt = bcryptjs.genSaltSync(10);
      const newPass = await newPassword;
      const hashPassword = bcryptjs.hashSync(newPass, salt);
      // update password with new pass word
      user.Password = hashPassword;
      const updated = await user.save();
      responseType.message = "Password change successfully";
      responseType.status = 200;
      responseType.value = updated;
    }
  } catch (err) {
    responseType.message = "Update password was failed";
  }

  res.json(responseType);
};

// reset password with otp code
// Change password for customer
export const ChangePassword = async (req, res) => {
  let data = await OTP.find({
    email: req.body.email,
    code: req.body.code,
  });
  const response = {};
  if (data) {
    let currentTime = new Date().getTime();
    let diff = data.expireIn - currentTime;
    if (diff < 0) {
      response.message = "Token Expire";
      response.statusText = "Error";
    } else {
      let user = await Customer.findOne({
        Email: req.body.Email,
      });
      user.Password = req.body.Password;
      user.save();
      response.message = "Password change successfully";
      response.statusText = "Success";
    }
  } else {
    response.statusText = "Error";
    response.message = "Wrong OTP";
  }
  res.status(200).json(response);
};

// nodemailer
// send mail to get otp

const GOOGLE_MAILER_CLIENT_ID = process.env.CLIENT_ID;
const GOOGLE_MAILER_CLIENT_SECRET = process.env.CLIENT_SECRET;
const GOOGLE_MAILER_REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const ADMIN_EMAIL_ADDRESS = "thanhtri6776@gmail.com";

//Initialize(Khởi tạo) OAuth2Client with Client ID and Client Secret

const myOAuth2Client = new OAuth2Client(
  GOOGLE_MAILER_CLIENT_ID,
  GOOGLE_MAILER_CLIENT_SECRET
);
// Set Refresh Token vào OAuth2Client Credentials
myOAuth2Client.setCredentials({
  refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
});

// Send email for customer
export const SendEmail = async (req, res) => {
  let data = await Customer.findOne({
    Email: req.body.Email,
  });
  const responseType = {};
  if (data) {
    let otpcode = Math.floor(Math.random() * 100000 + 1);
    let otpData = new OTP({
      email: req.body.Email,
      code: otpcode,
      expireIn: new Date().getTime() + 300 * 1000,
    });
    const myAccessTokenObject = await myOAuth2Client.getAccessToken();
    const myAccessToken = myAccessTokenObject?.token;

    // Tạo một biến Transport từ Nodemailer với đầy đủ cấu hình, dùng để gọi hành động gửi mail
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: ADMIN_EMAIL_ADDRESS,
        clientId: GOOGLE_MAILER_CLIENT_ID,
        clientSecret: GOOGLE_MAILER_CLIENT_SECRET,
        refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
        accessToken: myAccessToken,
      },
    });
    const mailOptions = {
      to: req.body.Email, // Gửi đến ai?
      subject: "OTP  FOR CHANGE PASSWORD", // Tiêu đề email
      html: `
        Confirm your OTP to change your password : 
      <h3>${otpcode}</h3>`, // Nội dung email
    };
    await transport.sendMail(mailOptions);

    let otpResponse = await otpData.save();
    responseType.statusText = "Success";
    responseType.status = 200;
    responseType.message = "Please check your Email!";
  } else {
    responseType.statusText = "Error";
    responseType.status = 304;
    responseType.message = "Email id not exist";
  }
  // return responseType to front-end check error
  res.json(responseType);
};

// Login for staff
export const LoginForStaff = async (req, res) => {
  const responseType = {};
  const user = await Staff.findOne({
    Email: req.body.Email,
  });

  if (!user) {
    responseType.status = 300;
    responseType.message = "Email is wrong!";
  }
  try {
    const match = await bcryptjs.compare(req.body.Password, user.Password);
    if (!match) {
      responseType.status = 301;
      responseType.message = "Password not match!";
    } else {
      responseType.status = 200;
      responseType.message = "Login Successfully";
      responseType.value = user;
    }
  } catch (error) {
    console.log(error);
  }

  res.json(responseType);
};

// change password for staff
export const ChangePasswordStaff = async (req, res) => {
  let data = await OTP.find({
    email: req.body.email,
    code: req.body.code,
  });
  const response = {};
  if (data) {
    let currentTime = new Date().getTime();
    let diff = data.expireIn - currentTime;
    if (diff < 0) {
      response.message = "Token Expire";
      response.statusText = "Error";
    } else {
      let user = await Staff.findOne({
        Email: req.body.Email,
      });
      user.Password = req.body.Password;
      user.save();
      response.message = "Password change successfully";
      response.statusText = "Success";
    }
  } else {
    response.statusText = "Error";
    response.message = "Wrong OTP";
  }
  res.status(200).json(response);
};

// Send email for customer
export const SendEmailStaff = async (req, res) => {
  let data = await Staff.findOne({
    Email: req.body.Email,
  });
  const responseType = {};
  if (data) {
    let otpcode = Math.floor(Math.random() * 100000 + 1);
    let otpData = new OTP({
      email: req.body.Email,
      code: otpcode,
      expireIn: new Date().getTime() + 300 * 1000,
    });
    const myAccessTokenObject = await myOAuth2Client.getAccessToken();
    const myAccessToken = myAccessTokenObject?.token;

    // Tạo một biến Transport từ Nodemailer với đầy đủ cấu hình, dùng để gọi hành động gửi mail
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: ADMIN_EMAIL_ADDRESS,
        clientId: GOOGLE_MAILER_CLIENT_ID,
        clientSecret: GOOGLE_MAILER_CLIENT_SECRET,
        refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
        accessToken: myAccessToken,
      },
    });
    const mailOptions = {
      to: req.body.Email, // Gửi đến ai?
      subject: "OTP  FOR CHANGE PASSWORD", // Tiêu đề email
      html: `
        Confirm your OTP to change your password : 
      <h3>${otpcode}</h3>`, // Nội dung email
    };
    await transport.sendMail(mailOptions);

    let otpResponse = await otpData.save();
    responseType.statusText = "Success";
    responseType.status = 200;
    responseType.message = "Please check your Email!";
  } else {
    responseType.statusText = "Error";
    responseType.status = 304;
    responseType.message = "Email id not exist";
  }
  // return responseType to front-end check error
  res.json(responseType);
};
