import React from "react";
import axios from "axios";
import { Pie, PieChart, Legend, ResponsiveContainer, Cell } from "recharts";
import { useState } from "react";
import { useEffect } from "react";

export default function ChartPie() {
  const [data, setData] = useState([]);
  const current = new Date();
  const start = `${current.getFullYear()}-${current.getMonth() + 1}-01`;

  const end = `${current.getFullYear()}-${current.getMonth() + 1}-30`;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = {
  //       Start: start,
  //       End: end,
  //     };
  //     const res = await axios.post(
  //       "http://localhost:8800/api/appointment/pie-chart",
  //       data
  //     );
  //     setData(res.data.value);
  //   };
  //   fetchData();
  // }, []);
  // const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div>
      <ResponsiveContainer width={400} height={400}>
        <PieChart width={400} height={400}>
          <Legend layout="vertical" verticalAlign="top" align="top" />
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                // fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
