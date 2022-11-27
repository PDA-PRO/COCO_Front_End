import React from "react";
import "./Board.css";

export const All = () => {
  return (
    <div className="boardBody">
      <div className="boardContentTitles"></div>
      <div className="boardContentCategory"></div>
      <div className="boardContentWriter"></div>
      <div className="boardContentComments"></div>
      <div className="boardContentTime"></div>
    </div>
  );
};
