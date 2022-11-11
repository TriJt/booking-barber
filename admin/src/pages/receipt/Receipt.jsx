import React, { useState, useEffect, useMemo } from "react";
import "../../styles/receipt.css";
import TopBar from "../../components/topbar/TopBar";
import Sidebar from "../../components/sidebar/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { TiDeleteOutline } from "react-icons/ti";
import { IoIosCloseCircleOutline } from "react-icons/io";
import moment from "moment";
import TableUser from "../../components/table/table-custom/TableUser";
import { Avatar } from "@mui/material";

export default function Receipt() {
  const [dataReceipt, setDataReceipt] = useState([]);
  const [staff, setStaff] = useState([]);
  const [service, setService] = useState([]);
  const [nameStaff, setNameStaff] = useState("");
  const [discount, setDiscount] = useState();
  const [nameService, setNameService] = useState([]);
  const [telephone, setTelephone] = useState("");
  const [bill, setBill] = useState("");
  const [showBill, setShowBill] = useState(false);

  // get date now
  const current = new Date();
  const start = `${current.getFullYear()}-${
    current.getMonth() + 1
  }-${current.getDate()}`;

  const end = `${current.getFullYear()}-${current.getMonth() + 1}-${
    current.getDate() + 1
  }`;

  const [inputField, setInputField] = useState({
    Name_Customer: "",
    Email: "",
  });
  const InputHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };
  const onChangTelephone = (e) => {
    setTelephone(e.target.value.slice(0, 11));
  };
  const OnChangeDiscount = (e) => {
    setDiscount(e.target.value);
  };

  // fetch receipt for a day
  useEffect(() => {
    const data = {
      Start: start,
      End: end,
    };
    const fetchReceiptForADay = async () => {
      const res = await axios.post(
        "http://localhost:8800/api/receipt/list/date",
        data
      );
      setDataReceipt(res.data.value);
    };
    fetchReceiptForADay();
  }, []);

  console.log(dataReceipt);

  useEffect(() => {
    const fetchStaff = async () => {
      const res = await axios.get("http://localhost:8800/api/staff/all");
      setStaff(res.data.value);
    };
    fetchStaff();
    // fetService

    const fetchService = async () => {
      const res = await axios.get("http://localhost:8800/api/service/all");
      setService(res.data.value);
    };
    fetchService();
  }, []);

  const handleStaff = async (e) => {
    setNameStaff(e.target.value);
  };

  const handleServices = async (name) => {
    setNameService([...nameService, name]);
  };

  const handelDeleteService = async (value) => {
    const new_Arr = nameService.filter((item) => item !== value);
    setNameService(new_Arr);
  };

  const resetForm = () => {
    setNameService([]);
    setNameStaff("");
    setDiscount("");
    setInputField({
      Name_Customer: "",
      Email: "",
    });
    setTelephone("");
  };

  const submitReceipt = async (e) => {
    e.preventDefault();
    const data = {
      Name_Customer: inputField.Name_Customer,
      Telephone: telephone,
      Email: inputField.Email,
      Staff_Name: nameStaff,
      Services: nameService,
      Discount: discount,
    };

    try {
      const res = await axios.post(
        "http://localhost:8800/api/receipt/add",
        data
      );

      setBill(res.data.value);
      setShowBill(true);
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

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
    ],
    []
  );

  return (
    <div className="container">
      <ToastContainer />
      <div className="left-container">
        <Sidebar />
      </div>
      {/* container for topBar and mainBar */}
      <div className="right-container">
        <div className="top-container">
          <TopBar />
        </div>
        <div className="receipt-container">
          <div className="left-receipt">
            {showBill ? (
              <div className="show-bill">
                <div className="exit" onClick={() => setShowBill(false)}>
                  <IoIosCloseCircleOutline />
                </div>
                <div className="header-bill">Welcome to BARBERJT</div>
                <div div className="items-bill">
                  <div className="item-bill">
                    <span className="title-bill">Name : </span>
                    <span className="value-bill">{bill.Name_Customer}</span>
                  </div>
                  <div className="item-bill">
                    <span className="title-bill">Telephone: </span>
                    <span className="value-bill"> {bill.Telephone} </span>
                  </div>
                  <div className="item-bill">
                    <span className="title-bill"> Email: </span>
                    <span className="value-bill">{bill.Email} </span>
                  </div>
                  <div className="item-bill">
                    <span className="title-bill">Staff:</span>
                    <span className="value-bill"> {bill.Staff_Name} </span>
                  </div>
                  <div className="item-bill">
                    <span className="title-bill"> Sum price:</span>
                    <span className="value-bill">{bill.SumPrice} </span>
                  </div>
                  <div className="item-bill">
                    <span className="title-bill">Discount: </span>
                    <span className="value-bill"> {bill.Discount} </span>
                  </div>

                  <div className="item-bill">
                    <span className="title-bill">Total: </span>
                    <span className="value-bill">{bill.Total} </span>
                  </div>
                  <div className="item-bill">
                    <span className="title-bill">Date: </span>
                    <span className="value-bill">
                      {moment(bill.createdAt).format("DD-MM-yyyy")}
                    </span>
                  </div>
                  <span className="thank-bill">
                    Thank you for using our service
                  </span>
                </div>
              </div>
            ) : (
              <div className="show-service-booking">
                <div className="header-receipt">Service</div>

                <div className="grid-service">
                  {service.map((services, i) => (
                    <div
                      key={i}
                      className="items-service-booking"
                      onClick={() => {
                        handleServices(services.Name_Service);
                      }}
                    >
                      <span> {services.Name_Service}</span>
                      <span> {services.Price}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="right-receipt">
            <div className="header-receipt">Create new Receipt</div>
            <div className="item-receipt">
              <input
                type="text"
                className="input-receipt"
                name="Name_Customer"
                placeholder="Name"
                value={inputField.Name_Customer}
                onChange={InputHandler}
              />
            </div>
            <div className="item-receipt">
              <input
                type="number"
                className="input-receipt"
                placeholder="Telephone"
                value={telephone}
                onChange={onChangTelephone}
              />
            </div>
            <div className="item-receipt">
              <input
                type="text"
                className="input-receipt"
                name="Email"
                placeholder="Email"
                value={inputField.Email}
                onChange={InputHandler}
              />
            </div>
            <div className="item-receipt">
              <select
                type="text"
                className="input-receipt"
                placeholder="Staff"
                name="StaffId"
                onChange={handleStaff}
              >
                {staff.map((value, i) => (
                  <option value={value.Name} key={i}>
                    {value.Name}
                  </option>
                ))}
              </select>
            </div>
            <div className="item-receipt">
              {nameService.length >= 1 ? (
                <div className="list-service">
                  {nameService.map((value, i) => (
                    <div className="item-service-receipt" key={i}>
                      <span> {value} </span>
                      <span>
                        <TiDeleteOutline
                          onClick={() => {
                            handelDeleteService(value);
                          }}
                        />
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                "View all services"
              )}
            </div>
            <div className="item-receipt">
              <input
                type="number"
                className="input-receipt"
                placeholder="Discount"
                value={discount}
                onChange={OnChangeDiscount}
              />
            </div>
            <div className="button-receipt">
              <button className="button-action" onClick={submitReceipt}>
                {" "}
                Create{" "}
              </button>
            </div>
          </div>
        </div>
        <div className="bottom-receipt">
          <TableUser
            title={"list receipt"}
            column={columns}
            row={dataReceipt}
          />
        </div>
      </div>
    </div>
  );
}
