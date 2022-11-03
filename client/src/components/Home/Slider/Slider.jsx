import React from "react";
import "../../../styles/components/slider.css";
import { Link } from "react-router-dom";
import { FiChevronRight, FiChevronsRight } from "react-icons/fi";

export function SliderHome() {
  return (
    <div className="slider-container fadeInUp animation">
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

export function SliderAbout() {
  return (
    <div className="slider-container fadeInUp animation">
      <div className="about-slider">
        <div className="title-about">
          <Link to="/home" className="link">
            <h5>Home</h5>
          </Link>
          <FiChevronsRight className="icon-link" />
          <h5>About</h5>
          <FiChevronsRight className="icon-link" />
        </div>
        <h1 className="slider-text"> About US</h1>
      </div>
    </div>
  );
}

export function SliderServices() {
  return (
    <div className="slider-container fadeInUp animation">
      <div className="about-slider">
        <div className="title-about">
          <Link to="/home" className="link">
            <h5>Home</h5>
          </Link>
          <FiChevronsRight className="icon-link" />
          <h5>Service</h5>
          <FiChevronsRight className="icon-link" />
        </div>
        <h1 className="slider-text"> Services</h1>
      </div>
    </div>
  );
}
