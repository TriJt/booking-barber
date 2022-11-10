import React, { useState, useEffect, useMemo } from "react";
import "../../styles/receipt.css";
import TopBar from "../../components/topbar/TopBar";
import Sidebar from "../../components/sidebar/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { ImMan } from "react-icons/im";
import { TiDeleteOutline } from "react-icons/ti";
export default function Receipt() {
  const [staff, setStaff] = useState([]);
  const [service, setService] = useState([]);
  const [nameStaff, setNameStaff] = useState("");
  const [showService, setShowService] = useState(false);
  const [discount, setDiscount] = useState();
  const [nameService, setNameService] = useState([]);
  const [telephone, setTelephone] = useState("");

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

  const submitReceipt = async (e) => {
    e.preventDeafault();
    const data = {
      Name_Customer: inputField.Name_Customer,
      Telephone: inputField.Telephone,
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
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

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
            <div className="show-service-booking">
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
                name="Telephone"
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
              <button className="button-action"> Create </button>
            </div>
          </div>
          <div className="bottom-receipt"></div>
        </div>
      </div>
    </div>
  );
}
