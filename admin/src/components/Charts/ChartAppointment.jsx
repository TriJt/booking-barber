import React, { useEffect, useState } from "react";
import "../../styles/components/totalBooking.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

export default function TotalBooking() {
  // data for recharts
  const [data, setData] = useState([]);
  const current = new Date();
  const start = `${current.getFullYear()}-${
    current.getMonth() + 1
  }-${current.getDate()}`;
  const end = `${current.getFullYear()}-${current.getMonth() + 1}-${
    current.getDate() + 1
  }`;

  useEffect(() => {
    const data = {
      Start: start,
      End: end,
    };
    const fetData = async () => {
      const res = await axios.post(
        "http://localhost:8800/api/appointment/chart",
        data
      );
      setData(res.data.value);
    };
    fetData();
  }, []);

  return (
    <div className="Total">
      <div className="top-total">
        <h4 className="header-receipt width-total">
          Schedule of appointments for the day
        </h4>
      </div>
      {data.length > 0 ? (
        <div className="bottom-total">
          <ResponsiveContainer
            width="100%"
            height="90%"
            margin={{
              top: 20,
              right: 5,
              left: 5,
              bottom: 5,
            }}
          >
            <BarChart width="100%" height="75%" data={data}>
              <XAxis dataKey="_id" style={{ fontSize: "11px" }} />
              <YAxis />
              <Tooltip />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5 " />
              <Bar dataKey="count" fill="#bf925b" barSize={10} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="check-table">
          You don't have an appointment today!!!
        </div>
      )}
    </div>
  );
}
