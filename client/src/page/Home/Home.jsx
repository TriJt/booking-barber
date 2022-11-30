import React, { useState, useEffect } from "react";
import "../../styles/home.css";
import TopBar from "../../components/Topbar/TopBar";
import { SliderHome } from "../../components/Home/Slider/Slider";
import Service from "../../components/Home/Service/Service";
import Pricing from "../../components/Home/Pricing/Pricing";
import Footer from "../../components/Footer/Footer";
import Telephone from "../../components/Appointment/Telephone";
import ReactPlayer from "react-player";
import Scroll from "../../components/ScrollToTop/Scroll";
import axios from "axios";

export default function Home() {
  const [service, setService] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:8800/api/service/limit4");
      setService(res.data.value);
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <section className="section1">
        <div className="background-image">
          <div className="container-item">
            <TopBar />
            <div className="slider">
              <SliderHome />
            </div>
          </div>
        </div>
      </section>
      <section className="section-2">
        <div className="service-container ">
          {service.map((value, index) => (
            <>
              <Service
                title={value.Name_Service}
                p={value.Description}
                image={value.Image}
              />
            </>
          ))}
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
      <div className="video">
        <ReactPlayer
          url="https://youtu.be/r9lvNDkQhd4"
          playing={true}
          volume={1}
          width="100%"
          height="100%"
          onReady={() => console.log("ready now")}
        />
      </div>
      <div className="telephone">
        <Telephone />
      </div>
      <div className="pricing-container">
        <span className="subheading"> pricing</span>
        <h2 className="h2-about"> PRICE & PLANS</h2>
        <div className="pricing-item">
          <Pricing />
        </div>
      </div>
      <Scroll />
      <Footer />
    </div>
  );
}
