import React, { useState, useEffect, useMemo } from "react";
import "../../styles/staff.css";
import "../../styles/service.css";
import TopBar from "../../components/topbar/TopBar";
import Sidebar from "../../components/sidebar/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableUser from "../../components/table/table-custom/TableUser";
import axios from "axios";
import { Avatar } from "@mui/material";
import { MdDeleteOutline, MdSaveAlt, MdViewHeadline } from "react-icons/md";
import { IoIosCloseCircleOutline } from "react-icons/io";

export default function Services() {
  const [dataService, setDataService] = useState([]);
  const [rowId, setRowId] = useState("");
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState("");
  const [category, setCategory] = useState([]);

  //effect data staff
  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/service/all");
        setDataService(res.data.value);
      } catch (error) {
        console.log(error);
      }
    };
    fetchService();
  }, []);

  // fetch title category
  useEffect(() => {
    const fetchTitleCategory = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/category/title");
        setCategory(res.data.value);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTitleCategory();
  }, []);

  const [inputField, setInputField] = useState({
    Name_Service: "",
    Price: "",
    Description: "",
    Category: "",
    Image: "",
  });
  const [errField, setErrField] = useState({
    nameServiceErr: "",
    PriceErr: "",
    DescriptionErr: "",
    CategoryErr: "",
  });

  const resetForm = () => {
    setInputField({
      Name_Service: "",
      Price: "",
      Description: "",
    });

    setTimeout(() => {
      setErrField({
        nameServiceErr: "",
        PriceErr: "",
        DescriptionErr: "",
        CategoryErr: "",
      });
    }, 3000);
  };

  const validateForm = () => {
    let formValid = true;
    setInputField({
      Name_Service: "",
      Price: "",
      Description: "",
    });

    if (inputField.Name_Service === "") {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        nameServiceErr: "Please enter email",
      }));
    }

    if (inputField.Price <= 0) {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        PriceErr: "Price must be greater than 0",
      }));
    }

    if (inputField.Price === "") {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        PriceErr: "Please enter price",
      }));
    }

    if (inputField.Description === "") {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        DescriptionErr: "Please enter description",
      }));
    }

    if (category.length === 0) {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        CategoryErr: "Please choose category",
      }));
    }

    resetForm();
    return formValid;
  };

  const InputHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  const Delete = ({ params }) => {
    const handleDelete = async () => {
      const id = params.row._id;
      // const data = params.row.Category;
      const response = await axios.delete(
        "http://localhost:8800/api/service/delete/" + id
      );
      const fetchData = await axios.get(
        "http://localhost:8800/api/service/all"
      );
      const record = response.data;
      if (record.status === 200) {
        toast.success("Delete information successfully");
        setDataService(fetchData.data.value);
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

  const Modal = ({ open, onClose, rowId }) => {
    const [dataSelect, setDataSelect] = useState("");
    useEffect(() => {
      const fetchData = async () => {
        const res = await axios.get(
          "http://localhost:8800/api/service?ServiceId=" + rowId
        );
        setDataSelect(res.data.value);
      };
      fetchData();
    }, [rowId]);
    const UpdateAvatar = async (e) => {
      e.preventDefault();
      // up load file to cloudinary and update coverPicture in database
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
          ServiceId: rowId,
          Image: list,
        };
        try {
          const response = await axios.put(
            "http://localhost:8800/api/service/update/" + rowId,
            dataImage
          );
          const record = response.data;
          setDataService(record.value);
          if (record.status === 200) {
            toast.success(record.message);
          } else {
            toast.error(record.message);
          }
        } catch (err) {
          toast.error("Update in SessionStorage Failed");
        }
      } catch (err) {
        toast.error("Can get picture from Cloud");
      }
    };

    if (!open) return null;

    return (
      <div className="overlay">
        <div className="modalContainer">
          <p className="closeBtn" onClick={onClose}>
            <IoIosCloseCircleOutline />
          </p>
          <div className="modal-service">
            <div className="left-modal">
              {dataSelect.Image && (
                <img
                  src={files ? URL.createObjectURL(files[0]) : dataSelect.Image}
                  alt=""
                  className="service-image"
                />
              )}
            </div>
            <div className="right-modal">
              <div className="item-right-modal">
                <h3 className="title-value"> Image Service</h3>
                <form>
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
                </form>
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

  // state columns of table
  const columns = useMemo(
    () => [
      {
        field: "Image",
        headerName: "Image",
        width: 60,
        renderCell: (params) => <Avatar src={params.row.Image[0]} />,
        sortable: false,
        filterable: false,
      },
      {
        field: "Name_Service",
        headerName: "Service",
        width: 150,
        editable: true,
      },
      {
        field: "Price",
        headerName: "Price",
        width: 90,
        editable: true,
      },
      {
        field: "Description",
        headerName: "Description",
        width: 350,
        editable: true,
      },
      {
        field: "Category",
        headerName: "Category",
        width: 90,
        editable: true,
      },
      {
        field: "save",
        width: 80,
        headerName: "Save",
        type: "actions",
        renderCell: (params) => <Save {...{ params, rowId, setRowId }} />,
      },
      {
        field: "delete",
        width: 80,
        headerName: "Delete",
        type: "actions",
        renderCell: (params) => <Delete {...{ params, rowId, setRowId }} />,
      },
      {
        field: "view",
        width: 80,
        headerName: "View",
        type: "actions",
        renderCell: (params) => <View {...{ params, rowId, setRowId }} />,
      },
    ],
    [rowId]
  );

  const CreateNewService = async (e) => {
    e.preventDefault();

    if (validateForm()) {
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
      const service = {
        Name_Service: inputField.Name_Service,
        Price: inputField.Price,
        Image: list,
        Description: inputField.Description,
        Category: inputField.Category,
      };
      try {
        const response = await axios.post(
          "http://localhost:8800/api/service/add",
          service
        );
        const record = response.data;
        const newData = record.value;
        setDataService([...dataService, newData]);
        Clear();
        if (record.status === 200) {
          toast.success(record.message);
        } else {
          toast.error(record.message);
        }
      } catch (err) {
        toast.error("Create is Failed");
      }
    }
  };

  const Clear = () => {
    setFiles(null);
    setInputField({
      Name_Service: "",
      Price: "",
      Description: "",
      Category: "",
      Image: "",
    });
  };

  return (
    <div className="container">
      {/* container for sidebar */}
      <Modal open={open} onClose={() => setOpen(false)} rowId={rowId} />
      <ToastContainer />
      <div className="left-container">
        <Sidebar />
      </div>
      {/* container for topBar and mainBar */}
      <div className="right-container">
        <div className="top-container">
          <TopBar />
        </div>
        {/* phần thông tin của staff */}
        <div className="bottom-profile">
          <div className="staff">
            <TableUser
              title={"Manager Service"}
              column={columns}
              row={dataService}
              rowId={rowId}
              setRowId={setRowId}
            />
          </div>
        </div>
        <div className="create-service-container">
          <div className="left-service"></div>
          <div className="right-service">
            <form>
              <div className="left-create">
                {files ? (
                  <img
                    src={URL.createObjectURL(files[0])}
                    alt=""
                    className="service-new-image"
                  />
                ) : (
                  <div className="no-image-service">
                    <span className="header-image"> image</span>
                  </div>
                )}
              </div>
              <div className="right-create">
                <h3 className="header-receipt padding-none">
                  {" "}
                  Create new SERVICES
                </h3>
                <div className="btn-service">
                  <label htmlFor="file" className="button-action">
                    Choose Image
                    <input
                      type="file"
                      id="file"
                      multiple
                      required
                      style={{ display: "none" }}
                      onChange={(e) => setFiles(e.target.files)}
                    ></input>
                  </label>
                  <label className="button-action" onClick={Clear}>
                    Close
                  </label>
                </div>
                <div className="item-receipt padding-service">
                  <input
                    type="text"
                    className="input-receipt"
                    name="Name_Service"
                    placeholder="Service"
                    required
                    value={inputField.Name_Service}
                    onChange={InputHandler}
                  />
                </div>
                {errField.nameServiceErr.length > 0 && (
                  <span className="error no-padding">
                    {errField.nameServiceErr}{" "}
                  </span>
                )}
                <div className="item-receipt padding-service">
                  <input
                    type="number"
                    className="input-receipt"
                    name="Price"
                    placeholder="Price"
                    required
                    value={inputField.Price}
                    onChange={InputHandler}
                  />
                </div>
                {errField.PriceErr.length > 0 && (
                  <span className="error no-padding">{errField.PriceErr} </span>
                )}
                <div className="item-receipt padding-service">
                  <textarea
                    type="text"
                    className="textarea-service"
                    name="Description"
                    placeholder="Description"
                    required
                    value={inputField.Description}
                    onChange={InputHandler}
                  />
                </div>
                {errField.DescriptionErr.length > 0 && (
                  <span className="error no-padding">{errField.PriceErr} </span>
                )}

                <select
                  name="Category"
                  value={inputField.Category}
                  className="select-service"
                  onChange={InputHandler}
                >
                  {category.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errField.CategoryErr.length > 0 && (
                  <span className="error no-padding">
                    {errField.CategoryErr}{" "}
                  </span>
                )}
                <button className="button-action" onClick={CreateNewService}>
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
