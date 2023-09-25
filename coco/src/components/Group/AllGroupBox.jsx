import React from "react";
import "./Group.css";
import { useNavigate } from "react-router-dom";

export const AllGroupBox = (info) => {
  const navigate = useNavigate();

  return (
    <div
      className="allGroupList"
      onClick={() => navigate(`/room/${info.info.id}`)}
    >
      <div className="groupListTop">
        <p>{info.info.ranking}위</p>
        <p>{info.info.name}</p>
        <p>{info.info.members}명</p>
        <p>{info.info.leader}</p>
        <p>{info.info.exp}점</p>
      </div>
      <div className="groupListBottom">
        <p>{info.info.desc}</p>
      </div>
    </div>
  );
};
