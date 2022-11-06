import React, { useEffect, useState } from "react";
import TopBar from "../../components/Topbar/TopBar";
import { SliderServices } from "../../components/Home/Slider/Slider";
import Footer from "../../components/Footer/Footer";
import Telephone from "../../components/Appointment/Telephone";
import "../../styles/components/singleBlog.css";
import axios from "axios";
import { BiSearchAlt } from "react-icons/bi";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";

export default function SingleBlog() {
  const [data, setData] = useState([]);
  const [services, setServices] = useState([]);
  const { id } = useParams();
  const [single, setSingle] = useState("");

  // fetch for recent data
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:8800/api/post/limit");
      setData(res.data.value);
    };
    fetchData();
  }, []);

  //   fetch for service
  useEffect(() => {
    const fetchService = async () => {
      const res = await axios.get("http://localhost:8800/api/service/all");
      setServices(res.data.value);
    };
    fetchService();
  }, []);

  // fetch for single blog
  useEffect(() => {
    const fetchSingle = async () => {
      const res = await axios.get("http://localhost:8800/api/post/" + id);
      setSingle(res.data.value);
    };
    fetchSingle();
  }, [id]);
  console.log(id);

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
        <div className="left-single-blog">
          {/* container for single blog  */}
          <div className="content-single-blog">
            <h3 className="title-blog single-blog-header"> {single.Title}</h3>
            <div
              className="content-single-blog"
              dangerouslySetInnerHTML={{ __html: single.Content }}
            />
          </div>
          {/* make comment for blog */}
          <div className="comment-single-blog"></div>
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
            {data.map((value) => (
              <div className="recent-blog-item">
                <img src={value.Image} alt="" className="image-recent" />
                <div className="title-recent-blog"> {value.Title} </div>
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
      <Footer />
    </div>
  );
}
