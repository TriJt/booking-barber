import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdDriveFileRenameOutline, MdOutlineEmail } from "react-icons/md";
import { BsTelephoneForward, BsGenderAmbiguous } from "react-icons/bs";
import { FaRegAddressCard, FaBirthdayCake } from "react-icons/fa";

export default function ModalStaff({ open, onClose, rowId }) {
  const [data, setData] = useState([]);

  console.log(rowId);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        "http://localhost:8800/api/staff/get/" + rowId
      );
      setData(res.data.value);
    };

    fetchData();
  }, [rowId]);

  if (!open) return null;

  return (
    <div className="overlay">
      <div className="modalContainer">
        <p className="closeBtn" onClick={onClose}>
          X
        </p>
        <div className="modalInformation">
          <h3 className="title-value"> Information</h3>
          <div className="items-value">
            <span className="icon-value">
              <MdDriveFileRenameOutline />
            </span>
            <input
              type="text"
              className="text-value"
              placeholder="Name"
              name="Name"
              value={data.Name}
            />
          </div>
          <div className="items-value">
            <span className="icon-value">
              <BsTelephoneForward />
            </span>
            <input
              type="text"
              className="text-value"
              placeholder="Telephone"
              name="Telephone"
              value={data.Telephone}
            />
          </div>
          <div className="items-value">
            <span className="icon-value">
              <MdOutlineEmail />
            </span>
            <input
              type="text"
              className="text-value"
              placeholder="Email"
              name="Email"
              value={data.Email}
            />
          </div>
          <div className="items-value">
            <span className="icon-value">
              <FaRegAddressCard />
            </span>
            <input
              type="text"
              className="text-value"
              placeholder="Address"
              value={`${data.Number} ${data.Street} ${data.District} ${data.City}`}
            />
          </div>
          <div className="items-value">
            <span className="icon-value">
              <BsGenderAmbiguous />
            </span>
            <input
              type="text"
              className="text-value"
              placeholder="Gender"
              name="Gender"
              value={data.Gender}
            />
          </div>
          <div className="items-value">
            <span className="icon-value">
              <FaBirthdayCake />
            </span>
            <input
              type="text"
              className="text-value"
              placeholder="Birthday"
              name="Birthday"
              value={data.Birthday}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
