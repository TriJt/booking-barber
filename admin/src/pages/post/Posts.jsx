import React, { useState, useEffect, useMemo } from "react";
import "../../styles/post.css";
import TopBar from "../../components/topbar/TopBar";
import Sidebar from "../../components/sidebar/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableUser from "../../components/table/table-custom/TableUser";
import axios from "axios";
import { Avatar } from "@mui/material";
import { MdDeleteOutline, MdSaveAlt, MdViewHeadline } from "react-icons/md";
import TextEditor from "../../components/Editor/TextEditor";
import { Link } from "react-router-dom";

export default function Posts() {
  const [data, setData] = useState([]);
  const [services, SetServices] = useState([]);
  const [rowId, setRowId] = useState("");
  const [files, setFiles] = useState("");
  const [content, setContent] = useState("");

  // create new post
  const [inputField, setInputField] = useState({
    Service: services[0],
    Title: "",
    Note: "",
    Image: "",
  });
  // clear after create new post
  const Clear = () => {
    setFiles(null);
    setInputField({
      Service: services[0],
      Title: "",
      Note: "",
      Image: "",
    });
    setContent(null);
  };

  const InputHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  //fetch all post for table
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/post/all");
        setData(res.data.value);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, []);

  // fetch service for create new post

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/service/all");
        SetServices(res.data.value);
      } catch (error) {
        console.log(error);
      }
    };
    fetchService();
  }, []);

  const Delete = ({ params }) => {
    const handleDelete = async () => {
      const data = params.row._id;
      const response = await axios.delete(
        "http://localhost:8800/api/post/delete/" + data
      );
      const fetchData = await axios.get("http://localhost:8800/api/post/all");

      const record = response.data;
      if (record.status === 200) {
        toast.success("Delete information successfully");
        setData(fetchData.data.value);
      } else {
        toast.error("Delete information failed");
      }
    };
    return (
      <div className="delete">
        <button
          className="button-delete"
          onClick={() => {
            if (window.confirm("Are you sure to delete this object?"))
              handleDelete();
          }}
        >
          <MdDeleteOutline className="icon-delete" />
        </button>
      </div>
    );
  };

  const Save = ({ params }) => {
    const handleSubmit = async () => {
      const data = {
        Title: params.row.Title,
        Service: params.row.Service,
        Note: params.row.Note,
      };
      const response = await axios.put(
        "http://localhost:8800/api/post/update/" + params.row._id,
        data
      );
      const record = response.data;
      if (record.status === 200) {
        toast.success("Update information successfully");
      } else {
        toast.error("Update information failed");
      }
    };

    return (
      <div className="save">
        <button
          className="button-save"
          onClick={() => {
            if (window.confirm("Are you sure to update this object?"))
              handleSubmit();
          }}
        >
          <MdSaveAlt className="icon-save" />
        </button>
      </div>
    );
  };

  // change page to post update

  const View = ({ params }) => {
    // add link to page information customer
    return (
      <div className="view">
        <Link to={`/post/${params.row._id}`}>
          <button className="button-view">
            <MdViewHeadline className="icon-view" />
          </button>
        </Link>
      </div>
    );
  };

  // state columns of table
  const columns = useMemo(
    () => [
      {
        field: "Image",
        headerName: "Image",
        width: 100,
        renderCell: (params) => <Avatar src={params.row.Image[0]} />,
        sortable: false,
        filterable: false,
      },
      {
        field: "Title",
        headerName: "Title",
        width: 300,
        editable: true,
      },
      {
        field: "Service",
        headerName: "Service",
        width: 150,
        editable: true,
      },
      {
        field: "Note",
        headerName: "Note",
        width: 200,
        editable: true,
      },
      {
        field: "save",
        width: 80,
        headerName: "Save",
        type: "actions",
        renderCell: (params) => <Save {...{ params, rowId, setRowId }} />,
        editable: true,
      },
      {
        field: "delete",
        width: 80,
        headerName: "Delete",
        type: "actions",
        renderCell: (params) => <Delete {...{ params, rowId, setRowId }} />,
        editable: true,
      },
      {
        field: "view",
        width: 80,
        headerName: "View",
        type: "actions",
        renderCell: (params) => <View {...{ params, rowId, setRowId }} />,
        editable: true,
      },
    ],
    [rowId]
  );

  // create new post

  const CreateNewPost = async (e) => {
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
      const post = {
        Title: inputField.Title,
        Service: inputField.Service,
        Image: list,
        Note: inputField.Note,
        Content: content,
      };
      try {
        const response = await axios.post(
          "http://localhost:8800/api/post/add",
          post
        );
        const record = response.data;
        const newData = record.value;
        setData([...data, newData]);
        Clear();
        if (record.status === 200) {
          toast.success(record.message);
        } else {
          toast.error(record.message);
        }
      } catch (err) {
        toast.error("Add is Failed");
      }
    } catch (err) {
      toast.error("Can get picture from Cloud");
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
        <div className="bottom-profile">
          <div className="staff">
            <TableUser
              title={"Manager Posts"}
              column={columns}
              row={data}
              rowId={rowId}
              setRowId={setRowId}
            />
          </div>
        </div>
        <div className="create-service-container">
          <form className="form-post">
            <div className="top-post">
              <div className="header-post">
                <h3 className="header-receipt padding-none">
                  {" "}
                  Create new Post
                </h3>
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
                    placeholder="Title"
                    value={inputField.Title}
                    onChange={InputHandler}
                  />
                  <select
                    name="Service"
                    id=""
                    value={inputField.Service}
                    className="select-service"
                    onChange={InputHandler}
                  >
                    {services.map((option, i) => (
                      <option key={i} value={option.Name_Service}>
                        {option.Name_Service}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    className="input-service"
                    name="Note"
                    required
                    placeholder="Note"
                    value={inputField.Note}
                    onChange={InputHandler}
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
                    <div className="no-image">
                      <span className="header-service">image</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="bottom-post">
                <TextEditor setContent={setContent} initialValue={content} />
              </div>
              <div className="button-div">
                <button className="button-action" onClick={CreateNewPost}>
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
