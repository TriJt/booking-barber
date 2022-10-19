import React from "react";
import "../../styles/home.css";
import TopBar from "../../components/Topbar/TopBar";
import Slider from "../../components/Home/Slider/Slider";
import Service from "../../components/Home/Service/Service";
import Pricing from "../../components/Home/Pricing/Pricing";
import Footer from "../../components/Footer/Footer";

export default function Home() {
  return (
    <div className="container">
      <section className="section1">
        <div className="background-image">
          <div className="container-item">
            <TopBar />
            <div className="slider">
              <Slider />
            </div>
          </div>
        </div>
      </section>
      <section className="section-2">
        <div className="service-container">
          <Service
            title={"hair style"}
            p={
              "A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts"
            }
            image={
              "https://i.pinimg.com/564x/d1/44/c3/d144c3c6a69690892d878f46bc6e565a.jpg"
            }
          />
          <Service
            title={"beard trim"}
            p={
              "A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts"
            }
            image={
              "https://i.pinimg.com/564x/97/e2/49/97e249362d4e10ae57bfdd41af663d18.jpg"
            }
          />
          <Service
            title={"HOT SHAVE"}
            p={
              "A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts"
            }
            image={
              "https://i.pinimg.com/474x/cf/e5/e1/cfe5e15532f7dd2f1932bb7561d3ba0e.jpg"
            }
          />
          <Service
            title={"HAIR SHAMPOO"}
            p={
              "A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts"
            }
            image={
              "https://i.pinimg.com/564x/8e/96/87/8e9687907d7c48ef29338fa1d211fbc0.jpg"
            }
          />
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
        <span className="subheading"> pricing</span>
        <h2 className="h2-about"> PRICE & PLANS</h2>
        <div className="pricing-item">
          <Pricing />
        </div>
      </div>
      <Footer />
    </div>
  );
}
