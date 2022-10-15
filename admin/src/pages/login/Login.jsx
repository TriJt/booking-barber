import { useState, useContext } from "react";
import "./login.css";
import Items from "../../components/item/Items";
import EmailIcon from "@mui/icons-material/Email";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginCall } from "../../LoginCall.js";
import { AuthContext } from "../../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";

export default function Login() {
  //declaration fields in form
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

  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleClick = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await loginCall(
          {
            Email: inputField.Email,
            Password: inputField.Password,
          },
          dispatch
        );
      } catch (err) {
        console.log(err.response.data);
        const error = err.response.data;
        toast.error(error);
      }
    } else {
      toast.error("Form Invalid!");
    }
  };

  // validate form before handClick action
  const validateForm = () => {
    let formValid = true;
    setInputField({
      EmailErr: "",
      PasswordErr: "",
    });
    if (inputField.Email === "") {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        EmailErr: "Please Enter Your Email !!",
      }));
    }

    if (inputField.Password === "") {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        PasswordErr: "Please Enter Your Password !!",
      }));
    }
    return formValid;
  };

  return (
    <div className="Login">
      <ToastContainer />
      <form onSubmit={handleClick}>
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
