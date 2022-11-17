import React, { useState, useContext, useEffect } from "react";
import "../../styles/components/topbar.css";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import { CiMoneyCheck1 } from "react-icons/ci";
import { BsFilePerson } from "react-icons/bs";
import { MdOutlineLogout } from "react-icons/md";

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
        Welcome to the management system , {user.Name}
      </div>
      <div className="items-topBar">
        <Link to={`/`} className="Link">
          <div className="Item">Home</div>
        </Link>
        <div className="top-dropdown">
          <div className="top-dropdown-select">
            {/* create name of user in here */}
            <span className="item-name">{user.Name}</span>
            <img src={user.Image} alt="" className="image-item" />
          </div>
          <ul className="top-dropdown-list">
            <li className="top-dropdown-item">
              <BsFilePerson className="icon" />
              <Link to={`profile/${user._id}`} className="Link">
                <span className="dropdown-text">My profile</span>
              </Link>
            </li>

            <li className="top-dropdown-item">
              <CiMoneyCheck1 className="icon" />
              <span className="dropdown-text">Salary</span>
            </li>
            <li className="top-dropdown-item" onClick={LogoutHandle}>
              <MdOutlineLogout className="icon" />
              <span className="dropdown-text">Log out</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
