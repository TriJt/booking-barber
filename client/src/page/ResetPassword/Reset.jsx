import React, { useState, useRef } from "react";
import "../../styles/login.css";
import { AiOutlineArrowRight } from "react-icons/ai";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import ResetPassword from "../ResetPassword/Reset";

export default function Reset() {
  const emailRef = useRef();
  const [otpForm, setOtpForm] = useState(true);

  const SendOTP = async (e) => {
    e.preventDefault();
    try {
      const data = { Email: emailRef.current.value };
      const response = await axios.post(
        "http://localhost:8800/api/auth/send-email",
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

  // reset form for change password
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
        let url = "http://localhost:8800/api/users/change-password";
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
      <div className="login-box">
        <form id="otpForm">
          <div className="user-box">
            <input
              type="text"
              name="otpCode"
              onChange={InputHandler}
              value={inputField.otpCode}
              required
              autoComplete="off"
            />
            <label> OTP</label>
          </div>
          <div className="user-box">
            <input
              type={pass ? "text" : "password"}
              name="Password"
              onChange={InputHandler}
              value={inputField.Password}
              required
              autoComplete="off"
            />
            <label>Password</label>
            <button className="eye-button" onClick={toggleBtn}>
              {pass ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
          </div>

          <div className="user-box">
            <input
              type={Confirm ? "text" : "password"}
              required
              autoComplete="off"
              name="Confirm"
              onChange={InputHandler}
              value={inputField.Confirm}
            />
            <label>Confirm Password</label>
            <button className="eye-button" onClick={toggleBtnConfirm}>
              {Confirm ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
          </div>
          {errField.ConfirmErr.length > 0 && (
            <span className="error">{errField.ConfirmErr} </span>
          )}

          <button
            className="button-submit"
            type="submit"
            onClick={submitButton}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Change Password
          </button>
          <div className="user-box">
            <Link to="/login">
              <span>
                Sign In <AiOutlineArrowRight />
              </span>
            </Link>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="Reset">
      <ToastContainer />
      {otpForm ? (
        <div className="login-box">
          <h2>Reset password</h2>
          <form id="otpForm">
            <div className="user-box">
              <input
                type="email"
                name="Email"
                ref={emailRef}
                required
                autoComplete="off"
              />
              <label>Email</label>
            </div>

            <button className="button-submit" type="submit" onClick={SendOTP}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Get OTP
            </button>
            <div className="user-box">
              <Link to="/login">
                <span>
                  Sign In <AiOutlineArrowRight />
                </span>
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
