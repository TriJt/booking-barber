import React, { useState, useEffect, useMemo } from "react";
import "../../styles/staff.css";
import TopBar from "../../components/topbar/TopBar";
import Sidebar from "../../components/sidebar/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableUser from "../../components/table/table-custom/TableUser";
import axios from "axios";
import { Avatar } from "@mui/material";
import { MdDeleteOutline, MdSaveAlt, MdViewHeadline } from "react-icons/md";
import { MdDriveFileRenameOutline, MdOutlineEmail } from "react-icons/md";
import { BsTelephoneForward, BsGenderAmbiguous } from "react-icons/bs";
import { FaRegAddressCard, FaBirthdayCake } from "react-icons/fa";

export default function Staff() {
  const [dataStaff, setDataStaff] = useState("");
  const [rowId, setRowId] = useState("");
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState("");

  const [inputField, setInputField] = useState({
    Name: "",
    Telephone: "",
    Email: "",
    Gender: "",
    Image: "",
    Birthday: "",
  });

  const InputHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };
  const [errField, setErrField] = useState({
    NameErr: "",
    TelephoneErr: "",
    EmailErr: "",
    GenderErr: "",
    ImageErr: "",
    BirthdayErr: "",
  });

  // validate form before handClick action
  const validateForm = () => {
    let formValid = true;
    setInputField({
      NameErr: "",
      TelephoneErr: "",
      EmailErr: "",
      GenderErr: "",
      ImageErr: "",
      BirthdayErr: "",
    });
    if (inputField.Name === "") {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        NameErr: "Please Enter Name !!",
      }));
    }
    if (inputField.Telephone === "") {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        TelephoneErr: "Please Enter Telephone !!",
      }));
    }
    if (inputField.Email === "") {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        EmailErr: "Please Enter Your Email !!",
      }));
    }
    if (inputField.Gender === "") {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        GenderErr: "Please Choose Gender !!",
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

  const Clear = () => {
    setFiles(null);
    setInputField({
      Name: "",
      Telephone: "",
      Email: "",
      Gender: "",
      Image: "",
      Birthday: "",
    });
    setErrField({
      NameErr: "",
      TelephoneErr: "",
      EmailErr: "",
      GenderErr: "",
      ImageErr: "",
      BirthdayErr: "",
    });
  };

  //effect data staff
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/staff/all");
        setDataStaff(res.data.value);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStaff();
  }, []);

  const Delete = ({ params }) => {
    const handleDelete = async (e) => {
      const data = params.row._id;
      const response = await axios.delete(
        "http://localhost:8800/api/staff/delete/" + data
      );
      const fetchData = await axios.get("http://localhost:8800/api/staff/all");

      const record = response.data;
      if (record.status === 200) {
        toast.success("Delete information successfully");
        setDataStaff(fetchData.data.value);
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

  const Save = ({ params, rowId, setRowId }) => {
    const handleSubmit = async () => {
      const data = {
        StaffId: params.row._id,
        Name: params.row.Name,
        Telephone: params.row.Telephone,
        Gender: params.row.Gender,
        Active: params.row.Active,
      };
      const response = await axios.put(
        "http://localhost:8800/api/staff/update/" + rowId,
        data
      );
      const record = response.data;
      if (record.statusText === "Success") {
        toast.success("Update information successfully");
      } else {
        toast.error("Delete information failed");
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
    const [data, setData] = useState("");

    useEffect(() => {
      const fetchData = async () => {
        const res = await axios.get(
          "http://localhost:8800/api/staff?staffId=" + rowId
        );
        setData(res.data.value);
      };
      fetchData();
    }, [rowId]);

    if (!open) return null;

    return (
      <div className="overlay">
        <div className="modalContainer">
          <p className="closeBtn" onClick={onClose}>
            X
          </p>
          <div className="modalInformation">
            <h3 className="title-value"> Information</h3>
            <div className="items-value">
              <span className="icon-value">
                <MdDriveFileRenameOutline />
              </span>
              <input
                type="text"
                className="text-value"
                placeholder="Name"
                name="Name"
                value={data.Name}
              />
            </div>
            <div className="items-value">
              <span className="icon-value">
                <BsTelephoneForward />
              </span>
              <input
                type="text"
                className="text-value"
                placeholder="Telephone"
                name="Telephone"
                value={data.Telephone}
              />
            </div>
            <div className="items-value">
              <span className="icon-value">
                <MdOutlineEmail />
              </span>
              <input
                type="text"
                className="text-value"
                placeholder="Email"
                name="Email"
                value={data.Email}
              />
            </div>
            <div className="items-value">
              <span className="icon-value">
                <FaRegAddressCard />
              </span>
              <input
                type="text"
                className="text-value"
                placeholder="Address"
                value={`${data.Number} ${data.Street} ${data.District} ${data.City}`}
              />
            </div>
            <div className="items-value">
              <span className="icon-value">
                <BsGenderAmbiguous />
              </span>
              <input
                type="text"
                className="text-value"
                placeholder="Gender"
                name="Gender"
                value={data.Gender}
              />
            </div>
            <div className="items-value">
              <span className="icon-value">
                <FaBirthdayCake />
              </span>
              <input
                type="text"
                className="text-value"
                placeholder="Birthday"
                name="Birthday"
                value={data.Birthday}
              />
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
        headerName: "Avatar",
        width: 60,
        renderCell: (params) => <Avatar src={params.row.Image} />,
        sortable: false,
        filterable: false,
      },
      {
        field: "Name",
        headerName: "Name",
        width: 120,
        editable: true,
      },
      {
        field: "Telephone",
        headerName: "Telephone",
        width: 90,
        editable: true,
      },
      {
        field: "Email",
        headerName: "Email",
        width: 180,
      },
      {
        field: "Gender",
        headerName: "Gender",
        width: 90,
        type: "singleSelect",
        valueOptions: ["Male", "Female", "Other"],
        editable: true,
      },
      {
        field: "Active",
        headerName: "Active",
        width: 90,
        type: "boolean",
        editable: true,
      },

      {
        field: "isAdmin",
        headerName: "Admin",
        width: 90,
        type: "boolean",
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

  // create new staff
  const HandlerSubmit = async (e) => {
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
          Name: inputField.Name,
          Telephone: inputField.Telephone,
          Image: list,
          Gender: inputField.Gender,
          Email: inputField.Email,
        };
        try {
          const response = await axios.post(
            "http://localhost:8800/api/service/add",
            service
          );
          const record = response.data;
          const newData = record.value;
          setDataStaff([...dataStaff, newData]);
          Clear();
          if (record.status === 200) {
            toast.success(record.message);
          } else {
            toast.error(record.message);
          }
        } catch (err) {
          toast.error("Create is Failed");
        }
      } catch (err) {
        toast.error("Can get picture from Cloud");
      }
    }
  };

  return (
    <div className="container">
      {/* container for sidebar */}
      <Modal open={open} onClose={() => setOpen(false)} rowId={rowId} />

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
            <ToastContainer />
            <TableUser
              title={"Manager Staff"}
              column={columns}
              row={dataStaff}
              rowId={rowId}
              setRowId={setRowId}
            />
          </div>
        </div>
        <div className="bottom-staff">
          <div className="left-staff">
            {/* chart for salary staff */}
            Salary chart
          </div>
          <div className="right-staff">
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
                  name="Name"
                  placeholder="Name"
                  value={inputField.Name}
                  onChange={InputHandler}
                />
                {errField.NameErr.length > 0 && (
                  <span className="error">{errField.NameErr} </span>
                )}
                <input
                  type="text"
                  className="input-service"
                  name="Telephone"
                  placeholder="Telephone"
                  maxLength={11}
                  minLength={10}
                  value={inputField.Telephone}
                  onChange={InputHandler}
                />
                {errField.TelephoneErr.length > 0 && (
                  <span className="error">{errField.TelephoneErr} </span>
                )}
                <input
                  type="email"
                  className="input-service"
                  name="Email"
                  placeholder="Email"
                  value={inputField.Email}
                  onChange={InputHandler}
                />
                {errField.EmailErr.length > 0 && (
                  <span className="error">{errField.EmailErr} </span>
                )}
                <select
                  name="Gender"
                  value={inputField.Gender}
                  className="select-service"
                  onChange={InputHandler}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other genders">Other genders</option>
                </select>
                {errField.GenderErr.length > 0 && (
                  <span className="error">{errField.GenderErr} </span>
                )}
                <button className="button-profile" onClick={HandlerSubmit}>
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
