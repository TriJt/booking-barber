import React, { useState, useEffect } from "react";
import "../../styles/home.css";
import TopBar from "../../components/Topbar/TopBar";
import { SliderServices } from "../../components/Home/Slider/Slider";
import Footer from "../../components/Footer/Footer";
import Evaluate from "../../components/Evaluate/Evaluate";
import Telephone from "../../components/Appointment/Telephone";
import Scroll from "../../components/ScrollToTop/Scroll";
import axios from "axios";

export default function About() {
  const [store, setStore] = useState("");
  const [review, setReview] = useState([]);
  const [customer, setCustomer] = useState([]);

  useEffect(() => {
    const fetchStore = async () => {
      const res = await axios.get("http://localhost:8800/api/store/getById");
      setStore(res.data.value);
    };
    fetchStore();

    const fetchReview = async () => {
      const res = await axios.get("http://localhost:8800/api/evaluate/limit");
      setReview(res.data.value);
    };
    fetchReview();
  }, []);

  return (
    <div className="container">
      <section className="section1">
        <div className="background-image">
          <div className="container-item">
            <TopBar />

            <SliderServices title="About" />
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
            <span className="subheading"> About {store.Name_Store}</span>
            <h2 className="h2-about">
              A SMOOTH BARBER EXPERIENCE IN YOUR TOWN
            </h2>
            <p>{store.Description}</p>
          </div>
        </div>
      </div>
      <div className="pricing-container">
        <span className="subheading"> TESTIMONIAL</span>
        <h2 className="h2-about">PEOPLE SAY ABOUT US </h2>
        <div className="pricing-item">
          {review.map((value, index) => (
            <Evaluate
              star={value.Star}
              service={value.Service}
              text={value.Review}
              staff={value.Staff}
            />
          ))}
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
