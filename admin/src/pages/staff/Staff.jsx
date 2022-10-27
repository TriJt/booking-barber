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

export default function Staff() {
  const [dataStaff, setDataStaff] = useState("");
  const [rowId, setRowId] = useState(null);

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

  const View = () => {
    // add link to page information customer
    return (
      <div className="view">
        <button className="button-view">
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
        renderCell: () => <View />,
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
