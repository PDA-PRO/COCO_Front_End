import React, { useEffect } from "react";
import { useState } from "react";
import {
  TiBatteryCharge,
  TiBatteryLow,
  TiBatteryMid,
  TiBatteryHigh,
  TiBatteryFull,
} from "react-icons/ti";

export const DiffGraph = ({ diff }) => {
  const [data, setData] = useState([0, 0, 0, 0, 0]);
  useEffect(() => {
    setData([
      Math.round(diff["1"] * 100),
      Math.round(diff["2"] * 100),
      Math.round(diff["3"] * 100),
      Math.round(diff["4"] * 100),
      Math.round(diff["5"] * 100),
    ]);
  }, []);

  return (
    <div className="diffGraph">
      <h3>난이도 별 학습률</h3>
      <div className="graphBox">
        <div className="det">
          <TiBatteryCharge
            size={33}
            color="#7d1b7e"
            style={{ marginBottom: "3px" }}
          />
          <div className="barOrigin">
            <div className="barContent" style={{ width: `${data[4]}%` }}></div>
          </div>
          <p>{data[4]}%</p>
        </div>
        <div className="det">
          <TiBatteryFull
            size={33}
            color="red"
            style={{ marginBottom: "3px" }}
          />
          <div className="barOrigin">
            <div className="barContent" style={{ width: `${data[3]}%` }}></div>
          </div>
          <p>{data[3]}%</p>
        </div>
        <div className="det">
          <TiBatteryHigh
            size={33}
            color="#ff7e00"
            style={{ marginBottom: "3px" }}
          />
          <div className="barOrigin">
            <div className="barContent" style={{ width: `${data[2]}%` }}></div>
          </div>
          <p>{data[2]}%</p>
        </div>
        <div className="det">
          <TiBatteryMid
            size={33}
            color="#9DD84B"
            style={{ marginBottom: "3px" }}
          />
          <div className="barOrigin">
            <div className="barContent" style={{ width: `${data[1]}%` }}></div>
          </div>
          <p>{data[1]}%</p>
        </div>
        <div className="det">
          <TiBatteryLow
            size={33}
            color="rgb(98, 148, 255)"
            style={{ marginBottom: "3px" }}
          />
          <div className="barOrigin">
            <div className="barContent" style={{ width: `${data[0]}%` }}></div>
          </div>
          <p>{data[0]}%</p>
        </div>
      </div>

      <p id="exDiff">(각 난이도 별 내가 푼 문제 수 / 총 문제 수) </p>
    </div>
  );
};
