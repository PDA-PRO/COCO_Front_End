import React from "react";
import "./Group.css";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/store";

export const AllGroupBox = (info) => {
  const navigate = useNavigate();
  const userInfo = useAppSelector((state) => state.loginState);
  return (
    <div
      className={
        "allGroupList " + (userInfo.id === "" ? "" : "allGroupListHover")
      }
      onClick={() =>
        userInfo.id === "" ? null : navigate(`/room/${info.info.id}`)
      }
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
