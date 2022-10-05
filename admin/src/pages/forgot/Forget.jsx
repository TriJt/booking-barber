import React from "react";
import "./forget.css";
import { Link } from "react-router-dom";
import Input from "../../components/Input/Input";
import Items from "../../components/item/Items";
import EmailIcon from "@mui/icons-material/Email";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

// send email to user and change page to resetPassword. OTP from mail will code to create new password to user forgot

export default function Forget() {
  return (
    <div className="Login">
      <div className="container-login">
        <h2 className="header-login"> Forgot your password?</h2>
        <span className="span-forgot">
          Don't fret! Just type in your email and we will send you a code to
          reset your password!
        </span>
        <div className="item-login">
          <Items value={"Your Email"} />
          <Input
            type="email"
            placeholder={"example@gmail.com"}
            icon={<EmailIcon />}
          />
        </div>
        <div className="item-login">
          <button className="button-login"> Recover Password</button>
        </div>
        <div className="item-login">
          <Link to={`/login`} className="link-forgot">
            <ArrowBackIosIcon className="icon-forgot" />
            <label className="span-login">Back to Sign in</label>
          </Link>
        </div>
      </div>
    </div>
  );
}