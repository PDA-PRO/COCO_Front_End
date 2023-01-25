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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ThirdBox = (props) => {
  const navigate = useNavigate();
  const moveDetail = (e) => {
    navigate(`/board/${e}`);
  };

  function timeForToday(value) {
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor(
      (today.getTime() - timeValue.getTime()) / 1000 / 60
    );
    if (betweenTime < 1) return "방금전";
    if (betweenTime < 60) {
      return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
      return `${betweenTimeDay}일전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년전`;
  }

  const chCate = (e) => {
    if (e === 1) {
      return [
        "Notice",
        "rgb(231, 255, 211)",
        <BsMegaphoneFill
          size={22}
          color="#00ff00"
          style={{ marginRight: "10px" }}
        />,
      ];
    } else if (e === 2) {
      return [
        "Help",
        "rgb(255, 248, 211)",
        <BsQuestionLg
          size={22}
          color="rgb(255, 200, 101)"
          style={{ marginRight: "10px" }}
        />,
      ];
    } else if (e === 3) {
      return [
        "자유",
        "skyblue",
        <BsFillLightbulbFill
          size={22}
          color="rgb(111, 101, 255)"
          style={{ marginRight: "10px" }}
        />,
      ];
    }
  };

  return (
    <div className="mp-ThirdBox">
      {props.props.map((e) => {
        const category = chCate(e.category);
        return (
          <div className="myGuel" style={{ borderColor: category[1] }}>
            <h4>
              <span>{category[2]}</span>[ {category[0]} ]
            </h4>
            <h3 onClick={() => moveDetail(e.id)}>{e.title}</h3>
            <h5>{timeForToday(e.time)}</h5>
            <div className="GuelBox">
              <div className="bBox">
                <BsFillEyeFill color="rgb(112, 112, 112)" size={20} />
                <p>{e.views}</p>
              </div>
              <div className="bBox">
                <BsChatSquareTextFill
                  color="rgb(112, 112, 112)"
                  size={18}
                  style={{ marginLeft: "10px" }}
                />
                <p>{e.comments}</p>
              </div>
              <div className="bBox">
                <BsHeartFill size={18} color="red" />
                <p>{e.likes}</p>
              </div>
            </div>
            <BsTrash id="delGuel" size={20} color="red" />
          </div>
        );
      })}
    </div>
  );
};