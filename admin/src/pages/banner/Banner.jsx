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

export default function Banner() {
  const [data, setData] = useState([]);
  const [files, setFiles] = useState("");
  const [desc, setDesc] = useState("");
  const [rowId, setRowId] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:8800/api/store/get-banner");
      setData(res.data.value);
    };
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get("http://localhost:8800/api/store/get-banner");
    setData(res.data.value);
  };

  const Clear = () => {
    setDesc("");
    setFiles(null);
    setTimeout(() => {
      setErrField({
        DescErr: "",
        ImagesErr: "",
      });
    }, 3000);
  };

  const [errField, setErrField] = useState({
    DescErr: "",
    ImagesErr: "",
  });

  const validForm = () => {
    let formValid = true;

    if (desc === "") {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        DescErr: "Please enter description",
      }));
    }

    if (files === "") {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        ImagesErr: "Please choose image",
      }));
    }

    Clear();
    return formValid;
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    if (validForm()) {
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
        Clear();
        if (record.status === 200) {
          toast.success(record.message);
          fetchData();
        } else {
          toast.error(record.message);
        }
      } catch (err) {
        toast.error("Add is Failed");
      }
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
        "http://localhost:8800/api/store/update-banner/" + params.row._id,
        data
      );
      console.log(params.row._id);
      const record = response.data;
      if (record.status === 200) {
        toast.success(record.message);
      } else {
        toast.error(record.message);
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
    const submitHandle = async (e) => {
      e.preventDefault();
      setOpen(true);
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

  const ModalBanner = ({ open, onClose, rowId }) => {
    const [dataBanner, setDataBanner] = useState("");
    const [files, setFiles] = useState("");
    const [err, setErr] = useState("");

    useEffect(() => {
      const fetchData = async () => {
        const res = await axios.get(
          "http://localhost:8800/api/store/banner/" + rowId
        );
        setDataBanner(res.data.value);
      };
      fetchData();
    }, [rowId]);

    const UpdateAvatar = async (e) => {
      e.preventDefault();
      if (ValidForm()) {
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

          const dataImage = {
            Image: list,
          };
          try {
            const response = await axios.put(
              "http://localhost:8800/api/store/update-banner/" + rowId,
              dataImage
            );
            const record = response.data;
            setDataBanner(record.value);
            if (record.status === 200) {
              toast.success(record.message);
              fetchData();
            } else {
              toast.error(record.message);
            }
          } catch (err) {
            toast.error("Update in SessionStorage Failed");
          }
        } catch (err) {
          toast.error("Can get picture from Cloud");
        }
      }
    };

    const ValidForm = () => {
      let formValid = true;
      setErr("");
      if (files === "") {
        formValid = false;
        setErr("Please choose image before update");
      }
      return formValid;
    };

    if (!open) return null;

    return (
      <div className="overlay">
        <div className="modalContainer">
          <p className="closeBtn" onClick={onClose}>
            X
          </p>
          <div className="modal-service">
            <div className="left-modal">
              {dataBanner.Image && (
                <img
                  src={files ? URL.createObjectURL(files[0]) : dataBanner.Image}
                  alt=""
                  className="service-image"
                />
              )}
            </div>
            <div className="right-modal">
              <div className="item-right-modal">
                <h3 className="title-value"> Image Banner</h3>
                <form>
                  <label htmlFor="file" className="button-profile">
                    Choose Image
                    <input
                      type="file"
                      id="file"
                      required
                      multiple
                      style={{ display: "none" }}
                      onChange={(e) => setFiles(e.target.files)}
                    ></input>
                  </label>
                </form>
                {err.length > 0 && <span className="error">{err} </span>}
                <button className="button-action" onClick={UpdateAvatar}>
                  Change
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <ModalBanner open={open} onClose={() => setOpen(false)} rowId={rowId} />

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
              title={"Manager Banners"}
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
                  {errField.ImagesErr.length > 0 && (
                    <span className="error">{errField.ImagesErr} </span>
                  )}
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
            {errField.DescErr.length > 0 && (
              <span className="error padding-salary">{errField.DescErr} </span>
            )}
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
