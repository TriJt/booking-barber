import { useState, useContext, useRef } from "react";
import "../../styles/login.css";
import EmailIcon from "@mui/icons-material/Email";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

const SITE_KEY = "6Lc7fhAjAAAAAGx42AoXHeM-zx_wONWme7aRc0xn";

export default function Login() {
  const [inputField, setInputField] = useState({
    Email: "",
    Password: "",
  });

  const InputHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  //declaration field error of form
  const [errField, setErrField] = useState({
    EmailErr: "",
    PasswordErr: "",
  });

  const { isFetching, dispatch } = useContext(AuthContext);

  // re captcha
  const captchaRef = useRef();
  const [recaptchaValue, setRecaptchaValue] = useState("");

  const onChange = (value) => {
    setRecaptchaValue(value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({
      type: "LOGIN_START",
    });

    captchaRef.current.reset();

    const data = {
      Email: inputField.Email,
      Password: inputField.Password,
      token: recaptchaValue,
    };
    try {
      const response = await axios.post(
        "http://localhost:8800/api/auth/login_staff",
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
          toast.success(response.data.message);
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: response.data.value,
          });
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

  return (
    <div className="Login">
      <ToastContainer />
      <form>
        <div className="container-login">
          <h2 className="header-login"> Sign in to your account</h2>
          <div className="items">
            <div className="input-container">
              <span className="icon-input">
                <EmailIcon />
              </span>
              <input
                className="input-value"
                name="Email"
                autoComplete="off"
                onChange={InputHandler}
                required
                value={inputField.Email}
                type="email"
                placeholder={"Email"}
              />
            </div>
          </div>
          {errField.EmailErr.length > 0 && (
            <span className="error">{errField.EmailErr} </span>
          )}
          <div className="items">
            <div className="input-container">
              <span className="icon-input">
                <LockOpenIcon />
              </span>
              <input
                className="input-value"
                name="Password"
                required
                onChange={InputHandler}
                value={inputField.Password}
                type="password"
                placeholder="Password"
              />
            </div>
          </div>
          {errField.PasswordErr.length > 0 && (
            <span className="error">{errField.PasswordErr} </span>
          )}
          <div className="items">
            <Link to={`/forgot`} className="Link-login">
              <label className="span-login">Lost password ?</label>
            </Link>
          </div>
          <div className="items">
            <ReCAPTCHA
              sitekey={SITE_KEY}
              onChange={onChange}
              ref={captchaRef}
            />
          </div>

          <div className="items">
            <button
              className="button-login"
              type="submit"
              disabled={isFetching}
              onClick={handleClick}
            >
              Log In
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
