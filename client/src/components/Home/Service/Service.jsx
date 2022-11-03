import React from "react";
import "../../../styles/components/service.css";

export default function Service({ title, p, image }) {
  return (
    <div className="Service ">
      <div className="image-service">
        <img src={image} alt="" className="img-service" />
      </div>
      <div className="text-service">
        <h3 className="title-service">{title}</h3>
        <p className="p-service">{p}</p>
      </div>
    </div>
  );
}
