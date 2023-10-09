import React from "react";
import { FaHotjar } from "react-icons/fa";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";
import {
  BsFillEyeFill,
  BsChatSquareTextFill,
  BsHeart,
  BsHeartFill,
  BsFillLightbulbFill,
  BsMegaphoneFill,
  BsQuestionLg,
} from "react-icons/bs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { useMediaQuery } from "react-responsive";

export const Block = (props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.loginState);
  const Large = useMediaQuery({ minWidth: 1000 });

  const moveBoard = (e) => {
    navigate(`/board/${e}`);
  };

  const moveTask = (e) => {
    navigate(`/problems/${e}`);
  };
  const [category, setCategory] = useState("");
  const [bgColor, setBgColor] = useState("white");
  const [date, setDate] = useState("");

  useEffect(() => {
    const chCate = (e) => {
      if (e === 1) {
        setCategory("공지");
        setBgColor("rgb(231, 255, 211)");
      } else if (e === 2) {
        setCategory("Help");
        setBgColor("rgb(255, 248, 211)");
      } else if (e === 3) {
        setCategory("자유");
        setBgColor("rgb(237, 251, 255)");
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

    chCate(props.info.category);
    var originTime = props.info.time;
    setDate(timeForToday(originTime));
  }, [props.info]);

  return (
    <div
      className="Block"
      style={{ marginTop: userInfo.id === "" ? "10rem" : "5rem" }}
    >
      <div className="box1">
        <div className="boxTitle">
          {/* <FaHotjar size={28} color="red" /> */}
          <h2>인기 게시글</h2>
        </div>

        <div
          className="blockBox"
          style={{ backgroundColor: bgColor }}
          onClick={() => {
            moveBoard(props.info.board_id);
          }}
        >
          <div className="blockContent">
            <div className="blockTop">
              <h3>{props.info.title}</h3>
              <h4>{date}</h4>
            </div>
            <div className="blockSec">
              <h3 id="blockCat">{category}</h3>

              <div className="block_un">
                <div className="unOne">
                  <BsFillEyeFill
                    color="rgb(112, 112, 112)"
                    size={18}
                    style={{ marginBottom: "3px" }}
                  />
                  <p>{props.info.views}</p>
                </div>
                <div className="unOne">
                  <BsChatSquareTextFill
                    color="rgb(112, 112, 112)"
                    size={18}
                    style={{ marginLeft: "10px" }}
                  />
                  <p>{props.info.comments}</p>
                </div>

                <div className="unOne">
                  <BsHeartFill color="red" size={18} />
                  <p style={{ color: "red" }}>{props.info.likes}</p>
                </div>
              </div>
            </div>

            <div className="blockBody">
              <p>작성자 : {props.info.user_id}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="box2">
        <div className="boxTitle">
          {/* <FaHotjar size={28} color="red" /> */}
          <h2>많이 푸는 문제</h2>
        </div>

        <div
          className="blockBox"
          onClick={() => {
            moveTask(props.info.problem_id);
          }}
          style={{ backgroundColor: "#f7f7f7" }}
        >
          <div className="blockContent">
            <div className="blockTop2">
              <div className="redBox">
                <h3>No.{props.info.problem_id}</h3>
              </div>

              <h3>{props.info.problem_title}</h3>
            </div>

            <div className="blockSec2">
              {Rating(`${props.info.problem_diff}`)}
              <p>
                정답률 :{" "}
                <span
                  style={
                    props.info.problem_rate > 50
                      ? { color: "#7472ce" }
                      : { color: "red" }
                  }
                >
                  {props.info.problem_rate}
                </span>
                %
              </p>
            </div>

            <div className="blockThird">
              <p>시간 제한 : {props.info.problem_timeLimit}sec</p>
              <p>메모리 제한 : {props.info.problem_memLimit}mb</p>
              <p>총 제출수 : {props.info.problem_submitCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ARRAY = [0, 1, 2, 3, 4];

function Rating(n) {
  const colored = [false, false, false, false, false];
  for (let i = 0; i < n; i++) {
    colored[i] = true;
  }

  return (
    <Wrap>
      <Stars>
        {ARRAY.map((el, idx) => {
          return (
            <FaStar
              key={idx}
              size="22"
              className={colored[el] && "yellowStar"}
            />
          );
        })}
      </Stars>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const Stars = styled.div`
  display: flex;
  padding-top: 0px;

  & svg {
    color: gray;
    margin: 0 2px;
  }

  .yellowStar {
    color: #fcc419;
  }
`;
