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
import { BiDotsVerticalRounded } from "react-icons/bi";
import moment from "moment";
import { Link } from "react-router-dom";

export default function SingleBlog() {
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(currentUser);
  const [data, setData] = useState([]);
  const [services, setServices] = useState([]);
  const { id } = useParams();
  const [single, setSingle] = useState("");
  const [comment, setComment] = useState([]);
  const [text, setText] = useState("");
  const [edit, setEdit] = useState(false);
  const [count, setCount] = useState("");
  const [commentId, setCommentId] = useState("");

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

  console.log(single);

  // fetch for single blog
  useEffect(() => {
    const fetchComment = async () => {
      const res = await axios.get(
        "http://localhost:8800/api/post/comment/all?PostId=" + id
      );

      setComment(res.data.value);
    };
    fetchComment();
  }, [id]);
  useEffect(() => {
    // count comment
    const countComment = async () => {
      const res = await axios.get(
        "http://localhost:8800/api/post/comment/count?PostId=" + id
      );
      setCount(res.data.value);
    };
    countComment();
  });

  const [inputField, setInputField] = useState({
    Text: "",
  });
  const InputHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };
  const Exit = (e) => {
    e.preventDefault();
    setInputField({ Text: "" });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = {
      PostId: id,
      UserId: user._id,
      Name: user.Name_Customer,
      Image: user.Image[0],
      Text: inputField.Text,
    };
    try {
      const response = await axios.post(
        "http://localhost:8800/api/post/comment",
        data
      );

      const record = response.data;
      setComment([...comment, record.value]);
      setInputField({ Text: "" });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentId = (id, text) => {
    setEdit(true);
    setCommentId(id);
    setText(text);
  };
  const closeCommnet = () => {
    setEdit(false);
    setCommentId(null);
  };

  const onChangeText = (e) => {
    setText(e.target.value);
  };

  const updateHandle = async () => {
    const data = {
      UserId: user._id,
      Text: text,
    };

    try {
      const res = await axios.put(
        "http://localhost:8800/api/post/comment/" + commentId,
        data
      );
      setEdit(false);
      setCommentId(null);
      const response = await axios.get(
        "http://localhost:8800/api/post/comment/all?PostId=" + id
      );

      setComment(response.data.value);
    } catch (error) {
      console.log(error);
    }
  };

  const DeleteHandle = async (idComment) => {
    try {
      const res = await axios.delete(
        "http://localhost:8800/api/post/comment-del/" + idComment,
        {
          data: {
            UserId: user._id,
          },
        }
      );

      const response = await axios.get(
        "http://localhost:8800/api/post/comment/all?PostId=" + id
      );

      setComment(response.data.value);
    } catch (error) {
      console.log(error);
    }
  };

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
          <div className="count-comment">
            {count ? <span>{count} Comment</span> : <span> 0 Comment</span>}
          </div>

          {user ? (
            <div className="comment-single-blog">
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
                      name="Text"
                      value={inputField.Text}
                      onChange={InputHandler}
                    />
                  </div>
                  <div className="action-comment">
                    <button className="exit-comment" onClick={Exit}>
                      Exit
                    </button>
                    <button className="submit-comment" onClick={submitHandler}>
                      Comment
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : null}

          <>
            {comment ? (
              <div className="show-comment">
                {comment.map((value, i) => (
                  <div className="comment-container" key={i}>
                    <img src={value.Image} alt="" className="img-comment" />
                    <div className="form-show-comment">
                      <div className="header-comment">
                        <span className="name-comment">{value.Name}</span>
                        <span className="time-comment">
                          {moment(value.createdAt).fromNow()}
                        </span>
                      </div>
                      {commentId === value._id ? (
                        <div className="update-comment" key={value._id}>
                          <input
                            name="text"
                            type="text"
                            className="item-update"
                            value={text}
                            onChange={onChangeText}
                          />
                          <div className="update-action">
                            <button
                              onClick={closeCommnet}
                              className="cancel-update"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={updateHandle}
                              className="save-update"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      ) : (
                        <React.Fragment>
                          <p className="text-comment">{value.Text}</p>
                        </React.Fragment>
                      )}
                    </div>
                    {user ? (
                      <div className="form-action">
                        {user._id === value.UserId ? (
                          <div className="dropdown-comment">
                            <div className="dropdown-comment-select">
                              <BiDotsVerticalRounded />
                            </div>
                            <ul className="dropdown-comment-list">
                              <li className="dropdown-comment-item">
                                <span
                                  className="dropdown-comment-text"
                                  onClick={() => {
                                    handleCommentId(value._id, value.Text);
                                  }}
                                >
                                  Update
                                </span>
                              </li>
                              <li className="dropdown-comment-item">
                                <span
                                  className="dropdown-comment-text"
                                  onClick={() => DeleteHandle(value._id)}
                                >
                                  Delete
                                </span>
                              </li>
                            </ul>
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : null}
          </>
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
            {services.map((value, u) => (
              <div className="service-blog" key={u}>
                <span>{value.Name_Service}</span>
              </div>
            ))}
          </div>
          {/*  recent blog limit 3 */}
          <div className="list-service-blog">
            <h3 className="title-blog"> RECENT BLOG</h3>
            {data.map((value) => (
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
      <Footer />
    </div>
  );
}
