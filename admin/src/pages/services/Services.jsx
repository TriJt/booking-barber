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

export default function Services() {
  const [dataService, setDataService] = useState([]);
  const [rowId, setRowId] = useState("");
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState("");
  const [category, setCategory] = useState([]);
  const [inputField, setInputField] = useState({
    Name_Service: "",
    Price: "",
    Description: "",
    Category: category[0],
    Image: "",
  });

  const InputHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };
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
    const submitHandle = () => {
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
    const [dataService, setDataService] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        const res = await axios.get(
          "http://localhost:8800/api/service?ServiceId=" + rowId
        );
        setDataService(res.data.value);
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
            X
          </p>
          <div className="modal-service">
            <div className="left-modal">
              {dataService.Image && (
                <img
                  src={
                    files ? URL.createObjectURL(files[0]) : dataService.Image
                  }
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
                <button className="button-profile" onClick={UpdateAvatar}>
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
        renderCell: (params) => <Avatar src={params.row.Image} />,
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
        // type: "singleSelect",
        // valueOptions: [category],
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
  // create new service
  const [errField, setErrField] = useState({
    NameServiceErr: "",
    PriceErr: "",
    DescriptionErr: "",
    CategoryErr: "",
    ImageErr: "",
  });

  // validate form before handClick action
  const validateForm = () => {
    let formValid = true;
    setInputField({
      NameServiceErr: "",
      PriceErr: "",
      DescriptionErr: "",
      CategoryErr: "",
      ImageErr: "",
    });
    if (inputField.Name_Service === "") {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        NameServiceErr: "Please Enter Services !!",
      }));
    }
    if (inputField.Price === "") {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        PriceErr: "Please Enter Price !!",
      }));
    }
    if (inputField.Description === "") {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        DescriptionErr: "Please Enter Description!!",
      }));
    }
    if (inputField.Category === "") {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        CategoryErr: "Please Choose Category !!",
      }));
    }
    if (inputField.Image === "") {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        ImageErr: "Please Choose Image !!",
      }));
    }

    return formValid;
  };

  const CreateNewService = async (e) => {
    e.preventDefault();
    if (validateForm()) {
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
          toast.error("Update is Failed");
        }
      } catch (err) {
        toast.error("Can get picture from Cloud");
      }
    }
  };

  const Clear = () => {
    setFiles(null);
    setInputField({
      Name_Service: "",
      Price: "",
      Description: "",
      Category: category[0],
      Image: "",
    });
    setErrField({
      NameServiceErr: "",
      PriceErr: "",
      DescriptionErr: "",
      CategoryErr: "",
      ImageErr: "",
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
                    <span className="header-service"> image</span>
                    {errField.ImageErr.length > 0 && (
                      <span className="error">{errField.ImageErr} </span>
                    )}
                  </div>
                )}
              </div>
              <div className="right-create">
                <h3 className="header-service"> Create new service</h3>
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
                  <label className="button-profile" onClick={Clear}>
                    Close
                  </label>
                </div>
                <input
                  type="text"
                  className="input-service"
                  name="Name_Service"
                  placeholder="Service"
                  value={inputField.Name_Service}
                  onChange={InputHandler}
                />
                {errField.NameServiceErr.length > 0 && (
                  <span className="error">{errField.NameServiceErr} </span>
                )}
                <input
                  type="number"
                  className="input-service"
                  name="Price"
                  placeholder="Price"
                  value={inputField.Price}
                  onChange={InputHandler}
                />
                {errField.PriceErr.length > 0 && (
                  <span className="error">{errField.PriceErr} </span>
                )}
                <textarea
                  type="text"
                  className="textarea-service"
                  name="Description"
                  placeholder="Description"
                  value={inputField.Description}
                  onChange={InputHandler}
                />
                {errField.DescriptionErr.length > 0 && (
                  <span className="error">{errField.DescriptionErr} </span>
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
                  <span className="error">{errField.CategoryErr} </span>
                )}
                <button className="button-profile" onClick={CreateNewService}>
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
