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
import { SaveStaff } from "../../action/SaveAction";
import { DeleteStaff } from "../../action/DeleteAction";
import StaffNew from "../../components/new/StaffNew";

export default function Staff({ deletedId }) {
  const [dataStaff, setDataStaff] = useState("");
  const [rowId, setRowId] = useState(null);
  const [Id, setDeleted] = useState();

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
        field: "Salary",
        header: "Salary",
        width: 90,
        type: "singleSelect",
        valueOptions: ["Paid", "Unpaid"],
        editable: true,
      },
      {
        field: "Active",
        header: "Active",
        width: 90,
        type: "boolean",
        editable: true,
      },
      {
        field: "save",
        width: 80,
        type: "actions",
        renderCell: (params) => <SaveStaff {...{ params, rowId, setRowId }} />,
        editable: true,
      },
      {
        field: "delete",
        width: 80,
        type: "actions",
        renderCell: (params) => <DeleteStaff {...{ params, deletedId, Id }} />,
        editable: true,
      },
    ],
    [rowId]
  );
  console.log();

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
              setDeleted={setDeleted}
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
