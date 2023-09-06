import React from "react";
import "./Guel.css";
import { useNavigate } from "react-router-dom";
import {
  BsFillEyeFill,
  BsChatSquareTextFill,
  BsHeartFill,
  BsFillLightbulbFill,
  BsMegaphoneFill,
  BsQuestionLg,
} from "react-icons/bs";
import { useEffect, useState } from "react";

export const Guel = (props) => {
  const navigate = useNavigate();
  const moveDetail = (e) => {
    navigate(`/board/${e}`);
  };
  const [category, setCategory] = useState("");
  const [bgColor, setBgColor] = useState("white");
  const [cateIcon, setCateIcon] = useState();
  const [date, setDate] = useState("");

  useEffect(() => {
    const chCate = (e) => {
      if (e === 1) {
        setCategory("Notice");
        setBgColor("rgb(231, 255, 211)");
        setCateIcon(<BsMegaphoneFill size={25} color="#00ff00" />);
      } else if (e === 2) {
        setCategory("Help");
        setBgColor("rgb(255, 248, 211)");
        setCateIcon(<BsQuestionLg size={25} color="rgb(255, 200, 101)" />);
      } else if (e === 3) {
        setCategory("자유");
        setBgColor("rgb(237, 251, 255)");
        setCateIcon(
          <BsFillLightbulbFill size={25} color="rgb(111, 101, 255)" />
        );
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

    chCate(props.props.category);
    var originTime = props.props.time;
    setDate(timeForToday(originTime));
  }, [props.props]);

  return (
    <div
      className="Geul"
      style={{ backgroundColor: bgColor }}
      onClick={() => {
        moveDetail(props.props.id);
      }}
    >
      <div className="GeulInner">
        <div className="un">
          <p>{category}</p>
          {cateIcon}
        </div>

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
            <BsHeartFill color="gray" />
            <p>{props.props.likes}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
