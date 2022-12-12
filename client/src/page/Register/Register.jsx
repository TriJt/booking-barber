import React, { useState, useRef } from "react";
import "../../styles/login.css";
import { HiOutlineMail } from "react-icons/hi";
import {
  AiOutlineArrowRight,
  AiFillEye,
  AiFillEyeInvisible,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReCAPTCHA from "react-google-recaptcha";

const SITE_KEY = "6Lc7fhAjAAAAAGx42AoXHeM-zx_wONWme7aRc0xn";

export default function Register() {
  // check show password text
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

  //declaration fields in form
  const [inputField, setInputField] = useState({
    Name_Customer: "",
    Telephone: "",
    Email: "",
    Password: "",
    Confirm: "",
  });
  const InputHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };
  const history = useNavigate();

  const resetForm = () => {
    setTimeout(() => {
      setErrField({
        EmailErr: "",
        ConfirmErr: "",
        PasswordErr: "",
        TelephoneErr: "",
        Name_CustomerErr: "",
      });
    }, 3000);
  };

  const [errField, setErrField] = useState({
    EmailErr: "",
    ConfirmErr: "",
    PasswordErr: "",
    TelephoneErr: "",
    Name_CustomerErr: "",
  });

  const captchaRef = useRef();
  const [recaptchaValue, setRecaptchaValue] = useState("");

  const onChange = (value) => {
    setRecaptchaValue(value);
  };

  // handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const customer = {
        Name_Customer: inputField.Name_Customer,
        Telephone: inputField.Telephone,
        Email: inputField.Email,
        Password: inputField.Password,
        token: recaptchaValue,
      };
      try {
        const response = await axios.post(
          "http://localhost:8800/api/auth/register",
          customer
        );

        if (response.data.status === 300) {
          toast.error(response.data.message);
        } else {
          toast.success(response.data.message);
          setTimeout(() => {
            history("/login");
          }, 3000);
        }
      } catch (err) {
        toast.error("Form Invalid!");
      }
    }
  };
  const validateForm = () => {
    let formValid = true;
    setInputField({
      Name_Customer: "",
      Telephone: "",
      Email: "",
      Password: "",
      Confirm: "",
    });

    if (inputField.Name_Customer === "") {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        Name_CustomerErr: "Please enter name",
      }));
    }

    const validPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const checkTelephone = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (inputField.Email === "") {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        EmailErr: "Please enter email",
      }));
    } else {
      if (!inputField.Email.match(validEmail)) {
        formValid = false;
        setErrField((prevState) => ({
          ...prevState,
          EmailErr: "You have entered an invalid email address! ",
        }));
      }
    }

    if (inputField.Telephone === "") {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        TelephoneErr: "Please enter telephone",
      }));
    } else {
      if (inputField.Telephone.match(checkTelephone)) {
        formValid = false;
        setErrField((prevState) => ({
          ...prevState,
          TelephoneErr: "You have entered an invalid telephone !",
        }));
      }
    }

    if (inputField.Password === "") {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        PasswordErr: "Please enter password",
      }));
    } else {
      if (!inputField.Password.match(validPass)) {
        formValid = false;
        setErrField((prevState) => ({
          ...prevState,
          PasswordErr: "You have entered an invalid password! ",
        }));
      }
    }

    if (
      inputField.Confirm !== "" &&
      inputField.Confirm !== inputField.Password
    ) {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        ConfirmErr: "Your Confirm Password is not match!",
      }));
    }
    resetForm();
    return formValid;
  };

  return (
    <div className="Register">
      <ToastContainer />
      <div className="login-box">
        <h2>Sign up</h2>
        <form>
          <div className="user-box">
            <input
              type="text"
              name="Name_Customer"
              required
              value={inputField.Name_Customer}
              onChange={InputHandler}
            />
            <label>Name</label>
          </div>
          {errField.Name_CustomerErr.length > 0 && (
            <span className="error">{errField.Name_CustomerErr} </span>
          )}
          <div className="user-box">
            <input
              type="text"
              name="Telephone"
              required
              maxLength={11}
              value={inputField.Telephone}
              onChange={InputHandler}
            />
            <label>Telephone</label>
          </div>
          {errField.TelephoneErr.length > 0 && (
            <span className="error">{errField.TelephoneErr} </span>
          )}
          <div className="user-box">
            <input
              type="text"
              name="Email"
              required
              value={inputField.Email}
              onChange={InputHandler}
            />
            <label>Email</label>
          </div>

          {errField.EmailErr.length > 0 && (
            <span className="error">{errField.EmailErr} </span>
          )}
          <div className="user-box">
            <input
              type={pass ? "text" : "password"}
              name="Password"
              required
              autoComplete="off"
              value={inputField.Password}
              onChange={InputHandler}
            />
            <label>Password</label>
            <button className="eye-button" onClick={toggleBtn}>
              {pass ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
          </div>
          {errField.PasswordErr.length > 0 && (
            <span className="error">{errField.PasswordErr} </span>
          )}
          <div className="user-box">
            <input
              type={Confirm ? "text" : "password"}
              name="Confirm"
              required
              autoComplete="off"
              value={inputField.Confirm}
              onChange={InputHandler}
            />
            <label> Confirm Password</label>
            <button className="eye-button" onClick={toggleBtnConfirm}>
              {Confirm ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
          </div>
          {errField.ConfirmErr.length > 0 && (
            <span className="error">{errField.ConfirmErr} </span>
          )}
          <div className="user-box">
            <ReCAPTCHA
              sitekey={SITE_KEY}
              onChange={onChange}
              ref={captchaRef}
            />
          </div>
          <button
            className="button-submit"
            type="submit"
            onClick={handleSubmit}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
          </button>
          {/* link to sign in page  */}
          <div className="user-box">
            <Link to="/login">
              <span>
                Sign in <AiOutlineArrowRight />{" "}
              </span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
