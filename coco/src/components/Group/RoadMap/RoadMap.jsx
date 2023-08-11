import React from "react";
import "./RoadMap.css";
import axios from "axios";

export const RoadMap = ({ resource }) => {
  const info = resource.read();
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
  console.log(converted);
  var cnt = converted.length;
  var percentage = ((cnt / tasksLength) * 100).toFixed(1);
  var date = data.last_modify.slice(0, 10);

  return (
    <div
      className="road"
      style={
        percentage === 100
          ? { borderColor: "#afaefa" }
          : { borderColor: "lightgray" }
      }
    >
      <h4>{data.name}</h4>
      <p style={{ color: "gray" }}>{data.desc}</p>
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
