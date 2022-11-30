import React from "react";
import "./Board.css";

export const All = () => {
  const moveDetail = (e) => {
    window.location.href = `/board/${e}`;
  };

  return (
    <div className="boardBody">
      <div className="boardList" onClick={() => moveDetail(1)}>
        <div className="boardContentTitles">No.1 모르겠어요!</div>
        <div className="boardContentCategory">Help</div>
        <div className="boardContentWriter">sncalphs</div>
        <div className="boardContentComments">3개</div>
        <div className="boardContentTime">2022.11.30. 23:02:00</div>
      </div>

      <div className="boardList" onClick={() => moveDetail(2)}>
        <div className="boardContentTitles">공지사항</div>
        <div className="boardContentCategory">공지</div>
        <div className="boardContentWriter">Manager</div>
        <div className="boardContentComments">0개</div>
        <div className="boardContentTime">2022.11.30. 12:02:00</div>
      </div>
    </div>
  );
};
