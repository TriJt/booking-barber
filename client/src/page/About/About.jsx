import React from "react";
import "../../styles/home.css";
import TopBar from "../../components/Topbar/TopBar";
import { SliderAbout } from "../../components/Home/Slider/Slider";
import Footer from "../../components/Footer/Footer";
import Evaluate from "../../components/Evaluate/Evaluate";
import Telephone from "../../components/Appointment/Telephone";
export default function About() {
  return (
    <div className="container">
      <section className="section1">
        <div className="background-image">
          <div className="container-item">
            <TopBar />

            <SliderAbout />
          </div>
        </div>
      </section>
      <div className="about-container">
        <div className="div-image">
          <img
            src="https://i.pinimg.com/474x/fa/ba/7a/faba7adb260e42bd636b45af39c92edd.jpg"
            alt=""
            className="image-about"
          />
        </div>
        <div className="text-about">
          <div className="text-about-mb">
            <span className="subheading"> About barber</span>
            <h2 className="h2-about">
              A SMOOTH BARBER EXPERIENCE IN YOUR TOWN
            </h2>
            <p>
              Far far away, behind the word mountains, far from the countries
              Vokalia and Consonantia, there live the blind texts. Separated
              they live in Bookmarksgrove right at the coast of the Semantics, a
              large language ocean. A small river named Duden flows by their
              place and supplies it with the necessary regelialia.
            </p>
          </div>
        </div>
      </div>
      <div className="pricing-container">
        <span className="subheading"> TESTIMONIAL</span>
        <h2 className="h2-about">PEOPLE SAY ABOUT US </h2>
        <div className="pricing-item">
          <Evaluate />
        </div>
      </div>
      <div className="telephone">
        <Telephone />
      </div>
      <Footer />
    </div>
  );
}
