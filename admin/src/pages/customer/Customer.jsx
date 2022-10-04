import React from "react";
import "./customer.css";
import TopBar from "../../components/topbar/TopBar";
import Sidebar from "../../components/sidebar/Sidebar";

export default function Customer() {
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
                <div className="left-value">10</div>
                <div className="right-value">
                  <button className="button-week">Week</button>
                  <button className="button-month">Month</button>
                </div>
              </div>
            </div>
            {/* make charts to show how many customer sign in in week and month */}
            <div className="bottom-chart">{/* <Charts /> */}</div>
          </div>
          <div className="under-bottom">
            <div className="table-container">{/* <Table /> */}</div>
            <div className="total-container ">{/* <TotalBooking /> */}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
