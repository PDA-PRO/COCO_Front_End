import React from "react";
import {
  ComposedChart,
  LineChart,
  Line,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const HomeGraph = () => {
  let now = new Date();
  let todayMonth = now.getMonth();

  const returnMonth = (e) => {
    const month = [
      "Jan.",
      "Feb.",
      "Mar.",
      "Apr.",
      "May.",
      "Jun.",
      "Jul.",
      "Aug.",
      "Sept.",
      "Oct.",
      "Nov.",
      "Dec.",
    ];

    if (e >= 0 && e <= 11) {
      return month[e];
    } else {
      let val = e + 12;
      return month[val];
    }
  };

  const data = [
    {
      name: returnMonth(todayMonth - 5),
      "COCO point": 150,
    },
    {
      name: returnMonth(todayMonth - 4),
      "COCO point": 180,
    },
    {
      name: returnMonth(todayMonth - 3),
      "COCO point": 210,
    },
    {
      name: returnMonth(todayMonth - 2),
      "COCO point": 224,
    },
    {
      name: returnMonth(todayMonth - 1),
      "COCO point": 250,
    },
    {
      name: returnMonth(todayMonth),
      "COCO point": 330,
    },
  ];

  return (
    <div className="lineG" style={{ width: "100%" }}>
      <p>내 성장 그래프</p>
      <ResponsiveContainer width="90%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 3, right: 0, left: 0, bottom: 5 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid stroke="lightgray" />

          <Line
            type="monotone"
            dataKey="COCO point"
            stroke="rgb(98, 148, 255)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
