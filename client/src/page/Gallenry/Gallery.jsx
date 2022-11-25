import React from "react";
import TopBar from "../../components/Topbar/TopBar";
import { SliderServices } from "../../components/Home/Slider/Slider";
import Footer from "../../components/Footer/Footer";
import Telephone from "../../components/Appointment/Telephone";
import Galleries from "../../components/Gallery/Gallery";
import Scroll from "../../components/ScrollToTop/Scroll";

export default function Gallery() {
  return (
    <div className="container">
      <section className="section1">
        <div className="background-image">
          <div className="container-item">
            <TopBar />

            <SliderServices title="Gallery" />
          </div>
        </div>
      </section>
      <div className="pricing-container">
        <span className="subheading"> Gallery</span>
        <h2 className="h2-about"> PHOTOS OF OUR EVENTS</h2>

        <div className="pricing-item">
          <Galleries />
        </div>
      </div>
      <div className="telephone">
        <Telephone />
      </div>
      <Scroll />
      <Footer />
    </div>
  );
}
