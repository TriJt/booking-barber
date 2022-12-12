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
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const SITE_KEY = "6Lc7fhAjAAAAAGx42AoXHeM-zx_wONWme7aRc0xn";

export default function Login() {
  const [inputField, setInputField] = useState({
    Email: "",
    Password: "",
  });

  const InputHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  // show pass
  const [pass, setPass] = useState(false);

  const toggleBtn = (e) => {
    e.preventDefault();
    setPass((prevState) => !prevState);
  };

  //declaration field error of form
  const [errField, setErrField] = useState({
    EmailErr: "",
    PasswordErr: "",
    CaptchaErr: "",
  });

  const { isFetching, dispatch } = useContext(AuthContext);

  // re captcha
  const captchaRef = useRef();
  const [recaptchaValue, setRecaptchaValue] = useState("");

  // change captcha
  const onChange = (value) => {
    setRecaptchaValue(value);
  };

  const clearInput = () => {
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
  };

  const validateForm = () => {
    let formValid = true;
    setInputField({
      Email: "",
      Password: "",
    });

    const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

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
    if (inputField.Password === "") {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        PasswordErr: "Please enter password",
      }));
    }
    clearInput();
    return formValid;
  };

  // handle login
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({
      type: "LOGIN_START",
    });
    captchaRef.current.reset();

    if (validateForm()) {
      const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      if (inputField.Email.match(validEmail)) {
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
            clearInput();
          } else {
            if (response.data.status === 301) {
              // check password
              setErrField((prevState) => ({
                ...prevState,
                PasswordErr: response.data.message,
              }));
              clearInput();
            } else {
              if (response.data.status === 400) {
                toast.error(response.data.message);
                clearInput();
              } else {
                if (response.data.status === 200) {
                  toast.success(response.data.message);
                  dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: response.data.value,
                  });
                }
              }
            }
          }
        } catch (err) {
          dispatch({
            type: "LOGIN_FAILURE",
            payload: err,
          });
          throw err;
        }
      } else {
        setErrField((prevState) => ({
          ...prevState,
          EmailErr: "You have entered an invalid email address!",
        }));
        clearInput();
      }
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
                onChange={InputHandler}
                value={inputField.Password}
                type={pass ? "text" : "password"}
                placeholder="Password"
              />
              <button className="eye-button" onClick={toggleBtn}>
                {pass ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
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
