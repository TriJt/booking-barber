import React, { useEffect, useState } from "react";
import "../../styles/components/chart.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

export default function Charts() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetData = async () => {
      const res = await axios.get("http://localhost:8800/api/receipt/date");
      setData(res.data.value);
    };
    fetData();
  }, []);

  return (
    <div className="Charts">
      <ResponsiveContainer width="100%" height="100%" textSize={11}>
        <LineChart
          width={300}
          height={100}
          data={data}
          margin={{ top: 20, right: 5, left: 5, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis />
          <Line
            type="monotone"
            dataKey="totalAmount"
            stroke="#8884d8"
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
