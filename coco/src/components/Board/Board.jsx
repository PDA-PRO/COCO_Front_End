import React from "react";
import "./Board.css";
import { useState } from "react";
import { Header } from "../Home/Header";
import { Footer } from "../Home/Footer";
import { BoardBody } from "./BoardBody";
import { SlPencil } from "react-icons/sl";
import { IoChatbubblesOutline } from "react-icons/io5";
import { WriteGeul } from "./WriteGeul/WriteGuel";
import { useNavigate } from "react-router-dom";

export const Board = () => {
  const navigate = useNavigate();

  const movePage = () => {
    navigate("/write");
  };
  // ---------------------------------- 카테고리 변경 State ----------------------
  return (
    <div className="board">
      <Header />
      <div className="boardContent">
        {/* title+카테고리 */}
        <div className="boardHead">
          <div className="boardTitle">
            <IoChatbubblesOutline size={50} color="navy" />
            <h2>COCO community</h2>
          </div>
          <div
            className="boardOn"
            onClick={() => {
              movePage();
            }}
          >
            <SlPencil size={22} />
            <h3>글쓰기</h3>
          </div>
        </div>
        {/* title+카테고리 */}

        <BoardBody />
      </div>
      <Footer />
    </div>
  );
};
