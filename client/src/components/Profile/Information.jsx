import React, { useEffect, useState, useContext } from "react";
import "../../styles/components/profile/information.css";
import { AuthContext } from "./../../context/AuthContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Information() {
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(currentUser);
  const [files, setFiles] = useState("");

  const [inputField, setInputField] = useState({
    Name_Customer: user.Name_Customer,
    Telephone: user.Telephone,
    Email: user.Email,
    Number: user.Number,
    Street: user.Street,
    District: user.District,
    City: user.City,
    Gender: user.Gender,
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
  }, [user]);

  // update avatar
  const UpdateAvatar = async (e) => {
    e.preventDefault();
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
        CustomerId: user._id,
        Image: list,
      };
      try {
        const response = await axios.put(
          "http://localhost:8800/api/customer/update/" + user._id,
          data
        );
        const record = response.data;
        setUser(record.value);
        if (record.status === 200) {
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
    try {
      const customer = {
        CustomerId: user._id,
        Name: inputField.Name,
        Telephone: inputField.Telephone,
        Number: inputField.Number,
        Street: inputField.Street,
        District: inputField.District,
        City: inputField.City,
        Gender: inputField.Gender,
      };
      try {
        const response = await axios.put(
          "http://localhost:8800/api/customer/update/" + user._id,
          customer
        );
        const record = response.data;
        setUser(record.value);

        if (record.status === 200) {
          toast.success(record.message);
        } else {
          toast.error(record.message);
        }
      } catch (err) {
        toast.error("Somethings went wrong");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="information">
      <ToastContainer />
      <div className="header-information">Your Information</div>
      <div className="image-information">
        {user.Image && (
          <img
            src={files ? URL.createObjectURL(files[0]) : user.Image}
            alt=""
          />
        )}
        <div className="change-image">
          <form>
            <label htmlFor="file" className="button-profile">
              Choose Image
              <input
                type="file"
                id="file"
                multiple
                style={{ display: "none" }}
                onChange={(e) => setFiles(e.target.files)}
              ></input>
            </label>
            <button onClick={UpdateAvatar}> Save</button>
          </form>
        </div>
      </div>
      <form>
        <div className="list-information">
          <div className="item-information">
            <span>Name</span>
            <input
              type="text"
              className="input-container"
              autoComplete="off"
              value={inputField.Name_Customer}
              name="Name_Customer"
              onChange={InputHandler}
            />
          </div>
          <div className="item-information">
            <span>Telephone</span>
            <input
              className="input-container"
              type="text"
              autoComplete="off"
              value={inputField.Telephone}
              name="Telephone"
              onChange={InputHandler}
            />
          </div>
          <div className="item-information">
            <span>Email</span>
            <input
              readOnly
              className="input-container"
              type="text"
              autoComplete="off"
              value={inputField.Email}
              name="Email"
              onChange={InputHandler}
            />
          </div>
          <div className="item-information">
            <span>Number</span>
            <input
              className="input-container"
              type="text"
              autoComplete="off"
              value={inputField.Number}
              name="Number"
              onChange={InputHandler}
            />
          </div>
          <div className="item-information">
            <span>Street</span>
            <input
              className="input-container"
              type="text"
              autoComplete="off"
              value={inputField.Street}
              name="Street"
              onChange={InputHandler}
            />
          </div>

          <div className="item-information">
            <span>District</span>
            <input
              className="input-container"
              type="text"
              autoComplete="off"
              value={inputField.District}
              name="District"
              onChange={InputHandler}
            />
          </div>
          <div className="item-information">
            <span>City</span>
            <input
              className="input-container"
              type="text"
              autoComplete="off"
              value={inputField.City}
              name="City"
              onChange={InputHandler}
            />
          </div>
          <div className="item-information">
            <span>Gender</span>
            <select
              name="Gender"
              id="selects"
              onChange={InputHandler}
              value={inputField.Gender}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other genders">Other genders</option>
            </select>
          </div>
          <button onClick={submitHandler}> Save </button>
        </div>
      </form>
    </div>
  );
}
