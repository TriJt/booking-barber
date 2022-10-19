import React, { useState, useMemo, useEffect } from "react";
import "./customer.css";
import TopBar from "../../components/topbar/TopBar";
import Sidebar from "../../components/sidebar/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableUser from "../../components/table/table-custom/TableUser";
import axios from "axios";
import { SaveStaff } from "../../action/SaveAction";
import { DeleteStaff } from "../../action/DeleteAction";
import { Avatar } from "@mui/material";
// icon
import BadgeIcon from "@mui/icons-material/Badge";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import ManIcon from "@mui/icons-material/Man";

export default function Customer() {
  // input for table
  const [dataCustomer, setDataCustomer] = useState("");
  const [rowId, setRowId] = useState(null);
  const [count, setCount] = useState("");

  // create new customer
  const [inputField, setInputField] = useState({
    Name_Customer: "",
    Telephone: "",
    Email: "",
    Gender: "",
  });

  const [errField, setErrField] = useState({
    EmailErr: "",
    NameErr: "",
  });

  const InputHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  // update information
  const submitHandler = async (e) => {
    e.preventDefault();
    const staff = {
      Name_Customer: inputField.Name_Customer,
      Telephone: inputField.Telephone,
      Email: inputField.Email,
      Gender: inputField.Gender,
    };
    try {
      const response = await axios.post(
        "http://localhost:8800/api/customer/create",
        staff
      );
      const record = response.data;
      if (record.statusText === "Success") {
        toast.success(record.message);
      } else {
        toast.error(record.message);
      }
    } catch (err) {
      toast.error("Somethings went wrong");
    }
  };

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
        renderCell: (params) => <DeleteStaff {...{ params }} />,
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
            <div className="staff">
              <ToastContainer />
              <TableUser
                title={"Manager Staff"}
                column={columns}
                row={dataCustomer}
                rowId={rowId}
                setRowId={setRowId}
              />
            </div>
          </div>
          <div className="staff-bottom">
            <div className="left-staff">
              <h3 className="create-staff"> Create New Customer</h3>
              <form action="submit">
                <div className="items-profile">
                  <div className="input-container-address">
                    <span className="icon-input">
                      <BadgeIcon />
                    </span>
                    <input
                      className="input-address"
                      name="Name_Customer"
                      autoComplete="off"
                      onChange={InputHandler}
                      required
                      value={inputField.Name_Customer}
                      type="text"
                      placeholder="Name"
                    />
                  </div>
                </div>
                <div className="items-profile">
                  <div className="input-container-address">
                    <span className="icon-input">
                      <CallIcon />
                    </span>
                    <input
                      className="input-address"
                      name="Telephone"
                      autoComplete="off"
                      onChange={InputHandler}
                      required
                      value={inputField.Telephone}
                      type="text"
                      placeholder="Telephone"
                      minLength={10}
                      maxLength={11}
                    />
                  </div>
                </div>
                <div className="items-profile">
                  <div className="input-container-address">
                    <span className="icon-input">
                      <EmailIcon />
                    </span>
                    <input
                      className="input-address"
                      name="Email"
                      autoComplete="off"
                      onChange={InputHandler}
                      required
                      value={inputField.Email}
                      type="email"
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div className="items-profile">
                  <div className="input-container-address">
                    <span className="icon-input">
                      <ManIcon />
                    </span>
                    <select
                      name="Gender"
                      id="select-new"
                      className="input-address"
                      onChange={InputHandler}
                      value={inputField.Gender}
                      placeholder="Gender"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other genders">Other genders</option>
                    </select>
                  </div>
                </div>

                <div className="action-profile">
                  <button className="save" onClick={submitHandler}>
                    Create
                  </button>
                </div>
              </form>
            </div>
            <div className="right-staff"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
