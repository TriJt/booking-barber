import React from "react";
import { Link } from "react-router-dom";
import "../../styles/components/category.css";
export default function Category({ image, name, description, price }) {
  return (
    <div className="category-items">
      <div className="items-service">
        <img src={image} alt="" />
        <div className="text-services">
          <div className="h3"> {name}</div>
          <p>{description}</p>
          <div className="price-link">
            <span className="price"> {price}$</span>
            <Link to={`/services/${name}`} className="link">
              <span>See Detail</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
