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

export const ProblemBox = (info) => {
  const navigate = useNavigate();
  const goDetail = (e) => {
    navigate(`/problems/${e}`);
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

  return (
    <div className="problemsBox" onClick={() => goDetail(info.info.id)}>
      <h4>No.{info.info.id}</h4>
      <h4>{info.info.title}</h4>
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
    </div>
  );
};
