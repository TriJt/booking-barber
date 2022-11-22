import React, { useState } from "react";
import "../../styles/components/telephone.css";

import axios from "axios";
import { useNavigate } from "react-router";

export default function Telephone() {
  const [inputField, setInputField] = useState({
    Telephone: "",
  });
  const InputHandler = (e) => {
    setInputField({
      ...inputField,
      [e.target.name]: e.target.value.slice(0, 11),
    });
  };
  const history = useNavigate();

  const [errField, setErrField] = useState({
    TelephoneErr: "",
  });
  const clear = () => {
    setInputField({
      Telephone: "",
    });
    setErrField({
      TelephoneErr: "",
    });
  };

  const submitHandle = async (e) => {
    e.preventDefault();

    const data = {
      Telephone: inputField.Telephone,
    };
    const res = await axios.post(
      "http://localhost:8800/api/customer/check",
      data
    );
    if (res.data.status === 400) {
      setErrField((prevState) => ({
        ...prevState,
        TelephoneErr: res.data.message,
      }));
      setTimeout(() => {
        clear();
      }, 3000);
    } else {
      history(`/appointment/${inputField.Telephone}`);
    }
  };

  return (
    <div className="Telephone">
      <div className="header-tel"> Make a appointment</div>
      <span className="content-tel">
        After cutting the payment, it's okay to cancel the schedule
      </span>
      <div className="item-tel">
        <input
          type="number"
          placeholder="Telephone"
          className="input-tel"
          name="Telephone"
          maxLength="11"
          required
          value={inputField.Telephone}
          onChange={InputHandler}
        />
        <button type="submit" onClick={submitHandle}>
          {" "}
          Make a appointment
        </button>
      </div>
      {errField.TelephoneErr.length > 0 && (
        <span className="error">{errField.TelephoneErr} </span>
      )}
    </div>
  );
}
