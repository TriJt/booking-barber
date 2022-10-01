import "./home.css"; 
import React from 'react'
import TopBar from "../../components/topbar/TopBar";
import Sidebar from "../../components/sidebar/Sidebar";

export default function Home() {
  return (
    <div className="container">
        {/* container for sidebar */}
        <div className="left-container">
            <Sidebar/>
        </div>
        {/* container for topBar and mainBar */}
        <div className="right-container">
            <div className="top-container">
                <TopBar />
            </div>
            <div className="bottom-container">
                bottom
            </div>
        </div>
    </div>
  )
}
