import React from "react";
import { BsPersonCheck, BsPersonX } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";

export const TutorApp = () => {
  return (
    <>
      <h2 className="mTi">TUTOR APPLICATION</h2>
      <div className="m-upload">
        <div className="divide-box2">
          <div className="box">
            <p>튜터 신청 목록</p>
            <div className="tgridTop">
              <p>ID</p>
              <p>학습 달성률 (1~5)</p>
              <p>승인</p>
            </div>
            <Applier />
          </div>
          <div className="box">
            <p>튜터 목록</p>
            <div className="tmemHead">
              <p>ID</p>
              <p>권한 제거</p>
            </div>
            <TMem />
          </div>
        </div>
      </div>
    </>
  );
};

const Applier = () => {
  const navigate = useNavigate();

  const addTutor = () => {
    alert("튜터에 추가되었습니다.");
  };

  return (
    <div className="tutorGrid">
      <p onClick={() => navigate(`/mypage/id1`)} style={{ cursor: "pointer" }}>
        id1
      </p>
      <p style={{ color: "rgb(98, 148, 255)" }}>1/2</p>
      <p style={{ color: "#9DD84B" }}>1/3</p>
      <p style={{ color: "#ff7e00" }}>1/5</p>
      <p style={{ color: "red" }}>1/6</p>
      <p style={{ color: "#7d1b7e" }}>1/8</p>
      <p className="confirm" onClick={() => addTutor()}>
        <BsPersonCheck size={30} color="rgb(98, 148, 255)" />
      </p>
      <p style={{ color: "gray" }}>사유</p>
      <p className="reas">testing</p>
    </div>
  );
};

const TMem = () => {
  const navigate = useNavigate();
  const delTutor = () => {
    alert("튜터에서 제거되었습니다.");
  };

  return (
    <div className="tmem">
      <p onClick={() => navigate(`/mypage/id1`)}>id1</p>
      <p onClick={() => delTutor()}>
        <BsPersonX size={23} color="red" />
      </p>
    </div>
  );
};
