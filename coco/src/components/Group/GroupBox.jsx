import React from "react";
import "./Group.css";
import { useNavigate } from "react-router-dom";

export const GroupBox = (info) => {
  const navigate = useNavigate();

  const GoInfo = (e) => {
    navigate(`/room/${e}`);
  };

  return (
    <div className="myGroupList" onClick={() => GoInfo(info.info.id)}>
      <p>{info.info.ranking}위</p>
      <p>{info.info.name}</p>
      <p>{info.info.members}명</p>
      <p>{info.info.leader}</p>
      <p>{info.info.exp}점</p>
    </div>
  );
};
