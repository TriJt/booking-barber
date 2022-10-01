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

export default function Sidebar() {
  return (
    <div className="Sidebar">
      <div className="top-sidebar">
        <div className="logo"> Booking Barber</div>
      </div>
      <div className="bottom-sidebar">
        {/* item with icon and name */}
        <div className="items-sidebar">
          <DashboardIcon className="item-icon" />
          <div className="item-sidebar">Dashboard</div>
        </div>
        <div className="items-sidebar">
          <StoreIcon className="item-icon" />
          <div className="item-sidebar">Store</div>
        </div>
        <div className="items-sidebar">
          <GroupsIcon className="item-icon" />
          <div className="item-sidebar">Customers</div>
        </div>
        <div className="items-sidebar">
          <PeopleIcon className="item-icon" />
          <div className="item-sidebar">Staffs</div>
        </div>
        <div className="items-sidebar">
          <BookmarkIcon className="item-icon" />
          <div className="item-sidebar">Booking</div>
        </div>
        <div className="items-sidebar">
          <DiscountIcon className="item-icon" />
          <div className="item-sidebar">Discount</div>
        </div>
        <div className="items-sidebar">
          <PostAddIcon className="item-icon" />
          <div className="item-sidebar">Posts</div>
        </div>
        <div className="items-sidebar">
          <ContactsIcon className="item-icon" />
          <div className="item-sidebar">Contacts</div>
        </div>
      </div>
    </div>
  );
}