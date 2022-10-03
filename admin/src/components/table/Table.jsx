import React from "react";
import "./table.css";
export default function Table() {
  const data = [
    { name: "Anom", age: 19, gender: "Male" },
    { name: "Megha", age: 19, gender: "Female" },
    { name: "Subham", age: 25, gender: "Male" },
  ];
  return (
    <div className="table">
      <div className="top-table">
        <span className="label-table"> Customer </span>
        <button className="button-table">See all</button>
      </div>
      <div className="bottom-table">
        <div className="table-of-contents">
          <div className="div-table-header">
            <div className="name-table">Name</div>
            <div className="other">Age</div>
            <div className="other">Gender</div>
          </div>
          {data.map((val, key) => {
            return (
              <div className="div-table" key={key}>
                <div className="name-table">{val.name}</div>
                <div className="other">{val.age}</div>
                <div className="other">{val.gender}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
