import React from "react";
import "./Sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupsIcon from "@mui/icons-material/Groups";
import StoreIcon from "@mui/icons-material/Store";
import PeopleIcon from "@mui/icons-material/People";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import DiscountIcon from "@mui/icons-material/Discount";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ContactsIcon from "@mui/icons-material/Contacts";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="Sidebar">
      <div className="top-sidebar">
        <div className="logo"> Booking Barber</div>
      </div>
      <div className="bottom-sidebar">
        {/* item with icon and name */}
        <Link to={`/`} className="Link">
          <div className="items-sidebar">
            <DashboardIcon className="icon-input" />
            <div className="item-sidebar">Dashboard</div>
          </div>
        </Link>
        <Link to={`/store`} className="Link">
          <div className="items-sidebar">
            <StoreIcon className="icon-input" />
            <div className="item-sidebar">Store</div>
          </div>
        </Link>
        <Link to={`/customer`} className="Link">
          <div className="items-sidebar">
            <GroupsIcon className="icon-input" />
            <div className="item-sidebar">Customers</div>
          </div>
        </Link>
        <Link to={`/staff`} className="Link">
          <div className="items-sidebar">
            <PeopleIcon className="icon-input" />
            <div className="item-sidebar">Staffs</div>
          </div>
        </Link>
        <Link to={`/booking`} className="Link">
          <div className="items-sidebar">
            <BookmarkIcon className="icon-input" />
            <div className="item-sidebar">Booking</div>
          </div>
        </Link>
        <Link to={`/discount`} className="Link">
          <div className="items-sidebar">
            <DiscountIcon className="icon-input" />
            <div className="item-sidebar">Discount</div>
          </div>
        </Link>
        <Link to={`/post`} className="Link">
          <div className="items-sidebar">
            <PostAddIcon className="icon-input" />
            <div className="item-sidebar">Posts</div>
          </div>
        </Link>
        <Link to="/contact" className="Link">
          <div className="items-sidebar">
            <ContactsIcon className="icon-input" />
            <div className="item-sidebar">Contacts</div>
          </div>
        </Link>
      </div>
    </div>
  );
}
