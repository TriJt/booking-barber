import React, { useState, useMemo, useEffect } from "react";
import "../../styles/customer.css";
import TopBar from "../../components/topbar/TopBar";
import Sidebar from "../../components/sidebar/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableUser from "../../components/table/table-custom/TableUser";
import axios from "axios";
import { Avatar } from "@mui/material";
import { MdDeleteOutline, MdSaveAlt, MdViewHeadline } from "react-icons/md";
import ModalCustomer from "../../components/Modal/ModalCustomer";

export default function Customer() {
  const [dataCustomer, setDataCustomer] = useState([]);
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
        if (record.status === 200) {
          toast.success("Update information successfully");
        } else {
          toast.error("Update information failed");
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

  const View = ({ params, setRowId }) => {
    const submitHandle = () => {
      setOpen(true);
      setRowId(params.row._id);
    };

    return (
      <div className="view">
        <button className="button-view" onClick={submitHandle}>
          <MdViewHeadline className="icon-view" />
        </button>
      </div>
    );
  };

  const columns = useMemo(
    () => [
      {
        field: "Image",
        header: "Avatar",
        width: 60,
        renderCell: (params) => <Avatar src={params.row.Image[0]} />,
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
      <ModalCustomer open={open} onClose={() => setOpen(false)} rowId={rowId} />
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
