import React, { useState, useContext } from "react";
import "../../styles/components/topBar.css";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { MdOutlineAccountCircle } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { RiLockPasswordLine } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
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

  // document.querySelectorAll(".link").forEach((ele) =>
  //   ele.addEventListener("click", function (event) {
  //     event.preventDefault();
  //     document
  //       .querySelectorAll(".link")
  //       .forEach((ele) => ele.classList.remove("action"));
  //     this.classList.add("action");
  //   })
  // );

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

          <Link className="link" to="/about">
            About
          </Link>

          <Link className="link" to="/services">
            Service
          </Link>

          <Link className="link" to="/gallery">
            Gallery
          </Link>

          <Link className="link" to="/blog">
            Blog
          </Link>

          <Link className="link" to="/contact">
            Contact
          </Link>

          {user ? (
            <Link to={`/profile/${user.Name_Customer}`} className="link">
              {user.Name_Customer}
              <AiOutlineArrowRight />
            </Link>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
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
