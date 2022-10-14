import React, { useState, useContext, useEffect } from "react";
import "./profile.css";
import Items from "../../components/item/Items";
import BadgeIcon from "@mui/icons-material/Badge";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import ImageIcon from "@mui/icons-material/Image";
import SaveIcon from "@mui/icons-material/Save";
import TopBar from "../../components/topbar/TopBar";
import Sidebar from "../../components/sidebar/Sidebar";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ManIcon from "@mui/icons-material/Man";
import CakeIcon from "@mui/icons-material/Cake";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Profile() {
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(currentUser);
  const [files, setFiles] = useState("");
  const [SelectedDay, setSelectedDay] = useState("");

  // declaration fields in form
  const [inputField, setInputField] = useState({
    Name: user.Name,
    Telephone: user.Telephone,
    Email: user.Email,
    Number: user.Number,
    Street: user.Street,
    District: user.District,
    City: user.City,
    Gender: user.Gender,
  });

  // declaration error
  const [errField, setErrField] = useState({
    EmailErr: "",
    PasswordErr: "",
  });

  const InputHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    // set locaL storage after update
    sessionStorage.setItem("user", JSON.stringify(user));
    const userInfo = JSON.parse(sessionStorage.getItem("user"));
    const newUpdatedUserInfo = {
      ...userInfo,
    };
    sessionStorage.setItem("user", JSON.stringify(newUpdatedUserInfo));
  });

  // update avatar
  const UpdateAvatar = async (e) => {
    e.preventDefault();
    // up load file to cloudinary and update coverPicture in database
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "social0722");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/johnle/image/upload",
            data
          );
          const { url } = uploadRes.data;
          return url;
        })
      );

      const data = {
        StaffId: user._id,
        Image: list,
      };
      try {
        const response = await axios.put(
          "http://localhost:8800/api/staff/update/" + user._id,
          data
        );
        const record = response.data;
        setUser(record.value);
        console.log(record.value);
        console.log(" user", user);
        if (record.statusText === "Success") {
          toast.success(record.message);
        } else {
          toast.error(record.message);
        }
      } catch (err) {
        toast.error("Update in SessionStorage Failed");
      }
    } catch (err) {
      toast.error("Can get picture from Cloud ");
    }
  };

  // update information
  const submitHandler = async (e) => {
    e.preventDefault();
    const staff = {
      StaffId: user._id,
      Name: inputField.Name,
      Telephone: inputField.Telephone,
      Email: inputField.Email,
      Number: inputField.Number,
      Street: inputField.Street,
      District: inputField.District,
      City: inputField.City,
      Gender: inputField.Gender,
      Birthday: SelectedDay,
    };
    try {
      const response = await axios.put(
        "http://localhost:8800/api/staff/update/" + user._id,
        staff
      );
      const record = response.data;
      setUser(record.value);
      if (record.statusText === "Success") {
        toast.success(record.message);
      } else {
        toast.error(record.message);
      }
    } catch (err) {
      toast.error("Somethings went wrong");
    }
  };

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
        {/* phần thông tin của staff */}
        <div className="bottom-profile">
          <ToastContainer />
          {/* phần hình ảnh khi chỉnh sửa */}
          <div className="left-profile">
            {user.Image && (
              <img
                src={files ? URL.createObjectURL(files[0]) : user.Image}
                alt=""
                className="avatar"
              />
            )}
          </div>
          {/* phần thông tin liên hệ  */}
          <div className="right-profile">
            <div className="child-right">
              <div className="items-profile">
                <div className="action-profile">
                  <form>
                    <label htmlFor="file" className="button-profile">
                      <input
                        type="file"
                        id="file"
                        multiple
                        style={{ display: "none" }}
                        onChange={(e) => setFiles(e.target.files)}
                      ></input>
                      <ImageIcon className="icon-input" />
                    </label>
                  </form>
                  <button className="button-profile" onClick={UpdateAvatar}>
                    <SaveIcon className="icon-input" />
                  </button>
                </div>
              </div>
              {/* phần form để cập nhật thông tin  */}
              <form action="submit">
                <div className="items-profile">
                  <Items value={"Name"} />
                  <div className="input-container-address">
                    <span className="icon-input">
                      <BadgeIcon />
                    </span>
                    <input
                      className="input-address"
                      name="Name"
                      autoComplete="off"
                      onChange={InputHandler}
                      required
                      value={inputField.Name}
                      type="text"
                      placeholder={user.Name}
                    />
                  </div>
                </div>
                <div className="items-profile">
                  <Items value={"Telephone"} />
                  <div className="input-container-address">
                    <span className="icon-input">
                      <CallIcon />
                    </span>
                    <input
                      className="input-address"
                      name="Telephone"
                      autoComplete="off"
                      onChange={InputHandler}
                      required
                      value={inputField.Telephone}
                      type="text"
                    />
                  </div>
                </div>
                <div className="items-profile">
                  <Items value={"Email"} />
                  <div className="input-container-address">
                    <span className="icon-input">
                      <EmailIcon />
                    </span>
                    <input
                      className="input-address"
                      name="Email"
                      autoComplete="off"
                      onChange={InputHandler}
                      required
                      value={inputField.Email}
                      type="email"
                    />
                  </div>
                </div>

                <div className="double-items">
                  <div className="items-profile">
                    <Items value={"Number"} />
                    <div className="input-container-address">
                      <span className="icon-input">
                        <LocationCityIcon />
                      </span>
                      <input
                        className="input-address"
                        name="Number"
                        autoComplete="off"
                        onChange={InputHandler}
                        required
                        value={inputField.Number}
                        type="text"
                        placeholder={user.Number}
                      />
                    </div>
                  </div>
                  <div className="items-profile">
                    <Items value={"Street"} />
                    <div className="input-container-address">
                      <span className="icon-input">
                        <LocationCityIcon />
                      </span>
                      <input
                        className="input-address"
                        name="Street"
                        autoComplete="off"
                        onChange={InputHandler}
                        required
                        value={inputField.Street}
                        type="text"
                        placeholder={user.Street}
                      />
                    </div>
                  </div>
                </div>
                <div className="double-items">
                  <div className="items-profile">
                    <Items value={"District"} />
                    <div className="input-container-address">
                      <span className="icon-input">
                        <LocationCityIcon />
                      </span>
                      <input
                        className="input-address"
                        name="District"
                        autoComplete="off"
                        onChange={InputHandler}
                        required
                        value={inputField.District}
                        type="text"
                        placeholder={user.District}
                      />
                    </div>
                  </div>
                  <div className="items-profile">
                    <Items value={"City"} />
                    <div className="input-container-address">
                      <span className="icon-input">
                        <LocationCityIcon />
                      </span>
                      <input
                        className="input-address"
                        name="City"
                        autoComplete="off"
                        onChange={InputHandler}
                        required
                        value={inputField.City}
                        type="text"
                        placeholder={user.City}
                      />
                    </div>
                  </div>
                </div>
                <div className="double-items">
                  <div className="items-profile">
                    <Items value={"Gender"} />
                    <div className="input-container-address">
                      <span className="icon-input">
                        <ManIcon />
                      </span>
                      <select
                        name="Gender"
                        id="selects"
                        className="input-address"
                        onChange={InputHandler}
                        value={inputField.Gender}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other genders">Other genders</option>
                      </select>
                    </div>
                  </div>
                  <div className="items-profile">
                    <Items value={"Birthday"} />
                    <div className="input-container-address">
                      <span className="icon-input">
                        <CakeIcon />
                      </span>
                      <DatePicker
                        className="input-address"
                        name="Birthday"
                        value={user.Birthday}
                        selected={SelectedDay}
                        onChange={(date) => setSelectedDay(date)}
                        onSelect={(date) => setSelectedDay(date)}
                        dateFormat="dd/MM/yyyy"
                        maxDate={new Date()}
                        showYearDropdown
                        scrollableYearDropdown
                      />
                    </div>
                  </div>
                </div>
                <div className="action-profile">
                  <button className="save" onClick={submitHandler}>
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
