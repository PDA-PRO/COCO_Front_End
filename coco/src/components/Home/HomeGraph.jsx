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

export const HomeGraph = ({ growth }) => {
  const getGrowth = () => {
    //맨 마지막 월 찾고 거기서 부터 계속 -1해가면서 저장
    let lastMonth = growth[0][0];
    if (lastMonth === "0000") {
      let tmp = new Date();
      lastMonth = tmp.getMonth() + 1;
    } else {
      lastMonth = lastMonth[2] + lastMonth[3];
    }
    var lineResult = [];

    for (let i = 0; i < growth.length; i++) {
      lineResult.push({
        name: month.at(lastMonth - 1 - i),
        "COCO point": growth[i][1],
      });
    }

    lineResult.reverse();

    return lineResult;
  };

  return (
    <div className="lineG" style={{ width: "100%" }}>
      <p>
        내 성장 그래프{" "}
        <span style={{ color: "gray", fontSize: "0.9em" }}>
          (난이도 x 문제 수)
        </span>
      </p>
      <ResponsiveContainer width="90%" height="100%">
        <LineChart
          data={getGrowth()}
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

const month = [
  "Jan.",
  "Feb.",
  "Mar.",
  "Apr.",
  "May.",
  "Jun.",
  "Jul.",
  "Aug.",
  "Sep.",
  "Oct.",
  "Nov.",
  "Dec.",
];
