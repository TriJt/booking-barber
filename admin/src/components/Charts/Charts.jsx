import React, { useEffect, useState } from "react";
import "../../styles/components/chart.css";
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

export default function Charts() {
  const [data, setData] = useState([]);

  const current = new Date();

  const start_month = `${current.getFullYear()}-${current.getMonth() + 1}-01`;

  const end_month = `${current.getFullYear()}-${current.getMonth() + 1}-30`;

  useEffect(() => {
    const dataMonth = {
      Start: start_month,
      End: end_month,
    };
    const fetData = async () => {
      const res = await axios.post(
        "http://localhost:8800/api/receipt/week",
        dataMonth
      );
      setData(res.data.value);
    };
    fetData();
  }, []);

  return (
    <div className="Charts">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={300}
          height={100}
          data={data}
          margin={{ top: 20, right: 10, left: 5, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip fontSize={5} />
          <Bar
            type="monotone"
            dataKey="totalAmount"
            stroke="#bf925b"
            fill="#bf925b"
            barSize={20}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
