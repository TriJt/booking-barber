import React, { useState, useEffect, useMemo } from "react";
import "../../styles/booking.css";
import TopBar from "../../components/topbar/TopBar";
import Sidebar from "../../components/sidebar/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

const localizer = momentLocalizer(moment);

export default function Booking() {
  const [data, setData] = useState([]);
  const now = new Date();

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

  const events = data.map((appointment) => {
    const date = appointment.date;
    const slot = appointment.slotTime;
    const datetime = date.concat("T", slot);
    const mySlot = moment(datetime).format();
    return {
      id: appointment._id,
      title: appointment.NameCustomer,
      start: new Date(mySlot),
      desc: appointment.Services,
      end: new Date(mySlot),
      allDay: false,
    };
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
          <div className="booking-container">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              showMultiDayTimes
              defaultDate={moment().toDate()}
              style={{ height: 500 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
