import React, { useState, useMemo, useEffect } from "react";
import "./customer.css";
import TopBar from "../../components/topbar/TopBar";
import Sidebar from "../../components/sidebar/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableUser from "../../components/table/table-custom/TableUser";
import axios from "axios";
import { Avatar } from "@mui/material";
import { MdDeleteOutline, MdSaveAlt, MdViewHeadline } from "react-icons/md";
import { MdDriveFileRenameOutline, MdOutlineEmail } from "react-icons/md";
import {
  BsTelephoneForward,
  BsGenderAmbiguous,
  BsCollection,
} from "react-icons/bs";
import { FaRegAddressCard, FaBirthdayCake } from "react-icons/fa";

export default function Customer() {
  // input for table
  const [dataCustomer, setDataCustomer] = useState("");
  const [rowId, setRowId] = useState("");
  const [count, setCount] = useState("");
  const [open, setOpen] = useState(false);

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

  const Delete = ({ params }) => {
    const handleDelete = async (e) => {
      const data = params.row._id;
      const response = await axios.delete(
        "http://localhost:8800/api/customer/delete/" + data
      );
      const fetchData = await axios.get(
        "http://localhost:8800/api/customer/all"
      );

      const record = response.data;
      if (record.status === 200) {
        toast.success("Delete information successfully");
        setDataCustomer(fetchData.data.value);
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
      setTimeout(async () => {
        const data = {
          CustomerId: params.row._id,
          Name: params.row.Name,
          Telephone: params.row.Telephone,
          Gender: params.row.Gender,
        };
        const response = await axios.put(
          "http://localhost:8800/api/customer/update/" + rowId,

          data
        );
        const record = response.data;
        if (record.statusText === "Success") {
          toast.success("Update information successfully");
        } else {
          toast.error("Delete information failed");
        }
      }, 500);
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

  const View = ({ params, rowId, setRowId }) => {
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
          "http://localhost:8800/api/customer?CustomerId=" + rowId
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
                name="Name_Customer"
                value={data.Name_Customer}
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

            <div className="items-value">
              <span className="icon-value">
                <BsCollection />
              </span>
              <input
                type="text"
                className="text-value"
                placeholder="Collect"
                name="Collect"
                value={data.Collect}
              />
            </div>
          </div>
        </div>
      </div>
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
        field: "Collect",
        header: "Collection",
        width: 90,
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
