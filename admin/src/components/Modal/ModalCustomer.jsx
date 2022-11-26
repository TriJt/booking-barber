import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdDriveFileRenameOutline, MdOutlineEmail } from "react-icons/md";
import {
  BsTelephoneForward,
  BsGenderAmbiguous,
  BsCollection,
} from "react-icons/bs";
import { FaRegAddressCard } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";

export default function ModalCustomer({ open, onClose, rowId }) {
  const [data, setData] = useState([]);

  if (open === true) {
    const fetchData = async () => {
      const res = await axios.get(
        "http://localhost:8800/api/customer/" + rowId
      );
      setData(res.data.value);
    };
    fetchData();
  }

  return (
    open && (
      <div className="overlay">
        <div className="modalContainer">
          <p className="closeBtn" onClick={onClose}>
            <IoIosCloseCircleOutline />
          </p>
          <div className="modalInformation">
            <h3 className="title-value"> Information</h3>
            <div className="items-value">
              <span className="icon-value">
                <MdDriveFileRenameOutline />
              </span>
              <span className="text-value">{data.Name_Customer} </span>
            </div>
            <div className="items-value">
              <span className="icon-value">
                <BsTelephoneForward />
              </span>
              <span className="text-value">{data.Name_Customer} </span>
            </div>
            <div className="items-value">
              <span className="icon-value">
                <MdOutlineEmail />
              </span>
              <span className="text-value">{data.Email} </span>
            </div>
            <div className="items-value">
              <span className="icon-value">
                <FaRegAddressCard />
              </span>
              <span className="text-value">
                {`${data.Number} ${data.Street} ${data.District} ${data.City}`}{" "}
              </span>
            </div>

            <div className="items-value">
              <span className="icon-value">
                <BsGenderAmbiguous />
              </span>
              <span className="text-value">{data.Gender} </span>
            </div>

            <div className="items-value">
              <span className="icon-value">
                <BsCollection />
              </span>
              <span className="text-value">{data.Collect} </span>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
