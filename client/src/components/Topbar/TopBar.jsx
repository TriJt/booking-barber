import React, { useState } from "react";
import "../../styles/components/topBar.css";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import { Link } from "react-router-dom";
import SegmentIcon from "@mui/icons-material/Segment";

export default function TopBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 200) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener("scroll", changeBackground);
  return (
    <div className={navbar ? "topBar active" : "topBar"}>
      <div className="top-topBar">
        <div className="left-topBar">
          <div className="mail">
            <span className="mailus">Phone:</span>
            <label className="label-topBar"> 0786963376</label>
            <span className="mailus"> or email us: </span>
            <label className="label-topBar"> bookingbarber.ad@gmail.com</label>
          </div>
        </div>
        <div className="right-topBar"></div>
      </div>
      <div className="bottom-topBar">
        <div className="logo">
          <Link className="link" to="/">
            <h5 className="logo">BARBERJT</h5>
          </Link>
        </div>
        <div className={`navigation-menu ${isOpen && "open"}`}>
          <Link className="link" to="/">
            Home
          </Link>

          <Link className="link" to="/">
            About
          </Link>

          <Link className="link" to="/">
            Service
          </Link>

          <Link className="link" to="/">
            Gallery
          </Link>

          <Link className="link" to="/">
            Blog
          </Link>

          <Link className="link" to="/">
            Contact
          </Link>
          <Link className="link" to="/">
            Login
          </Link>
        </div>
        <div
          className={`burger ${isOpen && "open"}`}
          id="burger"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="bar"></div>
        </div>
      </div>
    </div>
  );
}
