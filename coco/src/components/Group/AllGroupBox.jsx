import React from "react";
import "./Group.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/store";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export const AllGroupBox = (info) => {
  const navigate = useNavigate();
  const userInfo = useAppSelector((state) => state.loginState);

  const GoInfo = (e) => {
    axios
      .post("http://127.0.0.1:8000/group/check_member/", {
        user_id: userInfo.id,
        group_id: e,
      })
      .then((res) => {
        if (res.data === true) {
          navigate(`/group/${e}`);
        } else {
          alert("가입되어있지 않은 스터디룸 입니다.");
          // const result = window.confirm(
          //   "가입되지 않은 그룹입니다\n가입하시겠습니까"
          // );
          // if (result === true) {
          //   const message = window.prompt("가입 문구를 작성해주세요");
          //   axios
          //     .post("http://127.0.0.1:8000/group/join_group/", {
          //       user_id: userInfo.id,
          //       group_id: e,
          //       message: message,
          //     })
          //     .then((res) => {
          //       const result = res.data;
          //       if (result === false) {
          //         alert("이미 가입 신청한 그룹입니다");
          //       } else {
          //         alert("가입 신청이 완료되었습니다.");
          //         navigate("/group/");
          //       }
          //     })
          //     .catch(() => {
          //       alert("그룹 가입에 실패하였습니다.");
          //     });
          // }
        }
      })
      .catch(() => {
        alert("그룹 확인에 실패하였습니다");
      });
  };

  return (
    <div className="allGroupList" onClick={() => GoInfo(info.info.id)}>
      <div className="groupListTop">
        <p>{info.info.id}위</p>
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
