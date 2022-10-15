import React, { useState, useEffect } from "react";
import "./StaffNew.css";
import Items from "../../components/item/Items";
import BadgeIcon from "@mui/icons-material/Badge";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import ManIcon from "@mui/icons-material/Man";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function StaffNew({ setDataStaff }) {
  const [inputField, setInputField] = useState({
    Name: "",
    Telephone: "",
    Email: "",
    Gender: "",
  });

  const [errField, setErrField] = useState({
    EmailErr: "",
    NameErr: "",
  });

  const InputHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/staff/all");
        setDataStaff(res.data.value);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStaff();
  }, []);

  // update information
  const submitHandler = async (e) => {
    e.preventDefault();
    const staff = {
      Name: inputField.Name,
      Telephone: inputField.Telephone,
      Email: inputField.Email,
      Gender: inputField.Gender,
    };
    try {
      const response = await axios.post(
        "http://localhost:8800/api/staff/create",
        staff
      );
      const record = response.data;
      if (record.statusText === "Success") {
        toast.success(record.message);
      } else {
        toast.error(record.message);
      }
    } catch (err) {
      toast.error("Somethings went wrong");
    }
  };

  return (
    <div className="new-staff">
      <div className="left-staff"></div>
      <div className="right-staff">
        <h3 className="create-staff"> Create New Staff</h3>
        <form action="submit">
          <div className="items-profile">
            <div className="input-container-address">
              <span className="icon-input">
                <BadgeIcon />
              </span>
              <input
                className="input-address"
                name="Name"
                autoComplete="off"
                onChange={InputHandler}
                required
                value={inputField.Name}
                type="text"
                placeholder="Name"
              />
            </div>
          </div>
          <div className="items-profile">
            <div className="input-container-address">
              <span className="icon-input">
                <CallIcon />
              </span>
              <input
                className="input-address"
                name="Telephone"
                autoComplete="off"
                onChange={InputHandler}
                required
                value={inputField.Telephone}
                type="text"
                placeholder="Telephone"
              />
            </div>
          </div>
          <div className="items-profile">
            <div className="input-container-address">
              <span className="icon-input">
                <EmailIcon />
              </span>
              <input
                className="input-address"
                name="Email"
                autoComplete="off"
                onChange={InputHandler}
                required
                value={inputField.Email}
                type="email"
                placeholder="Email"
              />
            </div>
          </div>
          <div className="items-profile">
            <div className="input-container-address">
              <span className="icon-input">
                <ManIcon />
              </span>
              <select
                name="Gender"
                id="select-new"
                className="input-address"
                onChange={InputHandler}
                value={inputField.Gender}
                placeholder="Gender"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other genders">Other genders</option>
              </select>
            </div>
          </div>

          <div className="action-profile">
            <button className="save" onClick={submitHandler}>
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
