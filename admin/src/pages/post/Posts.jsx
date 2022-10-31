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

export default function Posts() {
  const [data, setData] = useState([]);
  const [services, SetServices] = useState([]);
  const [rowId, setRowId] = useState("");
  const [files, setFiles] = useState("");

  const [update, setUpdate] = useState(false);

  // create new post
  const [inputField, setInputField] = useState({
    Service: "",
    Title: "",
    Content: "",
    Note: "",
    Image: "",
  });

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
      const categoryName = params.row.Category;
      const response = await axios.delete(
        "http://localhost:8800/api/service/delete/" + data,
        categoryName
      );
      const fetchData = await axios.get(
        "http://localhost:8800/api/service/all"
      );

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
        Name_Service: params.row.Name_Service,
        Price: params.row.Price,
        Description: params.row.Description,
        Category: params.row.Category,
      };
      const response = await axios.put(
        "http://localhost:8800/api/service/update/" + params.row._id,
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

  const View = ({ params, setRowId }) => {
    const submitHandle = () => {
      setUpdate(true);
      setRowId(params.row._id);
    };
    // add link to page information customer
    return (
      <div className="view">
        <button className="button-view" onClick={submitHandle}>
          <MdViewHeadline className="icon-view" />
        </button>
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
        renderCell: (params) => <Avatar src={params.row.Image} />,
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
              title={"Manager Service"}
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
                <h3 className="header-service"> Create new Post</h3>
              </div>
              <div className="create-container">
                <div className="left-create-post">
                  <div className="btn-service">
                    <label htmlFor="file" className="button-profile">
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
                      className="button-profile"
                      onClick={() => setFiles(null)}
                    >
                      Close
                    </label>
                  </div>
                  <input
                    type="text"
                    className="input-service"
                    name="Title"
                    placeholder="Title"
                    value={inputField.Title}
                    onChange={InputHandler}
                  />
                  <select
                    name="Category"
                    id=""
                    value={inputField.Category}
                    className="select-service"
                    onChange={InputHandler}
                  >
                    {services.map((option) => (
                      <option key={option} value={option}>
                        {option.Name_Service}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    className="input-service"
                    name="Note"
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
                      <span className="header-service"> No image</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="bottom-post">
                <textarea
                  type="text"
                  className="textarea-service"
                  name="Description"
                  placeholder="Description"
                  value={inputField.Description}
                  onChange={InputHandler}
                />
              </div>

              {/* <button className="button-profile" onClick={CreateNewService}>
                Create
              </button> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
