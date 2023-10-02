import React from "react";
import "./Board.css";
import { Header } from "../Home/Header";
import { Footer } from "../Home/Footer";
import { BoardBody } from "./BoardBody";
import { SlPencil } from "react-icons/sl";
import { IoChatbubblesOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/store";

export const Board = () => {
  const userInfo = useAppSelector((state) => state.loginState);
  const navigate = useNavigate();

  const reload = (e) => {
    window.location.reload();
  };
  // ---------------------------------- 카테고리 변경 State ----------------------
  return (
    <div className="board">
      <Header />
      <div className="boardContent">
        <div className="bcBody">
          <div className="boardHead">
            <div className="boardTitle" onClick={() => reload()}>
              <IoChatbubblesOutline size={50} color="navy" />
              <h2>COCO COMMUNITY</h2>
            </div>
            {userInfo.id === "" ? (
              <></>
            ) : (
              <div
                className="boardOn"
                onClick={() => {
                  navigate("/write");
                }}
              >
                <SlPencil size={22} />
                <h3>글쓰기</h3>
              </div>
            )}
          </div>
          {/* title+카테고리 */}

          <BoardBody />
        </div>
        {/* title+카테고리 */}
      </div>
      <Footer />
    </div>
  );
};
