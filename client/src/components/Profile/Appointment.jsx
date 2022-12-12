import axios from "axios";
import { useState, useEffect, useContext, useMemo } from "react";
import { AuthContext } from "./../../context/AuthContext";
import "../../styles/components/profile/appointment.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Table from "../Table/Table";
import { MdFreeCancellation } from "react-icons/md";

export default function Appointment() {
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(currentUser);
  const [data, setData] = useState([]);
  const [rowId, setRowId] = useState("");

  useEffect(() => {
    const fetchAppointment = async () => {
      const res = await axios.get(
        "http://localhost:8800/api/appointment/pending?UserId=" + user._id
      );
      setData(res.data.value);
    };
    fetchAppointment();
  }, [user._id]);

  const Cancel = ({ params, setRowId }) => {
    const DeleteHandle = async (
      idAppointment,
      idStaff,
      idDate,
      idSlot,
      email
    ) => {
      const status = "cancel";
      const data = {
        DateId: idDate,
        StaffId: idStaff,
        SlotId: idSlot,
        Status: status,
        Email: email,
      };
      try {
        const res = await axios.put(
          "http://localhost:8800/api/appointment/update-cancel/" +
            idAppointment,
          data
        );
        toast.success("Successful cancellation of appointment");
        const reson = await axios.get(
          "http://localhost:8800/api/appointment/pending?UserId=" + user._id
        );
        setData(reson.data.value);
      } catch (error) {
        toast.error("Cancellation of appointment failed");
      }
    };

    return (
      <div className="view">
        <button
          className="button-view"
          onClick={() => {
            if (window.confirm("Are you sure to cancel this appointment?"))
              DeleteHandle(
                params.row._id,
                params.row.StaffId,
                params.row.DateId,
                params.row.SlotId,
                params.row.Email
              );
          }}
        >
          <MdFreeCancellation className="icon-view" style={{ color: "red" }} />
        </button>
      </div>
    );
  };

  // state columns of table
  const columns = useMemo(
    () => [
      {
        field: "date",
        headerName: "Date",
        width: 120,
      },
      {
        field: "slotTime",
        headerName: "Slot",
        width: 100,
      },
      {
        field: "Services",
        headerName: "Services",
        width: 120,
      },
      {
        field: "Staff",
        headerName: "Staff",
        width: 150,
      },

      {
        field: "Status",
        headerName: "Status",
        width: 90,
      },
      {
        field: "Action",
        width: 70,
        headerName: "Cancel",
        type: "actions",
        renderCell: (params) => <Cancel {...{ params, rowId, setRowId }} />,
      },
    ],
    [rowId]
  );

  return (
    <div className="appointment">
      <ToastContainer />
      {data.length > 0 ? (
        <div className="list-appointment">
          <span className="title-appointment"> List Appointment</span>
          <Table
            title={"Manager Service"}
            column={columns}
            row={data}
            rowId={rowId}
            setRowId={setRowId}
          />
        </div>
      ) : (
        <div className="list-appointment">
          <span className="title-appointment">List Appointment</span>
          <div className="no-appointment">You don't have appointment</div>
        </div>
      )}
    </div>
  );
}
