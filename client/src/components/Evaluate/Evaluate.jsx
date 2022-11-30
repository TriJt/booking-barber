import React from "react";
import "../../styles/components/evaluate.css";
import Rating from "react-rating";
import {
  AiOutlineCloseCircle,
  AiOutlineStar,
  AiFillStar,
} from "react-icons/ai";

export default function Evaluate({ star, service, text, staff }) {
  return (
    <div className="container-eval">
      <div className="evaluate">
        <div className="text-eval">
          <p>{text}</p>
        </div>
        <Rating
          emptySymbol={<AiOutlineStar className="icon-star" />}
          fullSymbol={<AiFillStar className="icon-star" />}
          initialRating={star}
          placeholderRating={star}
          readonly
        />
        <div className="image-eval">
          <div className="name-eval">
            <span> {staff}</span>
            <h5> {service}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
