import React, { useState } from "react";
import "../../styles/components/telephone.css";
import { Link } from "react-router-dom";

export default function Telephone() {
  const [inputField, setInputField] = useState({
    Telephone: "",
  });
  const InputHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  return (
    <div className="Telephone">
      <div className="header-tel"> Make a appointment</div>
      <span>After cutting the payment, it's okay to cancel the schedule</span>
      <div className="item-tel">
        <input
          type="text"
          placeholder="Telephone"
          className="input-tel"
          name="Telephone"
          value={inputField.Telephone}
          onChange={InputHandler}
        />
        <Link to={`/appointment/${inputField.Telephone}`}>
          <button> Make a appointment</button>
        </Link>
      </div>
    </div>
  );
}
