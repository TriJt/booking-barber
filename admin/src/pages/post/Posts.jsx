import React, { useState, useEffect, useMemo } from "react";
import "../../styles/post.css";
import TopBar from "../../components/topbar/TopBar";
import Sidebar from "../../components/sidebar/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Posts() {
  return (
    <div className="container">
      {/* container for sidebar */}
      {/* <Modal open={open} onClose={() => setOpen(false)} rowId={rowId} /> */}
      <ToastContainer />
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
          <div className="staff">
            {/* <TableUser
              title={"Manager Service"}
              column={columns}
              row={dataService}
              rowId={rowId}
              setRowId={setRowId}
            /> */}
          </div>
        </div>
        {/* <div className="create-service-container">
          <div className="left-service"></div>
          <div className="right-service">
            <form>
              <div className="left-create">
                {files && (
                  <img
                    src={URL.createObjectURL(files[0])}
                    alt=""
                    className="service-new-image"
                  />
                )}
              </div>
              <div className="right-create">
                <h3 className="header-service"> Create new service</h3>
                <div className="btn-service">
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
                  <label
                    className="button-profile"
                    onClick={() => setFiles(null)}
                  >
                    Close
                  </label>
                </div>
                <input
                  type="text"
                  className="input-service"
                  name="Name_Service"
                  placeholder="Service"
                  value={inputField.Name_Service}
                  onChange={InputHandler}
                />
                <input
                  type="number"
                  className="input-service"
                  name="Price"
                  placeholder="Price"
                  value={inputField.Price}
                  onChange={InputHandler}
                />
                <textarea
                  type="text"
                  className="textarea-service"
                  name="Description"
                  placeholder="Description"
                  value={inputField.Description}
                  onChange={InputHandler}
                />
                <select
                  name="Category"
                  id=""
                  value={inputField.Category}
                  className="select-service"
                  onChange={InputHandler}
                >
                  {category.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <button className="button-profile" onClick={CreateNewService}>
                  Create
                </button>
              </div>
            </form>
          </div> */}
        {/* </div> */}
      </div>
    </div>
  );
}
