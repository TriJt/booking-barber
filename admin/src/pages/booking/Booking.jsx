import React, { useState, useEffect, useMemo } from "react";
import "../../styles/booking.css";
import TopBar from "../../components/topbar/TopBar";
import Sidebar from "../../components/sidebar/Sidebar";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableUser from "../../components/table/table-custom/TableUser";
import axios from "axios";

export default function Booking() {
  const [rowId, setRowId] = useState("");
  // current date
  const current = new Date();
  const currentDate = `${current.getFullYear()}-${
    current.getMonth() + 1
  }-${current.getDate()}`;

  // data current day
  const [dataDayCurrent, setDataDayCurrent] = useState([]);
  //data previous day
  const previousDate = `${current.getFullYear()}-${current.getMonth() + 1}-${
    current.getDate() - 1
  }`;
  const [dataDayPrevious, setDataDayPrevious] = useState([]);
  // data current month
  const [dataCurrentMonth, setDataCurrentMonth] = useState([]);
  // data list range date
  const [dataDayRange, setDataDayRange] = useState([]);
  // date start and date end of range date
  const [dateStart, setDateStart] = useState(moment().format("yyyy-MM-DD"));
  const [dateEnd, setDateEnd] = useState(moment().format("yyyy-MM-DD"));
  // current date
  const [step1, setStep1] = useState(true);
  // current week
  const [step2, setStep2] = useState(false);
  // current month
  const [step3, setStep3] = useState(false);

  const [step4, setStep4] = useState(false);

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

  // date for previous month

  const start = `${current.getFullYear()}-${current.getMonth() + 1}-01`;

  const end = `${current.getFullYear()}-${current.getMonth() + 1}-30`;

  useEffect(() => {
    //fetch data of current date
    const fetchDayCurrent = async () => {
      const data = {
        date: currentDate,
      };

      const res = await axios.post(
        "http://localhost:8800/api/appointment/all-pending",
        data
      );
      setDataDayCurrent(res.data.value);
    };
    fetchDayCurrent();
  }, []);

  useEffect(() => {
    // fetch data for previous date
    const fetchDatePrevious = async () => {
      const data = {
        date: previousDate,
      };

      const res = await axios.post(
        "http://localhost:8800/api/appointment/all-pending",
        data
      );
      setDataDayPrevious(res.data.value);
    };
    fetchDatePrevious();
  }, []);

  useEffect(() => {
    // fetch current month
    const fetchCurrentMonth = async () => {
      const data = {
        Start: start,
        End: end,
      };

      const res = await axios.post(
        "http://localhost:8800/api/appointment/time-range",
        data
      );

      setDataCurrentMonth(res.data.value);
    };
    fetchCurrentMonth();
  }, []);

  console.log(currentDate);
  console.log(typeof dataCurrentMonth);
  console.log(typeof dataCurrentDay);
  console.log(typeof dataDayPrevious);

  const DateStartHandle = async (e) => {
    setDateStart(moment(new Date(e.target.value)).format("YYYY-MM-DD"));
  };

  const DateEndHandle = async (e) => {
    setDateEnd(moment(new Date(e.target.value)).format("YYYY-MM-DD"));
    handleStep4();
  };

  const submitHandle = async () => {
    try {
      const data = {
        Start: dateStart,
        End: dateEnd,
      };

      const res = await axios.post(
        "http://localhost:8800/api/appointment/time-range",
        data
      );
      setDataDayRange(res.data.value);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = useMemo(
    () => [
      {
        field: "NameCustomer",
        headerName: "Name",
        width: 120,
        editable: true,
      },
      {
        field: "TelephoneCustomer",
        headerName: "Telephone",
        width: 90,
        editable: true,
      },
      {
        field: "Email",
        headerName: "Email",
        width: 160,
        editable: true,
      },
      {
        field: "Status",
        headerName: "Status",
        width: 90,
        type: "singleSelect",
        valueOptions: ["Paid", "Unpaid"],
      },
      {
        field: "date",
        headerName: "Date",
        width: 100,
      },
      {
        field: "slotTime",
        headerName: "Time",
        width: 80,
        editable: true,
      },
      {
        field: "Services",
        headerName: "Services",
        width: 130,
        editable: true,
      },

      {
        field: "Staff",
        headerName: "Staff",
        width: 100,
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
          <ToastContainer />

          <div className="revenue-container">
            <div className="choose-chart">
              <div className="header-revenue">
                <span> Table of booking</span>
              </div>
              <div className="button-revenue">
                {step2 ? (
                  <React.Fragment>
                    <button
                      className="button-action"
                      onClick={handleStep2}
                      style={{ backgroundColor: "#bf925b", color: "white" }}
                    >
                      previous date
                    </button>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <button onClick={handleStep2} className="button-action">
                      previous date
                    </button>
                  </React.Fragment>
                )}
                {step1 ? (
                  <React.Fragment>
                    <button
                      className="button-action"
                      onClick={handleStep1}
                      style={{ backgroundColor: "#bf925b", color: "white" }}
                    >
                      current date
                    </button>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <button className="button-action" onClick={handleStep1}>
                      current date
                    </button>
                  </React.Fragment>
                )}
                {step3 ? (
                  <React.Fragment>
                    <button
                      className="button-action"
                      onClick={handleStep3}
                      style={{ backgroundColor: "#bf925b", color: "white" }}
                    >
                      current month
                    </button>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <button onClick={handleStep3} className="button-action">
                      current month
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
                    <button className="button-action" onClick={submitHandle}>
                      {" "}
                      Submit
                    </button>
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
              {step1 ? (
                <TableUser
                  title={"Manager Appointment"}
                  column={columns}
                  row={dataDayCurrent}
                  rowId={rowId}
                  setRowId={setRowId}
                />
              ) : null}
              {step2 ? (
                <TableUser
                  title={"Manager Appointment"}
                  column={columns}
                  row={dataDayPrevious}
                  rowId={rowId}
                  setRowId={setRowId}
                />
              ) : null}

              {step3 ? (
                <TableUser
                  title={"Manager Appointment"}
                  column={columns}
                  row={dataCurrentMonth}
                  rowId={rowId}
                  setRowId={setRowId}
                />
              ) : null}
              {step4 ? (
                <TableUser
                  title={"Manager Appointment"}
                  column={columns}
                  row={dataDayRange}
                  rowId={rowId}
                  setRowId={setRowId}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
