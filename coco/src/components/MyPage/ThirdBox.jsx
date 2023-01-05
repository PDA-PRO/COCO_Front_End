import React from "react";
import "./MyPage.css";
import {
  BsFillEyeFill,
  BsChatSquareTextFill,
  BsHeart,
  BsHeartFill,
  BsFillLightbulbFill,
  BsMegaphoneFill,
  BsQuestionLg,
  BsTrash,
} from "react-icons/bs";

export const ThirdBox = () => {
  return (
    <div className="mp-ThirdBox">
      <div className="myGuel">
        <h4>[ 자유 ]</h4>
        <h3>Title</h3>
        <h5>20일전</h5>
        <div className="GuelBox">
          <div className="bBox">
            <BsFillEyeFill color="rgb(112, 112, 112)" size={20} />
            <p>30</p>
          </div>
          <div className="bBox">
            <BsChatSquareTextFill
              color="rgb(112, 112, 112)"
              size={18}
              style={{ marginLeft: "10px" }}
            />
            <p>20</p>
          </div>
          <div className="bBox">
            <BsHeartFill size={18} color="red" />
            <p>5</p>
          </div>
        </div>
        <BsTrash id="delGuel" size={20} color="red" />
      </div>
    </div>
  );
};
