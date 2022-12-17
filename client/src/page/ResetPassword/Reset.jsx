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
  const [email, setEmail] = useState("");
  const [otpForm, setOtpForm] = useState(true);

  const [errField, setErrField] = useState({
    EmailErr: "",
  });
  const resetForm = () => {
    setTimeout(() => {
      setErrField({
        EmailErr: "",
      });
    }, 3000);
  };

  const validateForm = () => {
    let formValid = true;

    const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email === "") {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        EmailErr: "Please enter email",
      }));
    } else {
      if (!email.match(validEmail)) {
        formValid = false;
        setErrField((prevState) => ({
          ...prevState,
          EmailErr: "You have entered an invalid email address! ",
        }));
      }
    }

    resetForm();
    return formValid;
  };

  const SendOTP = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const data = { Email: email };
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
    }
  };

  // reset form for change password
  const ResetPass = (props) => {
    const [pass, setPass] = useState(false);

    const toggleBtn = (e) => {
      e.preventDefault();
      setPass((prevState) => !prevState);
    };

    console.log(email);
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

    const resetForm = () => {
      setInputField({
        otpCode: "",
        Password: "",
        Confirm: "",
      });
      setTimeout(() => {
        setErrField({
          otpCodeErr: "",
          passwordErr: "",
          ConfirmErr: "",
        });
      }, 3000);
    };
    const history = useNavigate();

    const validateForm = () => {
      let formValid = true;
      setInputField({
        otpCodeErr: "",
        passwordErr: "",
        repassErr: "",
      });

      if (inputField.otpCode === "") {
        formValid = false;
        setErrField((prevState) => ({
          ...prevState,
          otpCodeErr: "Please enter OTP",
        }));
      }

      if (inputField.Password === "") {
        formValid = false;
        setErrField((prevState) => ({
          ...prevState,
          passwordErr: "Please enter Password",
        }));
      }

      if (
        inputField.Confirm !== "" &&
        inputField.Confirm !== inputField.Password
      ) {
        formValid = false;
        setErrField((prevState) => ({
          ...prevState,
          repassErr: "Password was not match !!",
        }));
      }
      resetForm();
      return formValid;
    };

    const submitButton = async (e) => {
      e.preventDefault();
      if (validateForm()) {
        const data = {
          Email: email,
          code: inputField.otpCode,
          Password: inputField.Password,
        };

        let response = await axios.post(
          "http://localhost:8800/api/auth/change-password",
          data
        );
        if (response.data.statusText === "Success") {
          toast.success(response.data.message);
          setTimeout(() => {
            history("/login");
            window.reload();
          }, 2000);
        } else {
          toast.error(response.data.message);
        }
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
          {errField.otpCodeErr.length > 0 && (
            <span className="error">{errField.otpCodeErr} </span>
          )}
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
          {errField.passwordErr.length > 0 && (
            <span className="error">{errField.passwordErr} </span>
          )}

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
              />
              <label>Email</label>
            </div>
            <div>
              {errField.EmailErr.length > 0 && (
                <span className="error">{errField.EmailErr} </span>
              )}
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
        <ResetPass email={email} />
      )}
    </div>
  );
}
