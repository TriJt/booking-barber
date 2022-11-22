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
  const [data, setData] = useState([]);
  const [rowId, setRowId] = useState("");
  const [dataRange, setDataRange] = useState([]);
  const [open, setOpen] = useState(false);
  const [dataMonthCurrent, setDataMonthCurrent] = useState([]);
  const [dataPrevious, setDataMonthPrevious] = useState([]);

  const [dateStart, setDateStart] = useState(moment().format("yyyy-MM-DD"));
  const [dateEnd, setDateEnd] = useState(
    moment(new Date()).format("yyyy-MM-DD")
  );
  // current date
  const [step1, setStep1] = useState(false);
  // current week
  const [step2, setStep2] = useState(true);
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
    setOpen(true);
  };

  const handleStep4 = () => {
    setStep2(false);
    setStep1(false);
    setStep4(true);
    setStep3(false);
  };

  // current date
  const current = new Date();

  // date for current month
  const startDateCurrent = `${current.getFullYear()}-${
    current.getMonth() + 1
  }-${current.getDate()}`;

  const endDateCurrent = `${current.getFullYear()}-${
    current.getMonth() + 1
  }-${current.getDate()}`;

  // date for previous month
  const startMonth = `${current.getFullYear()}-${current.getMonth()}-01`;

  const endMonth = `${current.getFullYear()}-${current.getMonth()}-30`;

  useEffect(() => {
    const fetchMonthCurrent = async () => {
      const data = {
        Start: startDateCurrent,
        End: endDateCurrent,
      };
      const res = await axios.post(
        "http://localhost:8800/api/salary/month",
        data
      );
      setDataMonthCurrent(res.data.value);
    };
    fetchMonthCurrent();

    // fetch data for previous month
    const fetchMonthPrevious = async () => {
      const data = {
        Start: startMonth,
        End: endMonth,
      };
      const res = await axios.post(
        "http://localhost:8800/api/salary/month",
        data
      );
      setDataMonthPrevious(res.data.value);
    };
    fetchMonthPrevious();
  }, []);

  const DateStartHandle = async (e) => {
    setDateStart(moment(new Date(e.target.value)).format("YYYY-MM-DD"));
  };

  const DateEndHandle = async (e) => {
    setDateEnd(moment(new Date(e.target.value)).format("YYYY-MM-DD"));
    handleStep4();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8800/api/appointment/all"
        );
        setData(res.data.value);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const submitHandle = async () => {
    try {
      const data = {
        Start: dateStart,
        End: dateEnd,
      };

      const res = await axios.post(
        "http://localhost:8800/api/salary/month",
        data
      );
      setDataRange(res.data.value);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = useMemo(
    () => [
      {
        field: "Name",
        headerName: "Name",
        width: 200,
        editable: true,
      },
      {
        field: "Status",
        headerName: "Status",
        width: 90,
        editable: true,
        type: "singleSelect",
        valueOptions: ["Paid", "Unpaid"],
      },
      {
        field: "Date",
        headerName: "Date",
        width: 150,
      },
      {
        field: "Salary",
        headerName: "Salary",
        width: 130,
        editable: true,
        type: Number,
      },
      {
        field: "Allowance",
        headerName: "Allowance",
        width: 130,
        editable: true,
        type: Number,
      },

      {
        field: "Total",
        headerName: "Total",
        width: 130,
        type: Number,
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
                {step1 ? (
                  <React.Fragment>
                    <button
                      className="button-action"
                      onClick={handleStep1}
                      style={{ backgroundColor: "#bf925b", color: "white" }}
                    >
                      add salary
                    </button>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <button onClick={handleStep1} className="button-action">
                      add salary
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
                      current date
                    </button>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <button className="button-action" onClick={handleStep2}>
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
                      current week
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
              {/* {step3 ? <ModalSalary open={open} /> : null} */}
              {step2 ? (
                <TableUser
                  title={"Manager Appointment"}
                  column={columns}
                  row={dataPrevious}
                  rowId={rowId}
                  setRowId={setRowId}
                />
              ) : null}
              {step3 ? (
                <TableUser
                  title={"Manager Appointment"}
                  column={columns}
                  row={dataMonthCurrent}
                  rowId={rowId}
                  setRowId={setRowId}
                />
              ) : null}

              {step4 ? (
                <TableUser
                  title={"Manager Appointment"}
                  column={columns}
                  row={dataRange}
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
