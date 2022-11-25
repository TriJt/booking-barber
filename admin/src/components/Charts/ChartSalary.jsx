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
  const start = `${current.getFullYear()}-${current.getMonth() + 1}-01`;

  const end = `${current.getFullYear()}-${current.getMonth() + 1}-30`;

  useEffect(() => {
    const data = {
      Start: start,
      End: end,
    };
    const fetData = async () => {
      const res = await axios.post(
        "http://localhost:8800/api/salary/chart-month",
        data
      );
      setData(res.data.value);
    };
    fetData();
  }, []);

  return (
    <div className="Total">
      <div className="top-total">
        <h4 className="header-total"> Salary in 30days </h4>
      </div>
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
            <Bar dataKey="totalAmount" fill="#bf925b" barSize={10} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
