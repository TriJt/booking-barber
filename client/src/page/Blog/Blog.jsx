import React from "react";
import TopBar from "../../components/Topbar/TopBar";
import { SliderServices } from "../../components/Home/Slider/Slider";
import Footer from "../../components/Footer/Footer";
import Telephone from "../../components/Appointment/Telephone";

export default function Blog() {
  return (
    <div className="container">
      <section className="section1">
        <div className="background-image">
          <div className="container-item">
            <TopBar />

            <SliderServices title="Blog" />
          </div>
        </div>
      </section>

      <div className="telephone">
        <Telephone />
      </div>
      <Footer />
    </div>
  );
}
