import React from "react";
import "./Group.css";

export const AllGroupBox = (info) => {
  return (
    <div className="allGroupList">
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
