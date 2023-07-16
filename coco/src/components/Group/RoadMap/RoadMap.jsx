import React from "react";
import "./RoadMap.css";
import { grey } from "@mui/material/colors";

export const RoadMap = () => {
  return (
    <div className="roadMap">
      <div className="road">
        <h4>로드맵 제목</h4>
        <p style={{ color: "gray" }}>로드맵 설명</p>
        <div className="tasks">
          <p>
            학습 달성률 : <span style={{ color: "blue" }}>75%</span>
          </p>
          <p>3 / 4</p>
        </div>
        <p>마지막 업데이트 날짜 : 2023-07-11</p>
      </div>

      <div className="road">
        <h4>로드맵 제목</h4>
        <p style={{ color: "gray" }}>로드맵 설명</p>
        <div className="tasks">
          <p>
            학습 달성률 : <span style={{ color: "blue" }}>75%</span>
          </p>
          <p>3 / 4</p>
        </div>
        <p>마지막 업데이트 날짜 : 2023-07-11</p>
      </div>

      <div className="road">
        <h4>로드맵 제목</h4>
        <p style={{ color: "gray" }}>로드맵 설명</p>
        <div className="tasks">
          <p>
            학습 달성률 : <span style={{ color: "blue" }}>75%</span>
          </p>
          <p>3 / 4</p>
        </div>
        <p>마지막 업데이트 날짜 : 2023-07-11</p>
      </div>
    </div>
  );
};
