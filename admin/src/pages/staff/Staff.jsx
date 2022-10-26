import React, { useState, useEffect, useMemo } from "react";
import "./staff.css";
import TopBar from "../../components/topbar/TopBar";
import Sidebar from "../../components/sidebar/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableUser from "../../components/table/table-custom/TableUser";
import axios from "axios";
import { Avatar } from "@mui/material";
import { SaveStaff } from "../../action/SaveAction";
import StaffNew from "../../components/create/Staff/Staff";

export default function Staff({ deletedId }) {
  const [dataStaff, setDataStaff] = useState("");
  const [rowId, setRowId] = useState(null);
  const [Id, setDeleted] = useState();

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
        field: "Salary",
        headerName: "Salary",
        width: 90,
        type: "singleSelect",
        valueOptions: ["Paid", "Unpaid"],
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
        renderCell: (params) => <SaveStaff {...{ params, rowId, setRowId }} />,
        editable: true,
      },
      // {
      //   field: "delete",
      //   headerName: "Delete",
      //   width: 80,
      //   type: "actions",
      //   renderCell: (params) => <DeleteStaff {...{ params, deletedId, Id }} />,
      //   editable: true,
      // },
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
