import React from "react";
import Items from "../../components/item/Items";
import KeyIcon from "@mui/icons-material/Key";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";

export default function ResetPassword() {
  return (
    <div className="Login">
      <div className="container-login">
        <h2 className="header-login"> Create New Password</h2>
        <div className="items">
          <Items value={"Your Email"} />
          <div className="input-container">
            <span className="icon-input">
              <KeyIcon />
            </span>
            <input
              className="input-value"
              name="OTP"
              autoComplete="off"
              type="text"
              placeholder={"OTP"}
            />
          </div>
        </div>
        <div className="items">
          <Items value={"Your Password"} />
          <div className="input-container">
            <span className="icon-input">
              <LockOpenIcon />
            </span>
            <input
              className="input-value"
              name="Password"
              autoComplete="off"
              type="password"
              placeholder={"Your Password"}
            />
          </div>
        </div>
        <div className="items">
          <Items value={"Your Confirm Password"} />
          <div className="input-container">
            <span className="icon-input">
              <LockOpenIcon />
            </span>
            <input
              className="input-value"
              name="Password"
              autoComplete="off"
              type="password"
              placeholder={"example@gmail.com"}
            />
          </div>
        </div>
        <div className="item-login">
          <button className="button-login"> Create Password </button>
        </div>
        <div className="item-login">
          <Link to={`/login`} className="link-forgot">
            <ArrowBackIosIcon className="icon-forgot" />
            <label className="span-login">Cancel</label>
          </Link>
        </div>
      </div>
    </div>
  );
}
