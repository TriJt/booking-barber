import React, { useState, useEffect, useMemo } from "react";
import "./staff.css";
import TopBar from "../../components/topbar/TopBar";
import Sidebar from "../../components/sidebar/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableUser from "../../components/table/table-custom/TableUser";
import axios from "axios";
import { Avatar } from "@mui/material";
import StaffNew from "../../components/create/Staff/Staff";
import { MdDeleteOutline, MdSaveAlt, MdViewHeadline } from "react-icons/md";
import { MdDriveFileRenameOutline, MdOutlineEmail } from "react-icons/md";
import { BsTelephoneForward, BsGenderAmbiguous } from "react-icons/bs";
import { FaRegAddressCard, FaBirthdayCake } from "react-icons/fa";

export default function Staff() {
  const [dataStaff, setDataStaff] = useState("");
  const [rowId, setRowId] = useState("");
  const [open, setOpen] = useState(false);

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
                name="Nam"
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
        <div className="staff-bottom">
          <StaffNew setDataStaff={setDataStaff} />
        </div>
      </div>
    </div>
  );
}
