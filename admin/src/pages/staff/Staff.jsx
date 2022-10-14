import React, { useState, useEffect, useMemo } from "react";
import "./staff.css";
import TopBar from "../../components/topbar/TopBar";
import Sidebar from "../../components/sidebar/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableUser from "../../components/table/table-custom/TableUser";
import { ColumnStaff } from "../../Column";
import axios from "axios";
import { Avatar } from "@mui/material";
import StaffAction from "../../action/StaffAction";

export default function Staff() {
  const [dataStaff, setDataStaff] = useState("");
  const [rowId, setRowId] = useState(null);
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

  const columns = useMemo(
    () => [
      {
        field: "Image",
        header: "Avatar",
        width: 60,
        renderCell: (params) => <Avatar src={params.row.Image} />,
        sortable: false,
        filterable: false,
      },
      {
        field: "Name",
        header: "Name",
        width: 120,
        editable: true,
      },
      {
        field: "Telephone",
        header: "Telephone",
        width: 90,
        editable: true,
      },
      {
        field: "Email",
        header: "Email",
        width: 180,
      },
      {
        field: "Gender",
        header: "Gender",
        width: 90,
        type: "singleSelect",
        valueOptions: ["Male", "Female", "Other"],
        editable: true,
      },
      {
        field: "Number",
        header: "Number",
        width: 60,
        editable: true,
      },
      {
        field: "Street",
        header: "Street",
        width: 100,
        editable: true,
      },
      {
        field: "District",
        header: "District",
        width: 80,
        editable: true,
      },
      {
        field: "City",
        header: "City",
        width: 80,
        editable: true,
      },
      {
        field: "actions",
        header: "Action",
        width: 80,
        type: "actions",
        renderCell: (params) => (
          <StaffAction {...{ params, rowId, setRowId }} />
        ),
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
          <ToastContainer />
          <TableUser title={"Manager Staff"} column={columns} row={dataStaff} rowId={rowId} setRowId={setRowId} />
        </div>
      </div>
    </div>
  );
}
