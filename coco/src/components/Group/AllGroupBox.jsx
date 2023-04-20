import React from "react";
import "./Group.css";

export const AllGroupBox = (info) => {
  console.log(info.info);
  return (
    <div className="allGroupList">
      <div className="groupListTop">
        <p>{info.info.id}위</p>
        <p>{info.info.name}</p>
        <p>{info.info.members}명</p>
        <p>{info.info.id}점</p>
      </div>
      <div className="groupListBottom">
        <p>{info.info.desc}</p>
      </div>
    </div>
  );
};
