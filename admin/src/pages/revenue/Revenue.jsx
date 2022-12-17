import React, { useState, useEffect } from "react";
import TopBar from "../../components/topbar/TopBar";
import Sidebar from "../../components/sidebar/Sidebar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../../styles/revenue.css";
import axios from "axios";
import moment from "moment";

export default function Revenue() {
  const [dataRange, setDataRange] = useState([]);
  const [dataMonth, setDataMonth] = useState([]);
  const [dataWeek, setDataWeek] = useState([]);
  const [dataYear, setDataYear] = useState([]);
  const [dateStart, setDateStart] = useState(moment().format("yyyy-MM-DD"));
  const [dateEnd, setDateEnd] = useState(
    moment(new Date()).format("yyyy-MM-DD")
  );
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
  const [step4, setStep4] = useState(false);

  const current = new Date();
  // date in week
  const start_week = `${current.getFullYear()}-${current.getMonth() + 1}-${
    current.getDate() - 6
  }`;

  const end_week = `${current.getFullYear()}-${current.getMonth() + 1}-${
    current.getDate() + 1
  }`;

  // date month
  const start_month = `${current.getFullYear()}-${current.getMonth() + 1}-01`;

  const end_month = `${current.getFullYear()}-${current.getMonth() + 1}-30`;

  useEffect(() => {
    // fetch data week
    const data = {
      Start: start_week,
      End: end_week,
    };
    const fetchWeek = async () => {
      const res = await axios.post(
        "http://localhost:8800/api/receipt/week",
        data
      );
      setDataWeek(res.data.value);
    };
    fetchWeek();

    // fetch data month
    const dataMonth = {
      Start: start_month,
      End: end_month,
    };
    const fetchMonth = async () => {
      const res = await axios.post(
        "http://localhost:8800/api/receipt/week",
        dataMonth
      );
      setDataMonth(res.data.value);
    };
    fetchMonth();

    // fetch data year
    const fetchYear = async () => {
      const res = await axios.get(
        "http://localhost:8800/api/receipt/month",
        data
      );
      setDataYear(res.data.value);
    };
    fetchYear();
  }, []);

  const Chart = ({ data }) => {
    return (
      <div className="chart">
        <ResponsiveContainer width="100%" height="100%" textSize={11}>
          <BarChart
            width={300}
            height={100}
            data={data}
            margin={{ top: 20, right: 5, left: 5, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Bar
              type="monotone"
              dataKey="totalAmount"
              stroke="#bf925b"
              fill="#bf925b"
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const handleStep1 = () => {
    setStep1(true);
    setStep2(false);
    setStep3(false);
    setStep4(false);
  };
  const handleStep2 = () => {
    setStep2(true);
    setStep1(false);
    setStep3(false);
    setStep4(false);
  };
  const handleStep3 = () => {
    setStep2(false);
    setStep1(false);
    setStep3(true);
    setStep4(false);
  };

  const handleStep4 = () => {
    setStep2(false);
    setStep1(false);
    setStep4(true);
    setStep3(false);
  };

  const DateStartHandle = async (e) => {
    setDateStart(moment(new Date(e.target.value)).format("YYYY-MM-DD"));
  };

  const DateEndHandle = async (e) => {
    setDateEnd(moment(new Date(e.target.value)).format("YYYY-MM-DD"));
    handleStep4();
    submitHandle();
  };
  const submitHandle = async () => {
    try {
      const data = {
        Start: dateStart,
        End: dateEnd,
      };
      console.log(data);
      const res = await axios.post(
        "http://localhost:8800/api/receipt/week",
        data
      );
      setDataRange(res.data.value);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="left-container">
        <Sidebar />
      </div>
      {/* container for topBar and mainBar */}
      <div className="right-container">
        <div className="top-container">
          <TopBar />
        </div>
        <div className="revenue-container">
          <div className="choose-chart">
            <div className="header-revenue">
              <span> chart of store revenue</span>
            </div>
            <div className="button-revenue">
              {step1 ? (
                <React.Fragment>
                  <button
                    className="button-action"
                    onClick={handleStep1}
                    style={{ backgroundColor: "#bf925b", color: "white" }}
                  >
                    day of the week
                  </button>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <button className="button-action" onClick={handleStep1}>
                    day of the week
                  </button>
                </React.Fragment>
              )}
              {step2 ? (
                <React.Fragment>
                  <button
                    className="button-action"
                    onClick={handleStep2}
                    style={{ backgroundColor: "#bf925b", color: "white" }}
                  >
                    Day in month
                  </button>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <button onClick={handleStep2} className="button-action">
                    Day in month
                  </button>
                </React.Fragment>
              )}
              {step3 ? (
                <React.Fragment>
                  <button
                    onClick={handleStep3}
                    style={{ backgroundColor: "#bf925b", color: "white" }}
                    className="button-action"
                  >
                    Year
                  </button>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <button className="button-action" onClick={handleStep3}>
                    Year
                  </button>
                </React.Fragment>
              )}
              {step4 ? (
                <React.Fragment>
                  <input
                    type="date"
                    className="input-date"
                    max={dateEnd}
                    value={moment(dateStart).format("yyyy-MM-DD")}
                    onChange={DateStartHandle}
                    style={{ backgroundColor: "#bf925b", color: "white" }}
                  ></input>
                  <input
                    type="date"
                    className="input-date"
                    value={moment(dateEnd).format("yyyy-MM-DD")}
                    onChange={DateEndHandle}
                    style={{ backgroundColor: "#bf925b", color: "white" }}
                  ></input>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <input
                    type="date"
                    className="input-date"
                    max={dateEnd}
                    value={moment(dateStart).format("yyyy-MM-DD")}
                    onChange={DateStartHandle}
                  ></input>

                  <input
                    type="date"
                    className="input-date"
                    value={moment(dateEnd).format("yyyy-MM-DD")}
                    onChange={DateEndHandle}
                  ></input>
                </React.Fragment>
              )}
            </div>
          </div>
          <div className="charts-container">
            {step1 ? <Chart data={dataWeek} /> : null}
            {step2 ? <Chart data={dataMonth} /> : null}
            {step3 ? <Chart data={dataYear} /> : null}
            {step4 ? <Chart data={dataRange} /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
