import React from "react";
import "./Group.css";
import { Header } from "../Home/Header";
import { Footer } from "../Home/Footer";
import { useLocation, useNavigate } from "react-router-dom";

export const Group = () => {
  const navigate = useNavigate();
  const reload = () => {
    navigate(0);
  };

  return (
    <>
      <Header />
      <div className="group">
        <div className="group-Body">
          <div className="groupTop">
            <img
              src="/image/sm.png"
              height="80px"
              alt=""
              onClick={() => reload()}
              style={{ cursor: "pointer" }}
            />
            <h4 onClick={() => reload()} style={{ cursor: "pointer" }}>
              COCO GROUP
            </h4>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
