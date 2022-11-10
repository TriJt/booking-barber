import React, { useEffect, useState } from "react";
import TopBar from "../../components/Topbar/TopBar";
import { SliderServices } from "../../components/Home/Slider/Slider";
import Footer from "../../components/Footer/Footer";
import Telephone from "../../components/Appointment/Telephone";
import "../../styles/blog.css";
import axios from "axios";
import { BiSearchAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import Scroll from "../../components/ScrollToTop/Scroll";

export default function Blog() {
  const [data, setData] = useState([]);
  const [services, setServices] = useState([]);
  const [limit, setLimit] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:8800/api/post/all");
      setData(res.data.value);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchService = async () => {
      const res = await axios.get("http://localhost:8800/api/service/all");
      setServices(res.data.value);
    };
    fetchService();
  }, []);

  useEffect(() => {
    const fetchLimit = async () => {
      const res = await axios.get("http://localhost:8800/api/post/limit");
      setLimit(res.data.value);
    };
    fetchLimit();
  }, []);

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
      <div className="blog">
        <div className="left-blog">
          {/* <ItemBlog id={data._id} /> */}
          {data.map((value) => (
            <div className="item-blog fadeInUp animation">
              <div className="image-blog">
                <Link
                  to={{
                    pathname: `/blog/${value._id}`,
                  }}
                >
                  <img src={value.Image} alt="" className="image-item-blog " />
                </Link>
              </div>
              <div className="content-blog">
                <h3 className="title-blog">{value.Title}</h3>
                <p> {value.Note}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="right-blog">
          <div className="search-blog">
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
            />
            <span>
              <BiSearchAlt />
            </span>
          </div>
          {/* list service */}
          <div className="list-service-blog">
            <h3 className="title-blog"> Services</h3>
            {services.map((value) => (
              <div className="service-blog">
                <span>{value.Name_Service}</span>
              </div>
            ))}
          </div>
          {/*  recent blog limit 3 */}
          <div className="list-service-blog">
            <h3 className="title-blog"> RECENT BLOG</h3>
            {limit.map((value) => (
              <div className="recent-blog-item">
                <Link
                  to={{
                    pathname: `/blog/${value._id}`,
                  }}
                  className="link-limit"
                >
                  <img src={value.Image} alt="" className="image-recent" />
                  <div className="title-recent-blog"> {value.Title} </div>
                </Link>
              </div>
            ))}
          </div>
          {/* PARAGRAPH */}
          <div className="list-service-blog">
            <h3 className="title-blog"> Paragraph</h3>
            <p className="p-blog">
              Bringing modernity and convenience to customers. Attentive and
              professional service for the best experience.
            </p>
          </div>
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
