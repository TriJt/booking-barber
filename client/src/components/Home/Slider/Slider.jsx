import React from "react";
import "../../../styles/components/slider.css";
import { Link } from "react-router-dom";

export default function Slider() {
  return (
    <div className="slider-container">
      <span className="subheading"> WELCOME TO BARBERJT </span>
      <h1 className="slider-text">
        we will make <span> YOUR </span> <br /> <span> STYLE</span> of your
        dreams
      </h1>
      <div className="text-p">
        <p>
          A small river named Duden flows by their place and supplies it <br />{" "}
          with the necessary regelialia. It is a paradisematic country, <br />{" "}
          in which roasted parts of sentences fly into your mouth.
        </p>
        <button className="link-about">
          <Link to="/about" className="link">
            Learn more about us
          </Link>
        </button>
      </div>
    </div>
  );
}
