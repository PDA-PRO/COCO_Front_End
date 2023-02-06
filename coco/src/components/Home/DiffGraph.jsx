import React from "react";
import {
  TiBatteryCharge,
  TiBatteryLow,
  TiBatteryMid,
  TiBatteryHigh,
  TiBatteryFull,
} from "react-icons/ti";

export const DiffGraph = () => {
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
            <div className="barContent" style={{ width: "10%" }}></div>
          </div>
          <p>10%</p>
        </div>
        <div className="det">
          <TiBatteryFull
            size={33}
            color="red"
            style={{ marginBottom: "3px" }}
          />
          <div className="barOrigin">
            <div className="barContent" style={{ width: "20%" }}></div>
          </div>
          <p>20%</p>
        </div>
        <div className="det">
          <TiBatteryHigh
            size={33}
            color="#ff7e00"
            style={{ marginBottom: "3px" }}
          />
          <div className="barOrigin">
            <div className="barContent" style={{ width: "10%" }}></div>
          </div>
          <p>10%</p>
        </div>
        <div className="det">
          <TiBatteryMid
            size={33}
            color="#9DD84B"
            style={{ marginBottom: "3px" }}
          />
          <div className="barOrigin">
            <div className="barContent" style={{ width: "25%" }}></div>
          </div>
          <p>25%</p>
        </div>
        <div className="det">
          <TiBatteryLow
            size={33}
            color="rgb(98, 148, 255)"
            style={{ marginBottom: "3px" }}
          />
          <div className="barOrigin">
            <div className="barContent" style={{ width: "35%" }}></div>
          </div>
          <p>35%</p>
        </div>
      </div>
    </div>
  );
};
