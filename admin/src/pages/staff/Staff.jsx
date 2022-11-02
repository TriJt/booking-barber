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
import ModalStaff from "../../components/Modal/ModalStaff";

export default function Staff() {
  const [dataStaff, setDataStaff] = useState([]);
  const [rowId, setRowId] = useState("");
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState("");
  const [gender, setGender] = useState(["Male", "Female", "Other"]);

  const [inputField, setInputField] = useState({
    Name: "",
    Telephone: "",
    Email: "",
    Gender: "",
    Image: "",
  });

  const InputHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  const Clear = () => {
    setFiles(null);
    setInputField({
      Name: "",
      Telephone: "",
      Email: "",
      Gender: "",
      Image: "",
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
    const handleDelete = async () => {
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
    const submitHandle = async (e) => {
      e.preventDefault();
      setOpen(true);
      await setRowId(params.row._id);
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
      const staff = {
        Name: inputField.Name,
        Telephone: inputField.Telephone,

        Image: list,
        Gender: inputField.Gender,
        Email: inputField.Email,
      };
      try {
        const response = await axios.post(
          "http://localhost:8800/api/staff/add",
          staff
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
      console.log(err);
    }
  };

  return (
    <div className="container">
      {/* container for sidebar */}
      <ModalStaff open={open} onClose={() => setOpen(false)} rowId={rowId} />

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

                <input
                  type="email"
                  className="input-service"
                  name="Email"
                  placeholder="Email"
                  value={inputField.Email}
                  onChange={InputHandler}
                />

                <select
                  name="Gender"
                  value={inputField.Gender}
                  className="select-service"
                  onChange={InputHandler}
                >
                  {gender.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

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
