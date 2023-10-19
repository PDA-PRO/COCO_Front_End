import React from "react";
import "./RoadMap.css";
import { useNavigate } from "react-router-dom";
import { API } from "api/config";
import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "../../../app/store";
const axios = require("axios")

export const RoadMap = ({ userID, path }) => {
  const userInfo = useAppSelector((state) => state.loginState);
  const { data } = useQuery(
    ["roadmaps"],
    () => {
      return axios.get(API.ROOMROADMAP + path, {
        headers: { Authorization: "Bearer " + userInfo.access_token },
      });
    },
    {
      suspense: true,
    }
  );
  const info = data.data;
  return (
    <div className="roadMap">
      {info.room_info.map((e) => {
        return <Road info={e} key={e.id} solve={info.solved_task} />;
      })}
    </div>
  );
};

const Road = (props) => {
  const data = props.info;
  var solve = props.solve;

  var allTasks = data.tasks;
  var tasksLength = allTasks.length;
  var converted = allTasks.filter((x) => solve.includes(x));
  var cnt = converted.length;
  var percentage = ((cnt / tasksLength) * 100).toFixed(1);
  var date = data.last_modify.slice(0, 10);

  var path = window.location.pathname;
  path = path.split("/");

  const navigate = useNavigate();

  return (
    <div
      className="road"
      style={
        percentage === 100
          ? { borderColor: "#afaefa" }
          : { borderColor: "lightgray" }
      }
      onClick={() => navigate(`/room/roadmap/${path.at(-1)}/${data.id}`)}
    >
      <h4>{data.name}</h4>
      <div className="tasks">
        <p>
          학습 달성률 : <span style={{ color: "blue" }}>{percentage}%</span>
        </p>
        <p>
          {cnt} / {tasksLength}
        </p>
      </div>
      <div className="barOrigin">
        <div className="barContent" style={{ width: `${percentage}%` }}></div>
      </div>
      <p>마지막 업데이트 날짜 : {date}</p>
    </div>
  );
};
