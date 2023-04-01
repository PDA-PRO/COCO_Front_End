import React from "react";
import "./Students.css";
import { Header } from "../Home/Header";
import { Footer } from "../Home/Footer";
import { useLocation, useNavigate } from "react-router-dom";

export const Students = () => {
  const navigate = useNavigate();
  const reload = (e) => {
    navigate(0);
  };

  return (
    <>
      <Header />
      <div className="manageStudents">
        <div className="ms-Body">
          <div className="msTop">
            <img
              src="/image/sm.png"
              height="80px"
              alt=""
              onClick={() => reload()}
              style={{ cursor: "pointer" }}
            />
            <h4 onClick={() => reload()} style={{ cursor: "pointer" }}>
              COCO STUDENT MANAGEMENT
            </h4>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
