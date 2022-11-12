import React, { useState, useContext, useEffect } from "react";
import "../../styles/components/widget.css";
import { Link } from "react-router-dom";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import GroupsIcon from "@mui/icons-material/Groups";
import StoreIcon from "@mui/icons-material/Store";
import PeopleIcon from "@mui/icons-material/People";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Widget() {
  // title is name of item
  // isMoney is type of item
  // link is link to page for item
  // icon is icon description to item
  // amount is value get from back-end

  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(currentUser);
  const [staff, setStaff] = useState("");
  const [customer, setCustomer] = useState("");
  const [revenue, setRevenue] = useState();
  const [booking, setBooking] = useState();
  const current = new Date();
  const start = `${current.getFullYear()}-${
    current.getMonth() + 1
  }-${current.getDate()}`;

  const end = `${current.getFullYear()}-${current.getMonth() + 1}-${
    current.getDate() + 1
  }`;

  useEffect(() => {
    // count staff
    const countStaff = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/staff/count");
        setStaff(res.data.value);
      } catch (error) {
        console.log(error);
      }
    };
    countStaff();

    // get evenuw

    const countCustomer = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/customer/count");
        setCustomer(res.data.value);
      } catch (error) {
        console.log(error);
      }
    };
    countCustomer();
  }, []);

  useEffect(() => {
    const data = {
      Start: start,
      End: end,
    };
    const getRevenue = async () => {
      const res = await axios.post(
        "http://localhost:8800/api/receipt/Choose",
        data
      );
      const value = res.data;
      setRevenue(value);
    };
    getRevenue();

    const getAppointment = async () => {
      const res = await axios.post(
        "http://localhost:8800/api/appointment/Choose",
        data
      );
      const value = res.data;
      setBooking(value);
    };
    getAppointment();
  }, []);

  const Items = ({ title, isMoney, link, icon, amount }) => {
    return (
      <div className="widget">
        <div className="left">
          <span className="title">{title}</span>
          <span className="counter">
            {amount}
            {isMoney}
          </span>
          <span className="link">{link}</span>
        </div>
        <div className="right">
          <div className="percentage positive" style={{ color: "green" }}>
            <KeyboardArrowUpOutlinedIcon />
          </div>
          {icon}
        </div>
      </div>
    );
  };

  return (
    <div className="widgets">
      <Items
        title="Revenue Today"
        link={
          <Link to="/revenue" className="link">
            <span> Go to Revenue</span>
          </Link>
        }
        icon={
          <StoreIcon
            className="icon"
            style={{
              color: "goldenrod",
              backgroundColor: "rgba(218 ,165,32,0.2)",
            }}
          />
        }
        amount={revenue}
        isMoney={"$"}
      />
      <Items
        title="Customer"
        link={
          <Link to="/customer" className="link">
            <span> See all Customer</span>
          </Link>
        }
        icon={
          <GroupsIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255,0,0,0.2)",
            }}
          />
        }
        amount={customer}
      />
      <Items
        title="Staff"
        link={
          <Link to="/staff" className="link">
            <span> View to Staff</span>
          </Link>
        }
        icon={
          <PeopleIcon
            className="icon"
            style={{
              color: "purple",
              backgroundColor: "rgba(128,0,128,0.2)",
            }}
          />
        }
        amount={staff}
      />
      <Items
        title="Appointment"
        link={
          <Link to="/booking" className="link">
            <span> Go to Schedule</span>
          </Link>
        }
        icon={
          <BookmarkIcon
            className="icon"
            style={{
              color: "green",
              backgroundColor: "rgba(0,128,0,0.2)",
            }}
          />
        }
        amount={booking}
      />
    </div>
  );
}
