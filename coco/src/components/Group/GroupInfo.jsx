import React from "react";
import "./GroupInfo.css";
import { Header } from "../Home/Header";
import { Footer } from "../Home/Footer";

export const GroupInfo = () => {
  const path = window.location.pathname.split("/");

  return (
    <>
      <Header />
      <div className="groupInfo">
        <div className="gi">
          <GiHeader />
        </div>
      </div>
      <Footer />
    </>
  );
};

const GiHeader = () => {
  return (
    <div className="gi-head">
      <div>
        <img src="\image\group.png" height="73px" />
        <h2>그룹 명</h2>
      </div>

      <div>
        <p>전체 그룹 랭킹 : 3위</p>
        <p>현재 그룹원 수 : 7명</p>
        <p>그룹 장 : id님</p>
      </div>
    </div>
  );
};
