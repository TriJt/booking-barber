import { Contact } from "../models/Customer/Customer.model.js";
import nodemailer from "nodemailer";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";
// *Useful for getting environment vairables
dotenv.config();

export const SendEmailContact = async (req, res) => {
  const input = req.body;

  try {
    const contact = new Contact({
      Name: input.Name,
      Email: input.Email,
      Subject: input.Subject,
      Message: input.Message,
    });
    const save = await contact.save();

    // nodemailer
    // send mail to get otp

    const GOOGLE_MAILER_CLIENT_ID = process.env.CLIENT_ID_CONTACT;
    const GOOGLE_MAILER_CLIENT_SECRET = process.env.CLIENT_SECRET_CONTACT;
    const GOOGLE_MAILER_REFRESH_TOKEN = process.env.REFRESH_TOKEN_RESET;
    const ADMIN_EMAIL_ADDRESS = input.Email;

    const myOAuth2Client = new OAuth2Client(
      GOOGLE_MAILER_CLIENT_ID,
      GOOGLE_MAILER_CLIENT_SECRET
    );
    // Set Refresh Token vào OAuth2Client Credentials
    myOAuth2Client.setCredentials({
      refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
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
      to: process.env.EMAIL_ADMIN, // Gửi đến ai?
      subject: input.Subject, // Tiêu đề email
      html: input.Message, // Nội dung email
    };
    await transport.sendMail(mailOptions);
    res.status(200).json(save);
  } catch (err) {
    res.status(500).json(err);
  }
};

// get all contact
export const getAll = async (req, res) => {
  const responseType = {};

  try {
    const contact = await Contact.find();
    responseType.message = "Get contact successfully";
    responseType.value = contact;
  } catch (error) {
    responseType.message = "Can't get contact";
  }
  res.json(responseType);
};
