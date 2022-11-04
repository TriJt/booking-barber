import React from "react";
import TopBar from "../../components/Topbar/TopBar";
import { SliderProfile } from "../../components/Home/Slider/Slider";
import { useState } from "react";
import Information from "../../components/Profile/Information";
import History from "../../components/Profile/History";
import ChangePassword from "../../components/Profile/ChangePassword";
import Appointment from "../../components/Profile/Appointment";
import Email from "../../components/Profile/Email";
import "../../styles/profile.css";
import { NavLink } from "react-router-dom";

export default function Profile() {
  const [active, setActive] = useState("1");

  return (
    <div className="container">
      <section className="section1">
        <div className="background-image">
          <div className="container-item">
            <TopBar />
            <SliderProfile />
          </div>
        </div>
      </section>
      {/* profile information */}
      <section className="section-2">
        <div className="profile-container">
          <div className="setting">
            <div className="setting-left">
              <div className="left-title " onClick={() => setActive("1")}>
                Edit your profile
              </div>
              <div className="left-title" onClick={() => setActive("2")}>
                Change password
              </div>
              <div className="left-title" onClick={() => setActive("3")}>
                Appointment
              </div>
              <div className="left-title" onClick={() => setActive("4")}>
                Email
              </div>
              <div className="left-title " onClick={() => setActive("5")}>
                History
              </div>
            </div>
            <div className="setting-right">
              {active === "1" && <Information />}
              {active === "2" && <ChangePassword />}
              {active === "3" && <Appointment />}
              {active === "4" && <Email />}
              {active === "5" && <History />}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
