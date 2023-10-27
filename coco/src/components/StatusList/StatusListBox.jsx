import React from "react";
import { useNavigate } from "react-router-dom";
import "./StatusList.css";
import {
  TiBatteryCharge,
  TiBatteryLow,
  TiBatteryMid,
  TiBatteryHigh,
  TiBatteryFull,
} from "react-icons/ti";
import {
  BiX,
  BiCircle,
  BiPause,
  BiDotsHorizontalRounded,
} from "react-icons/bi";
import { useAppSelector } from "../../app/store";

export const StatusListBox = (info) => {
  const navigate = useNavigate();
  const userInfo = useAppSelector((state) => state.loginState);
  const canHover =
    ((info.info.is_solved && userInfo.id !== "") ||
      info.info.user_id === userInfo.id) &&
    info.info.status > 2;
  const goDetail = (e) => {
    navigate(`/result/${e}`, { state: { info: info.info } });
  };

  function removeSubstringFromStart(inputString, targetSubstring) {
    const index = inputString.indexOf(targetSubstring);

    if (index !== -1) {
      return inputString.slice(0, index).trim();
    }

    return inputString;
  }

  var status = "대기";
  switch (info.info.status) {
    case 1:
      status = "대기";
      break;
    case 2:
      status = "채점중";
      break;
    case 3:
      status = "정답";
      break;
    case 4:
      status = "오답";
      break;
  }

  const setScore = (e) => {
    switch (e) {
      case 1:
        return (
          <div className="status">
            <BiPause size={22} color="green" />
            <h5 style={{ color: "green" }}>대기</h5>
          </div>
        );
      case 2:
        return (
          <div className="status">
            <BiDotsHorizontalRounded size={20} color="rgb(104, 104, 104)" />
            <h5 style={{ color: "rgb(104, 104, 104)" }}>채점중</h5>
          </div>
        );
      case 3:
        return (
          <div className="status">
            <BiCircle size={22} color="rgb(98, 148, 255)" />
            <h5 style={{ color: "rgb(98, 148, 255)" }}>정답</h5>
          </div>
        );
      case 4:
        return (
          <div className="status">
            <BiX size={22} color="red" style={{ marginBottom: "1px" }} />
            <h5 style={{ color: "red" }}>오답</h5>
          </div>
        );
    }
  };

  const setLevel = (e) => {
    switch (e) {
      case 1:
        return (
          <TiBatteryLow
            size={30}
            color="rgb(98, 148, 255)"
            style={{ marginBottom: "1px" }}
          />
        );
      case 2:
        return <TiBatteryMid size={30} color="#9DD84B" />;
      case 3:
        return <TiBatteryHigh size={30} color="#ff7e00" />;
      case 4:
        return <TiBatteryFull size={30} color="red" />;
      case 5:
        return <TiBatteryCharge size={30} color="#7d1b7e" />;
    }
  };

  const lan = (e) => {
    if (e === 1) {
      return (
        <div>
          <img src="./image/lan_c.png" height="27px" alt="" />
        </div>
      );
    } else {
      return (
        <div>
          <img src="./image/python.png" height="27px" alt="" />
        </div>
      );
    }
  };

  const remakeString = (e) => {
    let ymd = e.substring(0, 10);
    let time = e.substring(11);
    let year = ymd.split("-")[0].substring(2);
    let month = ymd.split("-")[1];
    let day = ymd.split("-")[2];
    let result = year + "년 " + month + "월 " + day + "일 " + time;
    return result;
  };

  return (
    <div
      className={"statusListBox" + (canHover ? " statusListBoxHover" : "")}
      onClick={
        canHover
          ? () => {
              goDetail(info.info.sub_id);
            }
          : () => {}
      }
    >
      <h5>{info.info.sub_id}</h5>
      <h5>{info.info.user_id}</h5>
      <h5>
        No. {info.info.task_id}
        <span>{setLevel(info.info.diff)}</span>
      </h5>
      <h5
        style={{
          textOverflow: "ellipsis",
          maxWidth: "223px",
          textAlign: "center",
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        {removeSubstringFromStart(info.info.title, "wpc")}
      </h5>
      <h5>{lan(info.info.lang)}</h5>
      <h5>{setScore(info.info.status)}</h5>
      <h5>{remakeString(info.info.time)}</h5>
    </div>
  );
};
