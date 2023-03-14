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

export const SecondBox = (props) => {
  console.log(props.props);
  const navigate = useNavigate();

  const movePage = (id) => {
    navigate(`/problems/${id}`);
  };

  const monthlyBarData = () => {
    var submitData = [];
    var solvedData = [];
    var growthData = [];
    let lastMonth = props.props.month_submit[0][0];
    if(lastMonth === "0000"){
      let tmp = new Date();
      lastMonth = tmp.getMonth()+1;
    }else{
      lastMonth = lastMonth[2] + lastMonth[3];
    }


    for (let i = 0; i < props.props.month_submit.length; i++) {
      //월별 제출수
      let submit_mon = props.props.month_submit[i][0];
      let month = getMonth(submit_mon, lastMonth);
      submitData.push([month, props.props.month_submit[i][1]]);

      //월별 정답 수
      let flag = true;
      for (let j = 0; j < props.props.month_solved.length; j++) {
        let solved_mon = props.props.month_solved[j][0];
        if (submit_mon === solved_mon) {
          //월별 제출수의 월과 월별 정답수의 월이 일치하면
          solvedData.push([solved_mon, props.props.month_solved[j][1]]);
          growthData.push(props.props.growth[j][1]); //누적 성장률
          flag = false;
        }
      }
      if (flag) {
        //월별 제출수의 월과 일치하지 않음
        solvedData.push([submit_mon, 0]); //맞춘 문제는 0
        if (i + 1 >= growthData.length) {
          growthData.push(0);
        } else {
          growthData.push(growthData[i + 1]); //내림차순 정렬되어있으므로 인덱스+1 원소값을 저장
        }
      }
    }

    var barResult = [];
    var lineResult = [];
    for (let i = 0; i <  submitData.length; i++) {
      barResult.push({
        name: month.at(lastMonth-1-i),
        "총 제출 수": submitData[i][1],
        "맞은 문제": solvedData[i][1],
      });
      lineResult.push({
        name: month.at(lastMonth-1-i),
        실력: growthData[i],
      });
    }

    barResult.reverse();
    lineResult.reverse();

    return [barResult, lineResult];
  };

  const graphData = monthlyBarData();

  return (
    <div className="mp-secBox">
      <div className="secBox-row">
        <h3>푼 문제 수 : {props.props.solved_list.length}</h3>
        <h3>정답률 : {props.props.rate}%</h3>
      </div>

      <div className="secBox-col">
        <h3> - 맞은 문제 리스트</h3>
        <div className="taskList-split">
          {props.props.solved_list.map((e) => {
            return <p onClick={() => movePage(e)}>No.{e}</p>;
          })}
        </div>
      </div>

      <div className="secBox-col">
        <h3> - 틀린 문제 리스트</h3>
        <div className="taskList-split2">
          {props.props.unsolved_list.map((e) => {
            return <p onClick={() => movePage(e)}>No.{e}</p>;
          })}
        </div>
      </div>

      <div className="secBox-col">
        <h3> - 월별 푼 문제 수</h3>

        <BarChart
          width={1000}
          height={400}
          data={graphData[0]}
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
          - 내 성장 그래프 <span>( 난이도 x 문제 수 )</span>
        </h3>

        <LineChart
          width={1000}
          height={400}
          data={graphData[1]}
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

const getMonth = (date, last) => {
  const thisMonth = parseInt(date[2] + date[3]);
  const lastMonth = parseInt(last[2] + last[3]);
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
  if (thisMonth === 0) {
    return month.at(lastMonth - 2);
  } else {
    return month[thisMonth - 1];
  }
};
