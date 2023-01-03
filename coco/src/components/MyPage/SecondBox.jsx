import "./MyPage.css";
import { useNavigate } from "react-router-dom";
import React from "react";
import {
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

export const SecondBox = () => {
  const navigate = useNavigate();

  const movePage = (id) => {
    navigate(`/problems/${id}`);
  };

  const BarData = [
    {
      name: "Jan.",
      "총 제출 수": 10,
      "맞은 문제": 6,
    },
    {
      name: "Feb.",
      "총 제출 수": 3,
      "맞은 문제": 3,
    },
    {
      name: "Mar.",
      "총 제출 수": 1,
      "맞은 문제": 0,
    },
    {
      name: "Apr.",
      "총 제출 수": 12,
      "맞은 문제": 6,
    },
    {
      name: "May",
      "총 제출 수": 15,
      "맞은 문제": 6,
    },
    {
      name: "Jun",
      "총 제출 수": 7,
      "맞은 문제": 6,
    },
    {
      name: "Jul.",
      "총 제출 수": 4,
      "맞은 문제": 2,
    },
    {
      name: "Aug.",
      "총 제출 수": 9,
      "맞은 문제": 8,
    },
  ];

  const LineData = [
    {
      name: "Jan.",
      실력: 100,
    },
    {
      name: "Feb.",
      실력: 120,
    },
    {
      name: "Mar.",
      실력: 140,
    },
    {
      name: "Apr.",
      실력: 300,
    },
    {
      name: "May",
      실력: 320,
    },
    {
      name: "Jun",
      실력: 370,
    },
    {
      name: "Jul",
      실력: 390,
    },
    {
      name: "Aug.",
      실력: 510,
    },
  ];

  return (
    <div className="mp-secBox">
      <div className="secBox-row">
        <h3>푼 문제 수 : 245</h3>
        <h3>정답률 : 34%</h3>
      </div>

      <div className="secBox-col">
        <h3>맞은 문제 리스트</h3>
        <div className="taskList-split">
          <p onClick={() => movePage(1)}>No.1</p>
          <p onClick={() => movePage(2)}>No.2</p>
          <p onClick={() => movePage(3)}>No.3</p>
        </div>
      </div>

      <div className="secBox-col">
        <h3>월별 푼 문제 수</h3>

        <BarChart
          width={1000}
          height={400}
          data={BarData}
          margin={{
            top: 30,
            right: 20,
            left: 20,
            bottom: 5,
          }}
          barGap={8}
          barCategoryGap={20}
        >
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="총 제출 수" fill="#8884d8" />
          <Bar dataKey="맞은 문제" fill="#82ca9d" />
        </BarChart>
      </div>

      <div className="secBox-col">
        <h3>
          내 성장 그래프 <span>( 난이도 x 문제 수 )</span>
        </h3>

        <LineChart
          width={1000}
          height={400}
          data={LineData}
          margin={{
            top: 30,
            right: 20,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="실력"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </div>
    </div>
  );
};
