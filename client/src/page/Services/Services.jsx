import React from "react";
import "../../styles/services.css";
import TopBar from "../../components/Topbar/TopBar";
import { SliderServices } from "../../components/Home/Slider/Slider";
import Footer from "../../components/Footer/Footer";
import Telephone from "../../components/Appointment/Telephone";
import Category from "../../components/Category/Category";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Services() {
  const [hairCut, setHairCut] = useState([]);
  const [beard, setBeard] = useState([]);
  const [curling, setCurling] = useState([]);
  const [dye, setDye] = useState([]);
  const [takeEar, setTakeEar] = useState([]);
  const [shampoo, setShampoo] = useState([]);
  const [shave, setShave] = useState([]);
  const [hairCare, setHairCare] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        "http://localhost:8800/api/service/category?Category=Cut Hair"
      );
      setHairCut(res.data.value);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        "http://localhost:8800/api/service/category?Category=Beard Trim"
      );
      setBeard(res.data.value);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        "http://localhost:8800/api/service/category?Category=Curling hair"
      );
      setCurling(res.data.value);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        "http://localhost:8800/api/service/category?Category=Dye"
      );
      setDye(res.data.value);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        "http://localhost:8800/api/service/category?Category=Shave"
      );
      setShave(res.data.value);
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        "http://localhost:8800/api/service/category?Category=Shampoo"
      );
      setShampoo(res.data.value);
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        "http://localhost:8800/api/service/category?Category=Take Earwax"
      );
      setTakeEar(res.data.value);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        "http://localhost:8800/api/service/category?Category=Hair Care"
      );
      setHairCare(res.data.value);
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <section className="section1">
        <div className="background-image">
          <div className="container-item">
            <TopBar />
            <SliderServices />
          </div>
        </div>
      </section>
      <div className="services-container">
        <div className="category">
          <div className="title-category">
            <h3> Simple HairCut </h3>
          </div>
          <div className="div-service">
            {hairCut.map((value, index) => (
              <Category
                image={value.Image}
                name={value.Name_Service}
                description={value.Description}
                price={value.Price}
              />
            ))}
          </div>
        </div>
        <div className="category">
          <div className="title-category">
            <h3> Take Earwax </h3>
          </div>
          <div className="div-service">
            {beard.map((value, index) => (
              <Category
                image={value.Image}
                name={value.Name_Service}
                description={value.Description}
                price={value.Price}
              />
            ))}
          </div>
        </div>
        <div className="category">
          <div className="title-category">
            <h3> Curling hair</h3>
          </div>
          <div className="div-service">
            {curling.map((value, index) => (
              <Category
                image={value.Image}
                name={value.Name_Service}
                description={value.Description}
                price={value.Price}
              />
            ))}
          </div>
        </div>
        <div className="category">
          <div className="title-category">
            <h3> Dye </h3>
          </div>
          <div className="div-service">
            {dye.map((value, index) => (
              <Category
                image={value.Image}
                name={value.Name_Service}
                description={value.Description}
                price={value.Price}
              />
            ))}
          </div>
        </div>
        <div className="category">
          <div className="title-category">
            <h3> Shave </h3>
          </div>
          <div className="div-service">
            {shave.map((value, index) => (
              <Category
                image={value.Image}
                name={value.Name_Service}
                description={value.Description}
                price={value.Price}
              />
            ))}
          </div>
        </div>
        <div className="category">
          <div className="title-category">
            <h3> Shampoo </h3>
          </div>
          <div className="div-service">
            {shampoo.map((value, index) => (
              <Category
                image={value.Image}
                name={value.Name_Service}
                description={value.Description}
                price={value.Price}
              />
            ))}
          </div>
        </div>
        <div className="category">
          <div className="title-category">
            <h3> Take Earwax </h3>
          </div>
          <div className="div-service">
            {takeEar.map((value, index) => (
              <Category
                image={value.Image}
                name={value.Name_Service}
                description={value.Description}
                price={value.Price}
              />
            ))}
          </div>
        </div>
        <div className="category">
          <div className="title-category">
            <h3> Hair Care </h3>
          </div>
          <div className="div-service">
            {hairCare.map((value, index) => (
              <Category
                image={value.Image}
                name={value.Name_Service}
                description={value.Description}
                price={value.Price}
              />
            ))}
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
