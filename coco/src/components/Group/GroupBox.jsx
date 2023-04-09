import React from "react";
import "./Group.css";

export const GroupBox = (info) => {
  return (
    <div className="myGroupList">
      <p>{info.info.id}위</p>
      <p>{info.info.name}</p>
      <p>{info.info.members}명</p>
      <p>{info.info.id}점</p>
    </div>
  );
};
