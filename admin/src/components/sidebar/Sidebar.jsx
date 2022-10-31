import React, { useState, useContext, useEffect } from "react";
import "../../styles/components/Sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupsIcon from "@mui/icons-material/Groups";
import PeopleIcon from "@mui/icons-material/People";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import DiscountIcon from "@mui/icons-material/Discount";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ContactsIcon from "@mui/icons-material/Contacts";
import { AuthContext } from "../../context/AuthContext";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Sidebar() {
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(currentUser);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if (user.isAdmin === true) {
      setAdmin(true);
    }
  }, []);

  return (
    <div className="Sidebar">
      <div className="top-sidebar">
        <div className="div-logo">
          <span className="logo"> BarberJt</span>{" "}
          <span className="burger">
            <GiHamburgerMenu />
          </span>
        </div>
      </div>
      {admin ? (
        <div className="bottom-sidebar">
          {/* item with icon and name */}
          <NavLink to={`/home`} className="Link">
            <div className="items-sidebar">
              <DashboardIcon className="icon" />
              <div className="item-sidebar">Dashboard</div>
            </div>
          </NavLink>
          <NavLink to={`/customer`} className="Link">
            <div className="items-sidebar">
              <GroupsIcon className="icon" />
              <div className="item-sidebar">Customers</div>
            </div>
          </NavLink>
          <NavLink to={`/staff`} className="Link">
            <div className="items-sidebar">
              <PeopleIcon className="icon" />
              <div className="item-sidebar">Staffs</div>
            </div>
          </NavLink>
          <NavLink to={`/booking`} className="Link">
            <div className="items-sidebar">
              <BookmarkIcon className="icon" />
              <div className="item-sidebar">Booking</div>
            </div>
          </NavLink>
          <NavLink to={`/category`} className="Link">
            <div className="items-sidebar">
              <DiscountIcon className="icon" />
              <div className="item-sidebar">Category</div>
            </div>
          </NavLink>
          <NavLink to={`/service`} className="Link">
            <div className="items-sidebar">
              <DiscountIcon className="icon" />
              <div className="item-sidebar">Services</div>
            </div>
          </NavLink>
          <NavLink to={`/post`} className="Link">
            <div className="items-sidebar">
              <PostAddIcon className="icon" />
              <div className="item-sidebar">Posts</div>
            </div>
          </NavLink>
          <NavLink to="/contact" className="Link">
            <div className="items-sidebar">
              <ContactsIcon className="icon" />
              <div className="item-sidebar">Contacts</div>
            </div>
          </NavLink>
        </div>
      ) : (
        <div className="bottom-sidebar">
          {/* item with icon and name */}
          <NavLink to={`/home`} className="Link">
            <div className="items-sidebar">
              <DashboardIcon className="icon" />
              <div className="item-sidebar">Dashboard</div>
            </div>
          </NavLink>
          <NavLink to={`/customer`} className="Link">
            <div className="items-sidebar">
              <GroupsIcon className="icon" />
              <div className="item-sidebar">Customers</div>
            </div>
          </NavLink>
          <NavLink to={`/booking`} className="Link">
            <div className="items-sidebar">
              <BookmarkIcon className="icon" />
              <div className="item-sidebar">Booking</div>
            </div>
          </NavLink>
          <NavLink to={`/category`} className="Link">
            <div className="items-sidebar">
              <DiscountIcon className="icon" />
              <div className="item-sidebar">Category</div>
            </div>
          </NavLink>
          <NavLink to={`/service`} className="Link">
            <div className="items-sidebar">
              <DiscountIcon className="icon" />
              <div className="item-sidebar">Services</div>
            </div>
          </NavLink>
          <NavLink to={`/post`} className="Link">
            <div className="items-sidebar">
              <PostAddIcon className="icon" />
              <div className="item-sidebar">Posts</div>
            </div>
          </NavLink>
          <NavLink to="/contact" className="Link">
            <div className="items-sidebar">
              <ContactsIcon className="icon" />
              <div className="item-sidebar">Contacts</div>
            </div>
          </NavLink>
        </div>
      )}
    </div>
  );
}
