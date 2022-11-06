import React, { useEffect, useState, useContext } from "react";
import TopBar from "../../components/Topbar/TopBar";
import { SliderServices } from "../../components/Home/Slider/Slider";
import Footer from "../../components/Footer/Footer";
import Telephone from "../../components/Appointment/Telephone";
import "../../styles/components/singleBlog.css";
import axios from "axios";
import { BiSearchAlt } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function SingleBlog() {
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(currentUser);
  const [data, setData] = useState([]);
  const [services, setServices] = useState([]);
  const { id } = useParams();
  const [single, setSingle] = useState("");
  const [comment, setComment] = useState([]);

  // fetch for recent data
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:8800/api/post/limit");
      setData(res.data.value);
    };
    fetchData();
    //   fetch for service
    const fetchService = async () => {
      const res = await axios.get("http://localhost:8800/api/service/all");
      setServices(res.data.value);
    };
    fetchService();
  }, []);
  // fetch single
  useEffect(() => {
    const fetchSingle = async () => {
      const res = await axios.get("http://localhost:8800/api/post/" + id);
      setSingle(res.data.value);
    };
    fetchSingle();
  }, [id]);

  // fetch for single blog
  useEffect(() => {
    const fetchComment = async () => {
      const res = await axios.get(
        "http://localhost:8800/api/post/comment/all?PostId=" + id
      );
      console.log(res.data);
      setComment(res.data.value);
    };
    fetchComment();
  }, [id]);

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
          {user ? (
            <div className="comment-single-blog">
              {/* show comment  */}

              {/* create new comment  */}
              <div className="form-create-comment">
                <form action="">
                  <div className="create-comment-blog">
                    <img
                      src={user.Image}
                      alt=""
                      className="img-create-comment"
                    />
                    <input
                      type="text"
                      className="input-create-comment"
                      placeholder="Comment..."
                    />
                  </div>
                  <div className="action-comment">
                    <button className="exit-comment"> Exit</button>
                    <button className="submit-comment">Comment</button>
                  </div>
                </form>
              </div>
            </div>
          ) : null}
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
