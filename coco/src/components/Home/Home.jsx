import React from "react";
import "./Home.css";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useNavigate } from "react-router-dom";
import { SlPin } from "react-icons/sl";

export const Home = () => {

  return (
    <div className="home">
      <Header />
      <div className="homebody">
        <div className="home-body">
          <div className="txt-box">
            <h2 id="t1">코딩, 초보자라면?</h2>
            <h2 id="t2"><span id="t2-1">COCO </span>와 함께!</h2>
          </div>

          <div className="notice">
            <div className="title-notice">
              <SlPin size={30} color="red" />
              <h2>Notice!</h2>
            </div>
            <div className="body-notice">
              <li>ver 0.1.0 - Beta Open!</li>
              <li>November 11, midterm presentation</li>
              <li>New Question! : No.01 더하기 문제</li>
            </div>
          </div>

          <div className="ad-box">
            <h2>광고배너</h2>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};
