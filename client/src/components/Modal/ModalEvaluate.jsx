import React from "react";
import "../../styles/components/profile/evaluate.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { IoIosCloseCircleOutline } from "react-icons/io";

export default function Modal({ open, onClose, rowId }) {
  const UpdateAvatar = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        "http://localhost:8800/api/service/update/" + rowId
      );
      const record = response.data;

      if (record.status === 200) {
        toast.success(record.message);
      } else {
        toast.error(record.message);
      }
    } catch (err) {
      toast.error("Update in SessionStorage Failed");
    }
  };

  if (!open) return null;

  return (
    <div className="overlay">
      <div className="modalContainer">
        <p className="closeBtn" onClick={onClose}>
          <IoIosCloseCircleOutline />
        </p>
        <div className="modal-service">
          <div className="left-modal"></div>
          <div className="right-modal">
            <div className="item-right-modal">
              <h3 className="title-value"> Image Service</h3>
              <form>
                <label htmlFor="file" className="button-profile">
                  Choose Image
                </label>
              </form>
              <button className="button-action" onClick={UpdateAvatar}>
                Change
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
