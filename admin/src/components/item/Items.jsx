import React from "react";
import "./items.css";

export default function Items({ value }) {
  return (
    <div className="Items">
      <label>{value}</label>
    </div>
  );
}
