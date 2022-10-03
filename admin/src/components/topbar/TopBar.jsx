import React from "react";
import "./topbar.css";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";

export default function TopBar() {
  return (
    <div className="topBar">
      {/* search to find somethings from database */}
      <div className="search">
        <span>
          <SearchIcon />
        </span>
        <input type="text" className="input-search" placeholder="Search..." />
      </div>
      <div className="items-topBar">
        <div className="item">Home</div>
        <div className="item">Noti</div>
        <div className="top-dropdown">
          <div className="top-dropdown-select">
            {/* create name of user in here */}
            <span className="item-name">Hi tri</span>
            <img
              src="https://i.pinimg.com/564x/c5/2d/ca/c52dcab3f8f4694e41993fa4ff987e16.jpg"
              alt=""
              className="image-item"
            />
          </div>
          <ul className="top-dropdown-list">
            <li className="top-dropdown-item">
              <AccountCircleOutlinedIcon />
              {/* <Link to={`profile/${user.username}`} className="dropdown-link"> */}
              <span className="dropdown-text">My profile</span>
              {/* </Link> */}
            </li>
            {/* tạo một cái popup trang đăng nhập  */}
            <li className="top-dropdown-item">
              <ChangeCircleOutlinedIcon />
              <span className="dropdown-text">Change account</span>
            </li>
            {/* Change page to change information of user */}
            <li className="top-dropdown-item">
              <SettingsOutlinedIcon />
              {/* <Link to={`/settings`} className="dropdown-link"> */}
              <span className="dropdown-text">Settings</span>
              {/* </Link> */}
            </li>
            {/* Quay lại trang cá nhân và xóa dữ liệu có trong localStorage */}
            <li className="top-dropdown-item">
              <LogoutOutlinedIcon />
              <span className="dropdown-text">Log out</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
