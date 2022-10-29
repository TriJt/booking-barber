import React, { useState, useRef } from "react";
import "../../styles/forget.css";
import { Link } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import KeyIcon from "@mui/icons-material/Key";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { useNavigate } from "react-router";

// send email to user and change page to resetPassword. OTP from mail will code to create new password to user forgot

export default function Forget() {
  const emailRef = useRef();
  const [otpForm, setOtpForm] = useState(true);

  const SendOTP = async (e) => {
    e.preventDefault();
    try {
      const data = { Email: emailRef.current.value };
      const response = await axios.post(
        "http://localhost:8800/api/auth/staff-send-email",
        data
      );
      const record = response.data;
      if (record.statusText === "Success") {
        toast.success("Record Successfully !");
        setOtpForm(false);
      } else {
        toast.error(record.message);
      }
    } catch (e) {
      toast.error("Somethings went wrong");
    }
  };

  // reset password
  const ResetPass = (props) => {
    const [pass, setPass] = useState(false);

    const toggleBtn = (e) => {
      e.preventDefault();
      setPass((prevState) => !prevState);
    };

    // confirm password
    const [Confirm, setConfirmPass] = useState(false);

    const toggleBtnConfirm = (e) => {
      e.preventDefault();
      setConfirmPass((prevState) => !prevState);
    };

    const [inputField, setInputField] = useState({
      otpCode: "",
      Password: "",
      Confirm: "",
    });

    const InputHandler = (e) => {
      setInputField({ ...inputField, [e.target.name]: e.target.value });
    };

    //declaration field error of form
    const [errField, setErrField] = useState({
      otpCodeErr: "",
      passwordErr: "",
      ConfirmErr: "",
    });
    const history = useNavigate();

    const validateForm = () => {
      let formValid = true;
      setInputField({
        otpCodeErr: "",
        passwordErr: "",
        repassErr: "",
      });

      if (
        inputField.repass !== "" &&
        inputField.repass !== inputField.password
      ) {
        formValid = false;
        setErrField((prevState) => ({
          ...prevState,
          repassErr: "Password was not match !!",
        }));
      }
      return formValid;
    };

    const submitButton = async (e) => {
      e.preventDefault();
      if (validateForm()) {
        Object.assign(inputField, props);
        let url = "http://localhost:8800/api/users/staff-change-password";
        let options = {
          method: "POST",
          url: url,
          headers: {},
          data: inputField,
        };

        let response = await axios(options);
        if (response.data.statusText === "Success") {
          toast.success(response.data.message);
          history.push("/login");
        } else {
          toast.error(response.data.message);
        }
      } else {
        toast.error("OTP is wrong!");
      }
    };

    return (
      <div className="container-login">
        <h2 className="header-login"> Create New Password</h2>
        <form>
          <div className="items">
            <div className="input-container">
              <span className="icon-input">
                <KeyIcon />
              </span>
              <input
                className="input-value"
                name="otpCode"
                autoComplete="off"
                type="text"
                placeholder={"OTP"}
                onChange={InputHandler}
                value={inputField.otpCode}
              />
            </div>
          </div>
          <div className="items">
            <div className="input-container">
              <span className="icon-input">
                <LockOpenIcon />
              </span>
              <input
                className="input-value"
                name="Password"
                required
                autoComplete="off"
                onChange={InputHandler}
                value={inputField.Password}
                type={pass ? "text" : "password"}
                placeholder={"Your Password"}
              />
              <button className="eye-button" onClick={toggleBtn}>
                {pass ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>
          </div>
          <div className="items">
            <div className="input-container">
              <span className="icon-input">
                <LockOpenIcon />
              </span>
              <input
                className="input-value"
                name="Confirm"
                required
                autoComplete="off"
                onChange={InputHandler}
                value={inputField.Confirm}
                type={Confirm ? "text" : "password"}
                placeholder={"Confirm"}
              />
              <button className="eye-button" onClick={toggleBtnConfirm}>
                {Confirm ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>
          </div>
          {errField.ConfirmErr.length > 0 && (
            <span className="error">{errField.ConfirmErr} </span>
          )}
          <div className="items">
            <button className="button-login" onClick={submitButton}>
              {" "}
              Change Password{" "}
            </button>
          </div>
          <div className="items">
            <Link to={`/login`} className="link-forgot">
              <ArrowBackIosIcon className="icon-forgot" />
              <label className="span-login">Cancel</label>
            </Link>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="Login">
      <ToastContainer />
      {otpForm ? (
        <div className="container-login">
          <h2 className="header-login"> Forgot your password?</h2>
          <form action="">
            <div className="items">
              <div className="input-container">
                <span className="icon-input">
                  <EmailIcon />
                </span>
                <input
                  className="input-value"
                  name="Email"
                  autoComplete="off"
                  type="email"
                  placeholder={"Email"}
                  ref={emailRef}
                />
              </div>
            </div>
            <div className="items">
              <button className="button-login" onClick={SendOTP}>
                Recover Password
              </button>
            </div>
            <div className="item-login">
              <Link to={`/login`} className="link-forgot">
                <ArrowBackIosIcon className="icon-forgot" />
                <label className="span-login">Back to Sign in</label>
              </Link>
            </div>
          </form>
        </div>
      ) : (
        <ResetPass email={emailRef.current.value} />
      )}
    </div>
  );
}
