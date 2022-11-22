import React, { useState, useEffect } from "react";
import TopBar from "../../components/topbar/TopBar";
import Sidebar from "../../components/sidebar/Sidebar";
import "../../styles/store.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Store() {
  const [data, setData] = useState("");
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);

  const handleStep1 = () => {
    setStep1(true);
    setStep2(false);
  };
  const handleStep2 = () => {
    setStep2(true);
    setStep1(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        "http://localhost:8800/api/store/getById",
        data
      );
      setData(res.data.value);
    };
    fetchData();
  }, []);

  const ShowHandle = () => {
    return (
      <div className="container-store">
        <div className="info-store">
          <div className="item-store">
            <h3 className="header-store">Information</h3>
          </div>
          <div className="item-store">
            <span className="title-store">NAME:</span>
            <span className="name-store">{data.Name_Store}</span>
          </div>
          <div className="item-store">
            <span className="title-store">Telephone:</span>
            <span className="name-store">{data.Telephone}</span>
          </div>
          <div className="item-store">
            <span className="title-store">Description:</span>
            <span className="name-store">{data.Description}</span>
          </div>
        </div>
        <div className="location-store">
          <div className="item-store">
            <h3 className="header-store">Location</h3>
          </div>
          <div className="item-store">
            <span className="title-store">Number:</span>
            <span className="name-store">{data.Number}</span>
          </div>
          <div className="item-store">
            <span className="title-store">Street:</span>
            <span className="name-store">{data.Street}</span>
          </div>
          <div className="item-store">
            <span className="title-store">District:</span>
            <span className="name-store">{data.District}</span>
          </div>
          <div className="item-store">
            <span className="title-store">City:</span>
            <span className="name-store">{data.City}</span>
          </div>
        </div>
      </div>
    );
  };

  const Update = () => {
    const [inputField, setInputField] = useState({
      Name_Store: data.Name_Store,
      Telephone: data.Telephone,
      Description: data.Description,
      Number: data.Number,
      Street: data.Street,
      District: data.District,
      City: data.City,
    });

    const InputHandler = (e) => {
      setInputField({ ...inputField, [e.target.name]: e.target.value });
    };

    const submitHandle = async (e) => {
      e.preventDefault();
      const data = {
        Name_Store: inputField.Name,
        Telephone: inputField.Email,
        Description: inputField.Email,
        Number: inputField.Number,
        Street: inputField.Street,
        District: inputField.District,
        City: inputField.City,
      };

      try {
        const res = await axios.put(
          "http://localhost:8800/api/store/update",
          data
        );

        toast.success(res.data.message);
        setData(res.data.value);
      } catch (error) {
        toast.error("Update information failed");
      }
    };
    return (
      <div className="container-store">
        <div className="info-store">
          <div className="item-store">
            <h3 className="header-store">Information</h3>
          </div>
          <div className="item-store">
            <span className="title-store">NAME:</span>
            <input
              className="input-store"
              type="text"
              name="Name_Store"
              value={inputField.Name_Store}
              onChange={InputHandler}
            />
          </div>
          <div className="item-store">
            <span className="title-store">Telephone:</span>
            <input
              className="input-store"
              type="text"
              name="Telephone"
              value={inputField.Telephone}
              onChange={InputHandler}
            />
          </div>
          <div className="item-store">
            <span className="title-store">Description:</span>
            <textarea
              className="textarea-store"
              type="text"
              name="Description"
              value={inputField.Description}
              onChange={InputHandler}
            />
          </div>
          <div className="button-receipt">
            <button className="button-action padding" onClick={submitHandle}>
              update
            </button>
          </div>
        </div>
        <div className="location-store">
          <div className="item-store">
            <h3 className="header-store">Location</h3>
          </div>
          <div className="item-store">
            <span className="title-store">Number:</span>
            <input
              className="input-store"
              type="text"
              name="Number"
              value={inputField.Number}
              onChange={InputHandler}
            />
          </div>
          <div className="item-store">
            <span className="title-store">Street:</span>
            <input
              className="input-store"
              type="text"
              name="Street"
              value={inputField.Street}
              onChange={InputHandler}
            />
          </div>
          <div className="item-store">
            <span className="title-store">District:</span>
            <input
              className="input-store"
              type="text"
              name="District"
              value={inputField.District}
              onChange={InputHandler}
            />
          </div>
          <div className="item-store">
            <span className="title-store">City:</span>
            <input
              className="input-store"
              type="text"
              name="City"
              value={inputField.City}
              onChange={InputHandler}
            />
          </div>
        </div>
      </div>
    );
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
        <div className="revenue-container">
          <ToastContainer />
          <div className="choose-chart">
            <div className="header-revenue">
              <span>Store Information </span>
            </div>
            <div className="button-revenue">
              {step1 ? (
                <React.Fragment>
                  <button
                    className="button-action"
                    onClick={handleStep1}
                    style={{ backgroundColor: "#bf925b", color: "white" }}
                  >
                    information
                  </button>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <button className="button-action" onClick={handleStep1}>
                    information
                  </button>
                </React.Fragment>
              )}
              {step2 ? (
                <React.Fragment>
                  <button
                    className="button-action"
                    onClick={handleStep2}
                    style={{ backgroundColor: "#bf925b", color: "white" }}
                  >
                    update
                  </button>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <button onClick={handleStep2} className="button-action">
                    update
                  </button>
                </React.Fragment>
              )}
            </div>
          </div>
          <div className="charts-container">
            {step1 ? <ShowHandle /> : null}
            {step2 ? <Update /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
