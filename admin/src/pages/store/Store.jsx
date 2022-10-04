import React from "react";
import "./store.css";
import TopBar from "../../components/topbar/TopBar";
import Sidebar from "../../components/sidebar/Sidebar";
import Widget from "../../components/Widget/Widget";
import Charts from "../../components/Charts/Charts";
import Table from "../../components/table/Table";
import TotalBooking from "../../components/total/TotalBooking";

export default function Store() {
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
              <span className="span-chart"> Sales Value</span>
              <div className="value-chart">
                <div className="left-value">$1000.212</div>
                <div className="right-value">
                  <button className="button-week">Week</button>
                  <button className="button-month">Month</button>
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
