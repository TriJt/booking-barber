import React from "react";
import "../../../styles/components/service.css";
import { Link } from "react-router-dom";

export default function Service({ title, p, image }) {
  return (
    <div className="Service ">
      <div className="image-service">
        <Link to={`/services/${title}`} className="link">
          <img src={image} alt="" className="img-service" />
        </Link>
      </div>
      <div className="text-service">
        <h3 className="title-service">{title}</h3>
        <p className="p-service">{p}</p>
      </div>
    </div>
  );
}
