import React, { useState, useMemo, useEffect } from "react";
import "./customer.css";
import TopBar from "../../components/topbar/TopBar";
import Sidebar from "../../components/sidebar/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableUser from "../../components/table/table-custom/TableUser";
import axios from "axios";
import { SaveStaff } from "../../action/SaveAction";

import { Avatar } from "@mui/material";

import { red } from "@mui/material/colors";
// icon
import { Box, CircularProgress, Fab } from "@mui/material";
import { Check, Save, Delete } from "@mui/icons-material";

export default function Customer() {
  // input for table
  const [dataCustomer, setDataCustomer] = useState("");
  const [rowId, setRowId] = useState(null);
  const [count, setCount] = useState("");

  //effect data of customer from data
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/customer/all");
        setDataCustomer(res.data.value);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCustomer();
  }, []);

  // effect count customer from data
  useEffect(() => {
    const countCustomer = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/customer/count");
        setCount(res.data.value);
      } catch (error) {
        console.log(error);
      }
    };
    countCustomer();
  }, []);

  const Delete = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async () => {
      setLoading(true);
      setTimeout(async () => {
        const data = {
          StaffId: rowId,
        };
        const response = await axios.put(
          "http://localhost:8800/api/customer/delete/" + rowId,
          data
        );
        const record = response.data;
        console.log(rowId);
        if (record.statusText === "Success") {
          setSuccess(true);
        }
        setLoading(false);
      }, 500);
    };
    return (
      <Box
        sx={{
          m: 1,
          position: "relative",
        }}
      >
        {success ? (
          <Fab
            color="primary"
            sx={{
              width: 40,
              height: 40,
              backgroundColor: red[700],
              "&hover": { backgroundColor: red[700] },
            }}
          >
            <Check />
          </Fab>
        ) : (
          <Fab
            color="error"
            sx={{
              width: 40,
              height: 40,
            }}
            onClick={() => {
              if (window.confirm("Delete this staff?")) {
                handleSubmit();
              }
            }}
          >
            <Delete />
          </Fab>
        )}
        {loading && (
          <CircularProgress
            size={52}
            sx={{
              color: red[500],
              position: "absolute",
              top: -6,
              left: -6,
              zIndex: 1,
            }}
          />
        )}
      </Box>
    );
  };

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
        field: "Name_Customer",
        headerName: "Name",
        width: 160,
        editable: true,
      },
      {
        field: "Telephone",
        header: "Telephone",
        width: 120,
        editable: true,
      },
      {
        field: "Email",
        header: "Email",
        width: 220,
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
        field: "save",
        width: 80,
        headerName: "Save",
        type: "actions",
        renderCell: (params) => <SaveStaff {...{ params, rowId, setRowId }} />,
        editable: true,
      },
      {
        field: "delete",
        width: 80,
        headerName: "Delete",
        type: "actions",
        renderCell: () => <Delete />,
        editable: true,
      },

      {
        field: "view",
        width: 80,
        headerName: "All View",
        type: "actions",
        // renderCell: (params) => <DeleteStaff {...{ params }} />,
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
        <ToastContainer />
        <div className="top-container">
          <TopBar />
        </div>
        <div className="bottom-container">
          {/* <Widget /> */}
          <div className="chart-container">
            <div className="top-chart">
              <span className="span-chart"> Customer</span>
              <div className="value-chart">
                {/* count customer from database */}
                <div className="left-value">{count}</div>
                {/* change count customer with week and month */}
                <div className="right-value">
                  <button className="button-week">Week</button>
                  <button className="button-month">Month</button>
                </div>
              </div>
            </div>
            {/* make charts to show how many customer sign in in week and month */}
          </div>
          <div className="bottom-profile">
            <div className="customer-table">
              <TableUser
                title={"Manager Customer"}
                column={columns}
                row={dataCustomer}
                rowId={rowId}
                setRowId={setRowId}
              />
            </div>
          </div>
          <div className="customer-bottom"></div>
        </div>
      </div>
    </div>
  );
}
