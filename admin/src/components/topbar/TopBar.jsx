import React, { useState, useContext, useEffect } from "react";
import "../../styles/components/topbar.css";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";

export default function TopBar() {
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(currentUser);

  const history = useNavigate();
  // Log out button
  const LogoutHandle = () => {
    window.sessionStorage.clear();
    window.location.reload();
    history("/login");
  };

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
        <Link to={`/`} className="Link">
          <div className="Item">Home</div>
        </Link>
        <Link to={`/`} className="Link">
          <div className="Item">Noti</div>
        </Link>
        <div className="top-dropdown">
          <div className="top-dropdown-select">
            {/* create name of user in here */}
            <span className="item-name">{user.Name}</span>
            <img src={user.Image} alt="" className="image-item" />
          </div>
          <ul className="top-dropdown-list">
            <li className="top-dropdown-item">
              <AccountCircleOutlinedIcon />
              <Link to={`profile/${user._id}`} className="Link">
                <span className="dropdown-text">My profile</span>
              </Link>
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
            <li className="top-dropdown-item" onClick={LogoutHandle}>
              <LogoutOutlinedIcon />
              <span className="dropdown-text">Log out</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
