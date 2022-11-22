import React from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "./../../context/AuthContext";
import "../../styles/components/profile/appointment.css";

export default function History() {
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(currentUser);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAppointment = async () => {
      const res = await axios.get(
        "http://localhost:8800/api/appointment/cancel?UserId=" + user._id
      );
      setData(res.data.value);
    };
    fetchAppointment();
  }, [user._id]);
  return (
    <div className="appointment">
      {data ? (
        <div className="list-appointment">
          <span className="title-appointment"> List Appointment</span>
          <div className="header-appointment">
            <span>Date</span>
            <span>Time </span>
            <span>Service</span>
            <span>Staff</span>
            <span> Status </span>
          </div>
          {data.map((value, i) => (
            <div className="items-appointment" key={i}>
              <span>{value.date}</span>
              <span>{value.slotTime} </span>
              <span>{value.Services} </span>
              <span>{value.Staff} </span>
              <span> {value.Status} </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-appointment"> You don't have appointment</div>
      )}
    </div>
  );
}
