import React from "react";
import "./widget.css";
import { Link } from "react-router-dom";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import GroupsIcon from "@mui/icons-material/Groups";
import StoreIcon from "@mui/icons-material/Store";
import PeopleIcon from "@mui/icons-material/People";
import BookmarkIcon from "@mui/icons-material/Bookmark";

export default function Widget({ type }) {
  // title is name of item
  // isMoney is type of item
  // link is link to page for item
  // icon is icon description to item
  // amount is value get from back-end
  const Items = ({ title, isMoney, link, icon, amount }) => {
    return (
      <div className="widget">
        <div className="left">
          <span className="title">{title}</span>
          <span className="counter">{amount}</span>
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
        title="Store"
        link={
          <Link to="/store" className="link">
            <span> Go to Store</span>
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
        amount={1000 + "$"}
      />
      <Items
        title="Customer"
        link={
          <Link to="/customer" className="link">
            <span> See info customer</span>
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
        amount={1000}
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
        amount={1000}
      />
      <Items
        title="Booking"
        link={
          <Link to="/store" className="link">
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
        amount={1000}
      />
    </div>
  );
}
