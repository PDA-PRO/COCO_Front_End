import React from "react";
import { useNavigate } from "react-router-dom";
import "./StatusList.css";

export const StatusListBox = (info) => {
  const navigate = useNavigate();

  const goDetail = (e) => {
    console.log(e);
    navigate(`/result/${e}`, { state: { info: info.info } });
  };
  var status = "대기";
  switch (info.info.status) {
    case 1:
      status = "대기";
      break;
    case 2:
      status = "채점중";
      break;
    case 3:
      status = "정답";
      break;
    case 4:
      status = "오답";
      break;
  }

  return (
    <div className="statusListBox">
      <div>{info.info.sub_id}</div>
      <div>{info.info.user_id}</div>
      <div>{info.info.task_id}</div>
      <div>{info.info.title}</div>
      <div
        className={"status s" + info.info.status}
        onClick={
          info.info.status > 2
            ? () => {
                goDetail(info.info.sub_id);
              }
            : () => {}
        }
      >
        {status}
      </div>
      <div>{info.info.time}</div>
    </div>
  );
};
