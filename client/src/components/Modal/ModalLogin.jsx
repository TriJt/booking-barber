import React, { useEffect, useState, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AiOutlineArrowRight,
  AiFillEye,
  AiFillEyeInvisible,
} from "react-icons/ai";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import ReCAPTCHA from "react-google-recaptcha";

const SITE_KEY = "6Lc7fhAjAAAAAGx42AoXHeM-zx_wONWme7aRc0xn";

export default function ModalLogin({ open, onClose }) {
  const [pass, setPass] = useState(false);
  const toggleBtn = (e) => {
    e.preventDefault();
    setPass((prevState) => !prevState);
  };

  const captchaRef = useRef();
  const [recaptchaValue, setRecaptchaValue] = useState("");

  const onChange = (value) => {
    setRecaptchaValue(value);
  };

  // declare properties of client
  const [inputField, setInputField] = useState({
    Email: "",
    Password: "",
  });

  const InputHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  const [errField, setErrField] = useState({
    EmailErr: "",
    PasswordErr: "",
  });

  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({
      type: "LOGIN_START",
    });
    const data = {
      Email: inputField.Email,
      Password: inputField.Password,
      token: recaptchaValue,
    };
    try {
      const response = await axios.post(
        "http://localhost:8800/api/auth/login_customer",
        data
      );
      if (response.data.status === 300) {
        // check email
        setErrField((prevState) => ({
          ...prevState,
          EmailErr: response.data.message,
        }));
        setTimeout(() => {
          setErrField({
            EmailErr: "",
            PasswordErr: "",
          });
          setInputField({
            Email: "",
            Password: "",
          });
        }, 3000);
        toast.error(response.data.message);
      } else {
        if (response.data.status === 301) {
          // check password
          setErrField((prevState) => ({
            ...prevState,
            PasswordErr: response.data.message,
          }));
          setTimeout(() => {
            setErrField({
              EmailErr: "",
              PasswordErr: "",
            });
            setInputField({
              Email: "",
              Password: "",
            });
          }, 3000);
        } else {
          // login success
          onClose();
          toast.success(response.data.message);
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: response.data.value,
          });
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      }
    } catch (err) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: err,
      });
      throw err;
    }
  };
  if (!open) return null;

  return (
    <div className="overlay">
      <div className="modalContainer">
        <div className="modal-login">
          <div className="login-box background-modal">
            <h2>Sign in</h2>
            <form>
              <div className="user-box">
                <input
                  type="text"
                  name="Email"
                  required
                  value={inputField.Email}
                  onChange={InputHandler}
                  autoComplete="off"
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
                  onChange={InputHandler}
                  value={inputField.Password}
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
                <ReCAPTCHA
                  sitekey={SITE_KEY}
                  onChange={onChange}
                  ref={captchaRef}
                />
              </div>
              {/* link to forget page */}
              <div className="user-box">
                <Link to="/reset">
                  <span> Forgot your password ? </span>
                </Link>
              </div>

              <button
                className="button-submit"
                onClick={handleClick}
                disabled={isFetching}
                type="submit"
              >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Submit
              </button>
              <div className="user-box">
                <Link to="/register">
                  <span>
                    You don't have account ? Sign up <AiOutlineArrowRight />{" "}
                  </span>
                </Link>
              </div>
              <div className="user-box">
                <span className="exit-modal" onClick={onClose}>
                  Exit <AiOutlineArrowRight />
                </span>
              </div>
              {/* link to register page  */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
