import React from "react";
import "./input.css";

export default function Input({ type, placeholder, icon, name, value }) {
  return (
    <>
      <div className="input-container">
        <span className="icon-input">{icon}</span>
        <input
          type={type}
          placeholder={placeholder}
          className="input-value"
          name={name}
          value={value}
        />
      </div>
    </>
  );
}
