import React from "react";
import "./Group.css";
import { useLocation, useNavigate } from "react-router-dom";

export const AllGroupBox = (info) => {
  const navigate = useNavigate();

  const GoInfo = (e) => {
    navigate(`/group/${e}`);
  };

  return (
    <div className="allGroupList" onClick={() => GoInfo(info.info.id)}>
      <div className="groupListTop">
        <p>{info.info.id}위</p>
        <p>{info.info.name}</p>
        <p>{info.info.members}명</p>
        <p>{info.info.leader}</p>
        <p>{info.info.id}점</p>
      </div>
      <div className="groupListBottom">
        <p>{info.info.desc}</p>
      </div>
    </div>
  );
};
