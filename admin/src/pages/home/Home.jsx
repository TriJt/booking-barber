import "../../styles/home.css";
import React, { useState, useEffect, useContext } from "react";
import TopBar from "../../components/topbar/TopBar";
import Sidebar from "../../components/sidebar/Sidebar";
import Widget from "../../components/Widget/Widget";
import Charts from "../../components/Charts/Charts";
import Table from "../../components/table/Table";
import TotalBooking from "../../components/total/TotalBooking";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Home() {
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(currentUser);
  const [revenue, setRevenue] = useState();
  const current = new Date();
  const start = `${current.getFullYear()}-${current.getMonth() + 1}-01`;

  const end = `${current.getFullYear()}-${current.getMonth() + 1}-30`;

  useEffect(() => {
    const fetchData = async () => {
      const data = {
        Start: start,
        End: end,
      };
      const res = await axios.post(
        "http://localhost:8800/api/receipt/Choose",
        data
      );
      const value = res.data;
      setRevenue(value);
    };
    fetchData();
  });

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
          <Widget />
          <div className="chart-container">
            <div className="top-chart">
              <span className="header-receipt"> Revenue</span>
              <div className="value-chart">
                <div className="left-value">{revenue}$</div>
                <div className="right-value">
                  <button
                    className="button-action"
                    style={{ backgroundColor: "#bf925b", color: "white" }}
                  >
                    Month
                  </button>
                </div>
              </div>
            </div>
            <div className="bottom-chart">
              <Charts />
            </div>
          </div>
          <div className="under-bottom">
            <div className="table-container">
              <Table />
            </div>
            <div className="total-container ">
              <TotalBooking />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
