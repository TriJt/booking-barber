import React from "react";
import "./login.css";
import Input from "../../components/Input/Input";
import EmailIcon from "@mui/icons-material/Email";
import Items from "../../components/item/Items";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="Login">
      <div className="container-login">
        <h2 className="header-login"> Sign in to your account</h2>
        <div className="item-login">
          <Items value={"Your Email"} />
          <Input
            type="email"
            placeholder={"example@gmail.com"}
            icon={<EmailIcon />}
          />
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
          <Link to={`/forgot`} className="Link-login">
            <label className="span-login">Lost password ?</label>
          </Link>
              
        </div>
        <div className="item-login">
          <button className="button-login"> Sign in </button>
        </div>
      </div>
    </div>
  );
}
