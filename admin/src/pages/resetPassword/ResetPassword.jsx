import React from "react";
import Input from "../../components/Input/Input";
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
        <div className="item-login">
          <Items value={"Your OTP"} />
          <Input type="text" placeholder={"OTP "} icon={<KeyIcon />} />
        </div>
        <div className="item-login">
          <Items value={"Your Password"} />
          <Input
            type="password"
            placeholder={"Password"}
            icon={<LockOpenIcon />}
          />
        </div>
        <div className="item-login">
          <Items value={"Your Confirm Password"} />
          <Input
            type="password"
            placeholder={"Confirm Password"}
            icon={<LockOpenIcon />}
          />
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
