import React from "react";
import TopBar from "../../components/Topbar/TopBar";
import { SliderServices } from "../../components/Home/Slider/Slider";
import Footer from "../../components/Footer/Footer";
import Telephone from "../../components/Appointment/Telephone";
import "../../styles/contact.css";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { GiEarthAmerica } from "react-icons/gi";

export default function Contact() {
  return (
    <div className="container">
      <section className="section1">
        <div className="background-image">
          <div className="container-item">
            <TopBar />

            <SliderServices title="Contact" />
          </div>
        </div>
      </section>
      <div className="contact">
        <div className="contact-container">
          <div className="contact-left">
            <div className="contact-items">
              <h3 className="contact-header"> Contact us </h3>
              <div className="contact-item">
                <div className="contact-icon">
                  <span>
                    <FaMapMarkerAlt />
                  </span>
                </div>
                <div className="contact-text">
                  <p>
                    <b>Address: </b>
                    Anh Khanh, Ninh Kieu, Can Tho
                  </p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <span>
                    <FaPhoneAlt />
                  </span>
                </div>
                <div className="contact-text">
                  <p>
                    <b>Phone: </b>
                    0786963378
                  </p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <span>
                    <FiSend />
                  </span>
                </div>
                <div className="contact-text">
                  <p>
                    <b>Email: </b>
                    bookingbarber.ad1@gmail.com
                  </p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <span>
                    <GiEarthAmerica />
                  </span>
                </div>
                <div className="contact-text">
                  <p>
                    <b>Website:</b>
                    https://www.linkedin.com/in/le-thanh-tri-20ab94237
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="contact-right">
            <div className="contact-items">
              <h3 className="contact-header-black"> GET IN TOUCH</h3>
              <form action="">
                <div className="contact-form">
                  <input type="text" id="name" placeholder="Name" />
                  <input type="email" id="email" placeholder="Email" />
                </div>
                <div className="contact-form">
                  <input type="text" id="subject" placeholder="Subject" />
                </div>
                <div className="contact-form">
                  <textarea
                    name="message"
                    id="textarea"
                    cols="30"
                    rows="10"
                    placeholder="Message"
                  ></textarea>
                </div>
                <div className="contact-form">
                  <button> Send message </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="telephone">
        <Telephone />
      </div>
      <Footer />
    </div>
  );
}
