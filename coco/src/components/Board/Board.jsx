import React from "react";
import "./Board.css";
import { Header } from "../Home/Header";
import { Footer } from "../Home/Footer";
import { IoClipboard } from "react-icons/io5";

export const Board = () => {
  return (
    <div className="board">
      <Header />
      <div className="boardContent">
        {/* title+카테고리 */}
        <div className="boardHead">
          <div className="boardTitle">
            <img src="./image/corkboard.png" alt="게시판" />
            <h2>COCO 게시판</h2>
          </div>
          <div className="boardMenu">
            <li>공지</li>
            <li>자유</li>
            <li>Help</li>
            <li>ALL</li>
          </div>
        </div>
        {/* title+카테고리 */}

        {/* 내부 -> li 누를 때 마다 변경 */}
        <div className="boardBody"></div>
      </div>
      <Footer />
    </div>
  );
};
