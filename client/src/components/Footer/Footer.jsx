import React from "react";
import "../../styles/components/footer.css";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FiChevronRight, FiSend } from "react-icons/fi";
import { Link } from "react-router-dom";
import { BsTelephoneForward } from "react-icons/bs";
import { MdPlace } from "react-icons/md";
import { AiFillHeart } from "react-icons/ai";
export default function Footer() {
  return (
    <div className="footer-container">
      <div className="Footer">
        <div className="div-footer">
          <h2 className="title"> barberjt</h2>
          <p>
            Far far away, behind the word <br /> mountains, far from the
            countries.
          </p>
          <div className="div-icon">
            <Link className="link-icon">
              <FaFacebookF />
            </Link>
            <Link className="link-icon">
              <FaInstagram />
            </Link>
          </div>
        </div>
        <div className="div-footer">
          <h2 className="title"> Explore</h2>
          <div className="link-footer">
            <Link to={`/about`}>
              <FiChevronRight /> About
            </Link>
          </div>
          <div className="link-footer">
            <Link to={`/service`}>
              <FiChevronRight /> Service
            </Link>
          </div>
          <div className="link-footer">
            <Link to={`/gallery`}>
              <FiChevronRight /> Gallery
            </Link>
          </div>
          <div className="link-footer">
            <Link to={`/blog`}>
              <FiChevronRight /> Blog
            </Link>
          </div>
        </div>
        <div className="div-footer">
          <h2 className="title"> Time service</h2>
          <div className="link-footer">
            <span> 8h00 - 21h00 </span>
          </div>
          <div className="link-footer">
            <button>
              <span>
                <BsTelephoneForward />
              </span>
              Hotline : 078.6963.378
            </button>
          </div>
        </div>
        <div className="div-footer">
          <h2 className="title"> have a question</h2>
          <div className="question">
            <span>
              <MdPlace />
            </span>
            <span className="text-span"> Anh Khanh, Ninh Kieu, Can Tho</span>
          </div>
          <div className="question">
            <span>
              <BsTelephoneForward />
            </span>
            <span className="text-span"> 0786963378</span>
          </div>

          <div className="question">
            <span>
              <FiSend />
            </span>
            <span className="text-span2"> bookingbarber.ad1@gmail.com </span>
          </div>
        </div>
      </div>
      <div className="last">
        <span>
          Copyright ©2022 All rights reserved | This template is made with{" "}
          <AiFillHeart /> by Thanh Tri
        </span>
      </div>
    </div>
  );
}
