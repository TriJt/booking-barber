import axios from "axios";
import { useState, useEffect, useContext, useMemo } from "react";
import { AuthContext } from "./../../context/AuthContext";
import "../../styles/components/profile/appointment.css";
import Table from "../Table/Table";

export default function History() {
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(currentUser);
  const [data, setData] = useState([]);
  const [rowId, setRowId] = useState("");

  useEffect(() => {
    const fetchAppointment = async () => {
      const res = await axios.get(
        "http://localhost:8800/api/appointment/cancel?UserId=" + user._id
      );
      setData(res.data.value);
    };
    fetchAppointment();
  }, [user._id]);

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
    ],
    [rowId]
  );

  return (
    <div className="appointment">
      {data ? (
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
