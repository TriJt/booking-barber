import React, { useState, useContext } from "react";
import "../../styles/components/topBar.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { AiOutlineArrowRight } from "react-icons/ai";

export default function TopBar() {
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(currentUser);
  const [isOpen, setIsOpen] = useState(false);
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 40) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener("scroll", changeBackground);

  return (
    <div className={navbar ? "topBar action" : "topBar"}>
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
          <h5 className="logo">BARBERJT</h5>
        </div>
        <div className={`navigation-menu ${isOpen && "open"}`}>
          <NavLink className="link" to="/">
            Home
          </NavLink>

          <NavLink className="link" to="/about">
            About
          </NavLink>

          <NavLink className="link" to="/services">
            Service
          </NavLink>

          <NavLink className="link" to="/gallery">
            Gallery
          </NavLink>

          <NavLink className="link" to="/blog">
            Blog
          </NavLink>

          <NavLink className="link" to="/contact">
            Contact
          </NavLink>

          {user ? (
            <NavLink to={`/profile/${user.Name_Customer}`} className="link">
              {user.Name_Customer}
              <AiOutlineArrowRight />
            </NavLink>
          ) : (
            <NavLink className="link" to="/login">
              Login
            </NavLink>
          )}
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
