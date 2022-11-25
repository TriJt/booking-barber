import React from "react";
import "../../styles/singleService.css";
import TopBar from "../../components/Topbar/TopBar";
import { SliderSingleServices } from "../../components/Home/Slider/Slider";
import Footer from "../../components/Footer/Footer";
import Telephone from "../../components/Appointment/Telephone";
import { AiOutlineArrowDown } from "react-icons/ai";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Scroll from "../../components/ScrollToTop/Scroll";
import FindService from "../../components/Find/FindService";
import { Link } from "react-router-dom";

export default function SingleService() {
  const [data, setData] = useState("");
  const { Name_Service } = useParams();
  const [dataLimit, setDataLimit] = useState([]);

  // find service with name
  useEffect(() => {
    const fetchData = async () => {
      const data = {
        Name_Service: Name_Service,
      };
      const res = await axios.post(
        "http://localhost:8800/api/service/name",
        data
      );
      setData(res.data.value);
    };
    fetchData();

    const fetchLimit = async () => {
      const res = await axios.get(
        "http://localhost:8800/api/service/random",
        data
      );
      setDataLimit(res.data.value);
    };
    fetchLimit();
  }, []);

  return (
    <div className="container">
      <section className="section1">
        <div className="background-image">
          <div className="container-item">
            <TopBar />
            <SliderSingleServices title="Service" name={Name_Service} />
          </div>
        </div>
        <FindService />
      </section>
      <div className="single-container">
        <div className="single-left">
          <div className="item-image">
            <img src={data.Image} alt="" />
          </div>
          <div className="item-content">
            <div className="header-service">Services</div>
            <div className="item-name-single">{data.Name_Service}</div>
            <div className="item-price-single">{data.Price} $</div>
            <div className="item-desc-single">{data.Description}</div>
            <span>
              Scroll down below to book now with us <AiOutlineArrowDown />
            </span>
          </div>
        </div>
        <div className="single-right">
          <div className="header-limit">other service</div>
          {dataLimit.map((limit, i) => {
            return (
              <div className="item-limit-single" key={i}>
                <img src={limit.Image} alt="" className="image-limit" />
                <Link
                  to={`/services/${limit.Name_Service}`}
                  className="link-single"
                >
                  <div className="name-limit">{limit.Name_Service}</div>
                </Link>
              </div>
            );
          })}
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
