import React, { useState, useEffect, useMemo } from "react";
import TopBar from "../../components/topbar/TopBar";
import Sidebar from "../../components/sidebar/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import TextEditor from "../Editor/TextEditor";

export default function SinglePost() {
  const [data, setData] = useState([]);
  const [services, SetServices] = useState([]);
  const { id } = useParams();
  const [files, setFiles] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState([]);
  const [note, setNote] = useState("");
  const [service, setService] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/post/" + id);
        const value = res.data.value;
        setData(value);
        console.log(value);

        if (value !== null) {
          setTitle(value.Title);
          setImage(value.Image);
          setService(value.Service);
          setNote(value.Note);
          setContent(value.Content);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchService = async () => {
      const res = await axios.get("http://localhost:8800/api/service/all");
      SetServices(res.data.value);
    };
    fetchService();
  }, []);

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onChangeService = (e) => {
    setService(e.target.value);
  };

  const onChangeNote = (e) => {
    setNote(e.target.value);
  };

  //   const InputHandler = (e) => {
  //     setInputField({ ...inputField, [e.target.name]: e.target.value });
  //   };

  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "social0722");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/johnle/image/upload",
            data
          );
          const { url } = uploadRes.data;
          return url;
        })
      );
      const data = {
        Title: title,
        Service: service,
        Note: note,
        Image: list,
        Content: content,
      };
      const response = await axios.put(
        "http://localhost:8800/api/post/update/" + id,
        data
      );
      const record = response.data;
      if (record.status === 200) {
        toast.success("Update information successfully");
      } else {
        toast.error("Update information failed");
      }
    } catch {
      toast.error("Update information failed");
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="left-container">
        <Sidebar />
      </div>
      {/* container for topBar and mainBar */}
      <div className="right-container">
        <div className="top-container">
          <TopBar />
        </div>
        <div className="bottom-single">
          <div className="create-service-container">
            <form className="form-post">
              <div className="top-post">
                <div className="header-post">
                  <h3 className="header-receipt"> Update Post</h3>
                </div>
                <div className="create-container">
                  <div className="left-create-post">
                    <div className="btn-service">
                      <label htmlFor="file" className="button-action">
                        Choose Image
                        <input
                          type="file"
                          id="file"
                          multiple
                          style={{ display: "none" }}
                          onChange={(e) => setFiles(e.target.files)}
                        ></input>
                      </label>
                      <label
                        className="button-action"
                        onClick={() => setFiles(null)}
                      >
                        Close
                      </label>
                    </div>
                    <input
                      type="text"
                      className="input-service"
                      name="Title"
                      required
                      value={title}
                      onChange={onChangeTitle}
                    />
                    <select
                      name="Service"
                      id=""
                      value={service}
                      className="select-service"
                      onChange={onChangeService}
                    >
                      {services.map((option, i) => (
                        <option key={i} value={option.Name_Service}>
                          {option.Name_Service}
                        </option>
                      ))}
                    </select>
                    <textarea
                      style={{ height: "80px" }}
                      type="text"
                      className="input-service"
                      name="Note"
                      required
                      placeholder="Note"
                      value={note}
                      onChange={onChangeNote}
                    />
                  </div>
                  <div className="right-create-post">
                    {files ? (
                      <img
                        src={URL.createObjectURL(files[0])}
                        alt=""
                        className="post-image"
                      />
                    ) : (
                      <img src={image} alt="" className="post-image" />
                    )}
                  </div>
                </div>
                <div className="bottom-post">
                  <TextEditor setContent={setContent} value={data.Content} />
                </div>
                <div className="button-div">
                  <button className="button-action" onClick={submitHandle}>
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
