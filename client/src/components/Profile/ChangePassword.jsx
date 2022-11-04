import { useState, useContext } from "react";
import "../../styles/components/profile/changePassword.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { AuthContext } from "./../../context/AuthContext";

export default function ChangePassword() {
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(currentUser);
  const [pass, setPass] = useState(false);
  const [newPass, setNewPass] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const toggleBtn = (e) => {
    e.preventDefault();
    setPass((prevState) => !prevState);
  };

  const toggleNew = (e) => {
    e.preventDefault();
    setNewPass((prevState) => !prevState);
  };
  const toggleConfirm = (e) => {
    e.preventDefault();
    setConfirm((prevState) => !prevState);
  };

  const [inputField, setInputField] = useState({
    newPassword: "",
    oldPassword: "",
    confirm: "",
  });

  const InputHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  const [errField, setErrField] = useState({
    oldPasswordErr: "",
    ConfirmErr: "",
  });

  const validateForm = () => {
    let formValid = true;
    setInputField({
      ConfirmErr: "",
    });

    if (
      inputField.confirm !== "" &&
      inputField.confirm !== inputField.newPassword
    ) {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        ConfirmErr: "Your Confirm Password is not match!",
      }));
    }
    return formValid;
  };

  // handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const data = {
        Password: inputField.oldPassword,
        newPassword: inputField.newPassword,
      };
      try {
        const response = await axios.post(
          "http://localhost:8800/api/auth/resetPassword/" + user._id,
          data
        );
        if (response.data.status === 500) {
          setErrField((prevState) => ({
            ...prevState,
            oldPasswordErr: response.data.message,
          }));
          setTimeout(() => {
            setErrField({
              oldPasswordErr: "",
              ConfirmErr: "",
            });
            setInputField({
              newPassword: "",
              oldPassword: "",
              confirm: "",
            });
          }, 3000);
        } else {
          toast.success(response.data.message);
        }
      } catch (err) {
        toast.error("Update is failed");
      }
    }
  };

  return (
    <div className="ChangePassword">
      <ToastContainer />
      <div className="header-change">Change your password</div>
      <div className="items-change">
        <form action="">
          <div className="item-change">
            <span> Old password</span>
            <div className="item-box">
              <input
                type={pass ? "text" : "password"}
                name="oldPassword"
                value={inputField.oldPassword}
                onChange={InputHandler}
              />
              <button className="eye" onClick={toggleBtn}>
                {pass ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
          </div>
          {errField.oldPasswordErr.length > 0 && (
            <span className="error-change">{errField.oldPasswordErr} </span>
          )}
          <div className="item-change">
            <span> New password</span>
            <div className="item-box">
              <input
                type={newPass ? "text" : "password"}
                name="newPassword"
                value={inputField.newPassword}
                onChange={InputHandler}
              />
              <button className="eye" onClick={toggleNew}>
                {newPass ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
          </div>
          <div className="item-change">
            <span> Confirm password</span>
            <div className="item-box">
              <input
                type={confirm ? "text" : "password"}
                name="confirm"
                value={inputField.confirm}
                onChange={InputHandler}
              />
              <button className="eye" onClick={toggleConfirm}>
                {confirm ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
          </div>
          {errField.ConfirmErr.length > 0 && (
            <span className="error-change">{errField.ConfirmErr} </span>
          )}
          <div className="item-change">
            <button
              className="save-change"
              type="submit"
              onClick={handleSubmit}
            >
              Save
            </button>
            <Link to={`/reset`} className="link">
              Forget your password ?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
