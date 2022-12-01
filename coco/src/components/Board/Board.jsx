import React from "react";
import "./Board.css";
import { useState } from "react";
import { Header } from "../Home/Header";
import { Footer } from "../Home/Footer";
import { BsChatDots } from "react-icons/bs";
import { BoardBody } from "./BoardBody";
import { SlPencil } from "react-icons/sl";

export const Board = () => {
  // ---------------------------------- 카테고리 변경 State ----------------------
  const [cate, setCate] = useState(3);

  const changeCategory = (e) => {
    setCate(e);
  };

  // ---------------------------------- 카테고리 변경 State ----------------------
  return (
    <div className="board">
      <Header />
      <div className="boardContent">
        {/* title+카테고리 */}
        <div className="boardHead">
          <div className="boardTitle">
            <BsChatDots size={50} color="navy" />
            <h2>COCO community</h2>
          </div>
          <div className="boardOn">
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
