import React, { useState, useEffect, useMemo } from "react";
import TopBar from "../../components/topbar/TopBar";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import "../../styles/banner.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Avatar } from "@mui/material";
import TableUser from "../../components/table/table-custom/TableUser";
import { MdDeleteOutline, MdSaveAlt, MdViewHeadline } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Banner() {
  const [data, setData] = useState([]);
  const [files, setFiles] = useState("");
  const [desc, setDesc] = useState("");
  const [rowId, setRowId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:8800/api/store/get-banner");
      setData(res.data.value);
    };
    fetchData();
  }, []);

  const Clear = () => {
    setDesc("");
    setFiles(null);
  };

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
      const banner = {
        Image: list,
        Description: desc,
      };
      try {
        const response = await axios.post(
          "http://localhost:8800/api/store/banner",
          banner
        );
        const record = response.data;
        // const newData = record.value;
        // setData([...data, newData]);
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

  const Delete = ({ params }) => {
    const handleDelete = async () => {
      const data = params.row._id;
      const response = await axios.delete(
        "http://localhost:8800/api/store/delete-banner/" + data
      );
      const fetchData = await axios.get(
        "http://localhost:8800/api/store/get-banner"
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
        Description: params.row.Description,
      };
      const response = await axios.put(
        "http://localhost:8800/api/store/banner/" + params.row._id,
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
        field: "Description",
        headerName: "Description",
        width: 150,
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

  return (
    <div className="container">
      {/* container for sidebar */}
      <div className="left-container">
        <Sidebar />
      </div>

      {/* container for topBar and mainBar */}
      <div className="right-container">
        <ToastContainer />
        <div className="top-container">
          <TopBar />
        </div>
        <div className="banner-container">
          <div className="banner-left">
            {" "}
            <TableUser
              title={"Manager Service"}
              column={columns}
              row={data}
              rowId={rowId}
              setRowId={setRowId}
            />
          </div>
          <div className="banner-right">
            <div className="header-receipt">Create new banner</div>

            <div className="image-banner">
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
                <label className="button-action" onClick={() => setFiles(null)}>
                  Close
                </label>
              </div>
              {files ? (
                <img
                  src={URL.createObjectURL(files[0])}
                  alt=""
                  className="banner-image"
                />
              ) : (
                <div className="no-image-banner">
                  <span className="header-service">image</span>
                </div>
              )}
            </div>
            <div className="item-receipt">
              <input
                type="text"
                className="input-receipt"
                placeholder="Description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <div className="button-receipt">
              <button className="button-action padding" onClick={submitHandle}>
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
