import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/components/salary.css";

export default function Salary() {
  const [inputField, setInputField] = useState({
    StaffId: "",
    Name: "",
    Telephone: "",
    Email: "",
    Gender: "",
    Image: "",
  });

  const InputHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  return (
    <div className="salary">
      <div className="header-salary">Add Salary</div>
      <form action="">
        <div className="form-salary">
          <input type="text" className="input-salary" />
        </div>
      </form>
    </div>
  );
}
