import React from "react";
import "./Board.css";
import { useState } from "react";
import { Header } from "../Home/Header";
import { Footer } from "../Home/Footer";
import { IoClipboard } from "react-icons/io5";
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
            <img src="./image/corkboard.png" alt="게시판" />
            <h2>COCO community</h2>
          </div>
          <div className="boardMenu">
            <li
              onClick={() => {
                changeCategory(0);
              }}
            >
              공지
            </li>
            <li
              onClick={() => {
                changeCategory(1);
              }}
            >
              자유
            </li>
            <li
              onClick={() => {
                changeCategory(2);
              }}
            >
              Help
            </li>
            <li
              onClick={() => {
                changeCategory(3);
              }}
            >
              ALL
            </li>
          </div>
        </div>
        {/* title+카테고리 */}

        {/* 글쓰게 + 내가 쓴 글 보기 */}
        <div className="boardOn">
          <SlPencil size={22} />
          <h3>글쓰기</h3>
        </div>
        {/* 글쓰게 + 내가 쓴 글 보기 */}

        {/* 내부 -> li 누를 때 마다 변경 */}
        <div className="boardContentTop">
          <h2>Title</h2>
          <h2>Category</h2>
          <h2>글쓴이</h2>
          <h2>댓글 수</h2>
          <h2>작성 시간</h2>
        </div>
        <BoardBody props={cate} />
      </div>
      <Footer />
    </div>
  );
};
