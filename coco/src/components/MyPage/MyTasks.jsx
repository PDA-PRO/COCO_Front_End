import React from "react";
import "./MyPage.css";
import { useNavigate } from "react-router-dom";
import {
  TiBatteryCharge,
  TiBatteryLow,
  TiBatteryMid,
  TiBatteryHigh,
  TiBatteryFull,
} from "react-icons/ti";
import { GoCheck, GoX, GoDash } from "react-icons/go";
import { BsTrash } from "react-icons/bs";
import { useAppSelector } from "../../app/store";
import { API } from "api/config";
import Swal from "sweetalert2";
import axios from "axios";

export const MyTasks = ({ props }) => {
  const userInfo = useAppSelector((state) => state.loginState);

  return (
    <div className="mp-FourthBox">
      <div className="BodyLeft">
        <div className="leftTop">
          <h4>No</h4>
          <h4>문제 제목</h4>
          <h4>난이도</h4>
          <h4>정답률</h4>
          <h4>Solve</h4>
        </div>

        <GetProblems resource={props} user={userInfo} />
      </div>
    </div>
  );
};

const GetProblems = ({ resource }) => {
  const problemList = resource;

  return (
    <>
      {problemList.map((e) => {
        return <MyTasksBox info={e} key={e.id} />;
      })}
      <div
        className="leftBottom"
        style={{
          borderRight: "2px solid rgb(198, 209, 235)",
          borderLeft: "2px solid rgb(198, 209, 235)",
          borderBottom: "2px solid rgb(198, 209, 235)",
        }}
      ></div>
    </>
  );
};

export const MyTasksBox = (info) => {
  const userInfo = useAppSelector((state) => state.loginState);
  const navigate = useNavigate();

  console.log(info.info);

  const goDetail = (e) => {
    navigate(`/problems/${e}`);
  };

  const deleteTask = (e) => {
    axios
      .delete(API.MYTASK, {
        params: {
          task_id: e,
        },
        headers: { Authorization: "Bearer " + userInfo.access_token },
      })
      .then((res) => {
        if (res.data === false) {
          Swal.fire({
            icon: "error",
            title: "내 문제집에서 삭제하지 못했습니다",
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "내 문제집에서 삭제하였습니다",
          });

          navigate(0);
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "내 문제집에서 삭제하지 못했습니다",
        });
      });
  };

  const setLevel = (e) => {
    switch (e) {
      case 1:
        return <TiBatteryLow size={35} color="rgb(98, 148, 255)" />;
      case 2:
        return <TiBatteryMid size={35} color="#9DD84B" />;
      case 3:
        return <TiBatteryHigh size={35} color="#ff7e00" />;
      case 4:
        return <TiBatteryFull size={35} color="red" />;
      case 5:
        return <TiBatteryCharge size={35} color="#7d1b7e" />;
    }
  };

  const solve = (e) => {
    if (e === 1) {
      return (
        <p style={{ margin: "0", textAlign: "center" }}>
          <GoCheck size={27} color="green" />
        </p>
      );
    } else if (e === -1) {
      return (
        <p style={{ margin: "0", textAlign: "center" }}>
          <GoX size={27} color="red" />
        </p>
      );
    } else {
      return (
        <p style={{ margin: "0", textAlign: "center" }}>
          <GoDash size={27} color="gray" />
        </p>
      );
    }
  };

  function removeSubstringFromStart(inputString, targetSubstring) {
    const index = inputString.indexOf(targetSubstring);

    if (index !== -1) {
      return inputString.slice(0, index).trim();
    }

    return inputString;
  }

  return (
    <div className="MyTasksBox">
      <h4 onClick={() => goDetail(info.info.id)}>No.{info.info.id}</h4>
      <h4
        style={{
          textOverflow: "ellipsis",
          maxWidth: "429px",
          textAlign: "center",
        }}
        onClick={() => goDetail(info.info.id)}
      >
        {removeSubstringFromStart(info.info.title, "wpc")}
      </h4>
      <h4>{setLevel(info.info.diff)}</h4>
      <h4
        style={{
          color:
            info.info.rate == 0
              ? "gray"
              : info.info.rate >= 40
              ? "skyblue"
              : "rgb(218, 55, 55)",
        }}
      >
        {info.info.rate}%
      </h4>

      <div style={{ margin: "0", textAlign: "center" }}>
        {solve(info.info.solved)}
      </div>
      <p style={{ margin: "0", textAlign: "center" }}>
        <BsTrash
          onClick={() => deleteTask(info.info.id)}
          size={19}
          color="red"
        />
      </p>
    </div>
  );
};
