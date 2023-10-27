import React from "react";
import "./Problems.css";
import { useNavigate } from "react-router-dom";
import {
  TiBatteryCharge,
  TiBatteryLow,
  TiBatteryMid,
  TiBatteryHigh,
  TiBatteryFull,
} from "react-icons/ti";
import { BsJournalPlus, BsJournalMinus } from "react-icons/bs";
import {
  AiOutlineCheckCircle,
  AiOutlineMinusCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import Swal from "sweetalert2";

export const ProblemBox = ({
  info,
  type,
  addProblems,
  deleteProblem,
  check,
}) => {
  const navigate = useNavigate();
  {
    /* 문제 이동 새 페이지로 열어서 */
  }
  const goDetail = (e) => {
    navigate(`/problems/${e}`);
  };

  const goDetail2 = (e) => {
    var normal_path = "http://localhost:3000/";
    window.open(`${normal_path}problems/${e}`);
  };

  function removeSubstringFromStart(inputString, targetSubstring) {
    const index = inputString.indexOf(targetSubstring);

    if (index !== -1) {
      return inputString.slice(0, index).trim();
    }

    return inputString;
  }

  const nothing = () => {};

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

  return (
    <div
      className={
        type === 0
          ? "problemsBox"
          : type === 1
          ? "problemsBox_type1"
          : type === 2
          ? "problemsBox_type2"
          : "problemsBox_type3"
      }
      onClick={() => {
        type === 0 || type === 3 ? goDetail(info.id) : nothing();
      }}
    >
      <h4>No.{info.id}</h4>
      <h4
        onClick={() => {
          type === 1 || type === 2 ? goDetail2(info.id) : nothing();
        }}
      >
        {removeSubstringFromStart(info.title, "wpc")}
      </h4>
      <h4>{setLevel(info.diff)}</h4>
      <h4
        style={{
          color:
            info.rate == 0
              ? "gray"
              : info.rate >= 40
              ? "skyblue"
              : "rgb(218, 55, 55)",
        }}
      >
        {info.rate}%
      </h4>
      {type === 1 ? (
        <h4 onClick={() => addProblems(info)}>
          <BsJournalPlus size={23} color="purple" />
        </h4>
      ) : type === 2 ? (
        <h4 onClick={() => deleteProblem(info.id)}>
          <BsJournalMinus size={23} color="red" />
        </h4>
      ) : type === 3 || type === 0 ? (
        <h4>
          {check === 1 ? (
            <AiOutlineCheckCircle size={23} color="#1876FB" />
          ) : check === 0 ? (
            <AiOutlineMinusCircle size={23} color="lightgray" />
          ) : (
            <AiOutlineCloseCircle size={23} color="red" />
          )}
        </h4>
      ) : (
        <></>
      )}
    </div>
  );
};
