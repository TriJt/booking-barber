import React from "react";
import "../../styles/components/telephone.css";

export default function Telephone({ telephone }) {
  return (
    <div className="Telephone">
      <div className="header-tel"> Make a appointment</div>
      <span>After cutting the payment, it's okay to cancel the schedule</span>
      <div className="item-tel">
        <input type="text" placeholder="Telephone" className="input-tel" />
        <button> Make a appointment</button>
      </div>
    </div>
  );
}
