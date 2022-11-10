import React, { useState, useEffect, useMemo } from "react";
import "../../styles/receipt.css";
import TopBar from "../../components/topbar/TopBar";
import Sidebar from "../../components/sidebar/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { ImMan } from "react-icons/im";

export default function Receipt() {
  const [staff, setStaff] = useState([]);
  const [service, setService] = useState([]);
  const [nameStaff, setNameStaff] = useState("");

  const [showService, setShowService] = useState(false);
  const [step1, setStep1] = useState(false);
  const [nameService, setNameService] = useState([]);

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
    setStep1(true);
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
                name="Name"
                placeholder="Name"
              />
            </div>
            <div className="item-receipt">
              <input
                type="number"
                className="input-receipt"
                name="Telephone"
                placeholder="Telephone"
              />
            </div>
            <div className="item-receipt">
              <input
                type="text"
                className="input-receipt"
                name="Email"
                placeholder="Email"
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
            <div
              className="item-receipt"
              onClick={() => {
                setShowService(true);
              }}
            >
              {step1 ? <span> {nameService}</span> : "View all services"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
