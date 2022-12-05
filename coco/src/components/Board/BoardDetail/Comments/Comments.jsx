import React from "react";
import "../BD.css";
import { BsFillHeartFill } from "react-icons/bs";

export const Comments = (props) => {
  return (
    <div className="commentContext">
      <div className="commentHead">
        <div className="un">
          <h2 className="cUserID">userID</h2>
          <p>6일전</p>
        </div>
        <div className="un2">
          <BsFillHeartFill size={23} />
          <p>6</p>
        </div>
      </div>
      <div className="commentBody">
        <p>그렇게하면 어떡하냐 병신같은련..</p>
      </div>
    </div>
  );
};
