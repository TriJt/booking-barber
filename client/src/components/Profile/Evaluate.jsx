import axios from "axios";
import { useState, useEffect, useContext, useMemo } from "react";
import { AuthContext } from "./../../context/AuthContext";
import "../../styles/components/profile/evaluate.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Table from "../Table/Table";
import { MdViewHeadline } from "react-icons/md";

export default function Evaluate() {
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(currentUser);
  const [data, setData] = useState([]);
  const [rowId, setRowId] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchAppointment = async () => {
      const id = {
        Name_Customer: user.Name_Customer,
      };
      const res = await axios.post(
        "http://localhost:8800/api/receipt/customer-evaluate",
        id
      );
      setData(res.data.value);
    };
    fetchAppointment();
  }, []);

  const View = ({ params, setRowId }) => {
    const submitHandle = async (e) => {
      e.preventDefault();
      setOpen(true);
      setRowId(params.row._id);
    };
    return (
      <div className="view">
        <button className="button-view" onClick={submitHandle}>
          <MdViewHeadline className="icon-view" />
        </button>
      </div>
    );
  };

  const Modal = ({ open, onClose, rowId }) => {
    const UpdateAvatar = async (e) => {
      e.preventDefault();
      // up load file to cloudinary and update coverPicture in database
      try {
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
      } catch (err) {
        toast.error("Can get picture from Cloud");
      }
    };

    if (!open) return null;

    return (
      <div className="overlay">
        <div className="modalContainer">
          <p className="closeBtn" onClick={onClose}></p>
          <div className="modal-service">
            <div className="left-modal"></div>
            <div className="right-modal"></div>
          </div>
        </div>
      </div>
    );
  };

  // state columns of table
  const columns = useMemo(
    () => [
      {
        field: "Staff_Name",
        headerName: "Staff",
        width: 100,
      },
      {
        field: "Services",
        headerName: "Services",
        width: 300,
      },
      {
        field: "SumPrice",
        headerName: "SumPrice",
        width: 70,
      },
      {
        field: "Discount",
        headerName: "Discount",
        width: 60,
      },

      {
        field: "Total",
        headerName: "Total",
        width: 60,
      },
      {
        field: "Evaluate",
        width: 70,
        headerName: "Evaluate",
        type: "actions",
        renderCell: (params) => <View {...{ params, rowId, setRowId }} />,
      },
    ],
    [rowId]
  );

  return (
    <>
      <div className="appointment">
        <ToastContainer />
        {data !== null ? (
          <div className="list-appointment">
            <span className="title-appointment"> List of services used </span>
            {open ? (
              <>
                <Modal />
              </>
            ) : (
              <Table
                title={"Manager Service"}
                column={columns}
                row={data}
                rowId={rowId}
                setRowId={setRowId}
              />
            )}
          </div>
        ) : (
          <div className="list-appointment">
            <span className="title-appointment">List Evaluate</span>
            <div className="no-appointment">
              You have not used any service yet
            </div>
          </div>
        )}
      </div>
    </>
  );
}
