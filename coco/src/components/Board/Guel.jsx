import React from "react";
import "./Guel.css";
import {
  BsFillEyeFill,
  BsChatSquareTextFill,
  BsHeart,
  BsHeartFill,
} from "react-icons/bs";
import { useEffect, useState } from "react";

export const Guel = (props) => {
  const moveDetail = (e) => {
    window.location.href = `/board/${e}`;
  };

  const [category, setCategory] = useState("");
  const chCate = (e) => {
    if (e === 1) {
      setCategory("Notice");
    } else if (e === 2) {
      setCategory("Help");
    } else if (e === 3) {
      setCategory("자유");
    }
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
  const [date, setDate] = useState("");

  useEffect(() => {
    var originTime = props.props.time;
    chCate(props.props.category);
    setDate(timeForToday(originTime));
  });

  return (
    <div
      className="Geul"
      onClick={() => {
        moveDetail(props.props.board_id);
      }}
    >
      <p>{category}</p>
      <div className="guelTitle">
        <h2>{props.props.title}</h2>
      </div>

      <div className="un">
        <h4>{props.props.user_id}</h4>
        <h4>{date}</h4>
      </div>

      <div className="un">
        <div className="un2">
          <BsFillEyeFill color="rgb(112, 112, 112)" />
          <p>{props.props.views}</p>
          <BsChatSquareTextFill
            color="rgb(112, 112, 112)"
            style={{ marginLeft: "10px" }}
          />
          <p>{props.props.comments}</p>
        </div>
        <div className="un2">
          <BsHeartFill />
          <p>{props.props.likes}</p>
        </div>
      </div>
    </div>
  );
};
