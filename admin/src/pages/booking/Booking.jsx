import React, { useState, useEffect, useMemo } from "react";
import "../../styles/booking.css";
import TopBar from "../../components/topbar/TopBar";
import Sidebar from "../../components/sidebar/Sidebar";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableUser from "../../components/table/table-custom/TableUser";
import axios from "axios";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import ChartAppointment from "../../components/Charts/ChartAppointment";

export default function Booking() {
  const [rowId, setRowId] = useState("");
  const current = new Date();
  // current date
  const currentDate = moment(new Date()).format("yyyy-MM-DD");
  const nextDate = moment(currentDate).add(1, "days").format("yyyy-MM-DD");
  // data current day
  const [dataDayCurrent, setDataDayCurrent] = useState([]);
  //data previous day
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

  const FetchDataAfterDelete = async () => {
    const fetchDayCurrent = async () => {
      const data = {
        Date: currentDate,
      };
      const res = await axios.post(
        "http://localhost:8800/api/appointment/all-pending",
        data
      );
      setDataDayCurrent(res.data.value);
    };
    fetchDayCurrent();

    const fetchDatePrevious = async () => {
      const data = {
        Date: nextDate,
      };

      const res = await axios.post(
        "http://localhost:8800/api/appointment/all-pending",
        data
      );
      setDataDayPrevious(res.data.value);
    };
    fetchDatePrevious();

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
  };

  useEffect(() => {
    //fetch data of current date
    const fetchDayCurrent = async () => {
      const data = {
        Date: currentDate,
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
        Date: nextDate,
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

  const Delete = ({ params }) => {
    const DeleteHandle = async (
      idAppointment,
      idStaff,
      idDate,
      idSlot,
      email
    ) => {
      const status = "cancel";
      const data = {
        DateId: idDate,
        StaffId: idStaff,
        SlotId: idSlot,
        Status: status,
        Email: email,
      };
      try {
        const res = await axios.put(
          "http://localhost:8800/api/appointment/update-cancel/" +
            idAppointment,
          data
        );
        toast.success("Successful cancellation of appointment");
        FetchDataAfterDelete();
      } catch (error) {
        toast.error("Cancellation of appointment failed");
      }
    };
    return (
      <div className="delete">
        <button
          className="button-delete"
          onClick={() => {
            if (window.confirm("Are you sure to cancel this appointment?"))
              DeleteHandle(
                params.row._id,
                params.row.StaffId,
                params.row.DateId,
                params.row.SlotId,
                params.row.Email
              );
          }}
        >
          <MdDeleteOutline className="icon-delete" />
        </button>
      </div>
    );
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

      {
        field: "Cancel",
        width: 80,
        headerName: "Delete",
        type: "actions",
        renderCell: (params) => <Delete {...{ params, rowId, setRowId }} />,
        editable: true,
      },
    ],
    [rowId]
  );

  return (
    <div className="container">
      <div className="left-container">
        <Sidebar />
      </div>
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
                <React.Fragment>
                  <Link to={`/appointment`} style={{ textDecoration: "none" }}>
                    <button className="button-action">add appointment</button>
                  </Link>
                </React.Fragment>
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
                {step2 ? (
                  <React.Fragment>
                    <button
                      className="button-action"
                      onClick={handleStep2}
                      style={{ backgroundColor: "#bf925b", color: "white" }}
                    >
                      next date
                    </button>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <button onClick={handleStep2} className="button-action">
                      next date
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
                <>
                  {dataDayCurrent.length > 0 ? (
                    <TableUser
                      column={columns}
                      row={dataDayCurrent}
                      rowId={rowId}
                      setRowId={setRowId}
                    />
                  ) : (
                    <div className="check-table">
                      You don't have an appointment today!!!
                    </div>
                  )}
                </>
              ) : null}
              {step2 ? (
                <>
                  {dataDayPrevious.length > 0 ? (
                    <TableUser
                      column={columns}
                      row={dataDayPrevious}
                      rowId={rowId}
                      setRowId={setRowId}
                    />
                  ) : (
                    <div className="check-table">
                      You don't have an appointment tomorrow!!!
                    </div>
                  )}
                </>
              ) : null}

              {step3 ? (
                <>
                  {dataCurrentMonth.length > 0 ? (
                    <TableUser
                      column={columns}
                      row={dataCurrentMonth}
                      rowId={rowId}
                      setRowId={setRowId}
                    />
                  ) : (
                    <div className="check-table">
                      You don't have an appointment this month !!!
                    </div>
                  )}
                </>
              ) : null}
              {step4 ? (
                <TableUser
                  column={columns}
                  row={dataDayRange}
                  rowId={rowId}
                  setRowId={setRowId}
                />
              ) : null}
            </div>
          </div>
          <div className="chart-booking">
            <div className="chart-booking-right">
              <ChartAppointment />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
