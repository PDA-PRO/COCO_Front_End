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

export const Block = (props) => {
  const navigate = useNavigate();
  const moveBoard = (e) => {
    navigate(`/board/${e}`);
  };

  const moveTask = (e) => {
    navigate(`/problem/${e}`);
  };
  const [category, setCategory] = useState("");
  const [bgColor, setBgColor] = useState("white");
  const [date, setDate] = useState("");

  useEffect(() => {
    const chCate = (e) => {
      if (e === 1) {
        setCategory("Notice");
        setBgColor("rgb(231, 255, 211)");
      } else if (e === 2) {
        setCategory("Help");
        setBgColor("rgb(255, 248, 211)");
      } else if (e === 3) {
        setCategory("자유");
        setBgColor("rgb(227, 249, 255)");
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
    <div className="Block">
      <div className="box1">
        <div className="boxTitle">
          <FaHotjar size={28} color="red" />
          <h2>Hot한 게시글</h2>
        </div>

        <div
          className="blockBox"
          style={{ backgroundColor: bgColor }}
          onClick={() => {
            moveBoard(props.props.board_id);
          }}
        >
          <div className="blockContent">
            <div className="blockTop">
              <h3>{props.props.user_id}</h3>
              <h3>{date}</h3>
            </div>
            <div className="blockSec">
              <h3 id="blockCat">{category}</h3>

              <div className="block_un">
                <div className="unOne">
                  <BsFillEyeFill
                    color="rgb(112, 112, 112)"
                    size={22}
                    style={{ marginBottom: "3px" }}
                  />
                  <p>{props.props.views}</p>
                </div>
                <div className="unOne">
                  <BsChatSquareTextFill
                    color="rgb(112, 112, 112)"
                    size={22}
                    style={{ marginLeft: "10px" }}
                  />
                  <p>{props.props.comments}</p>
                </div>

                <div className="unOne">
                  <BsHeartFill color="red" size={22} />
                  <p>{props.props.likes}</p>
                </div>
              </div>
            </div>

            <div className="blockBody">
              <p>{props.props.content}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="box2">
        <div className="boxTitle">
          <FaHotjar size={28} color="red" />
          <h2>Hot한 문제</h2>
        </div>

        <div
          className="blockBox"
          onClick={() => {
            moveTask(props.props.problem_id);
          }}
          style={{ backgroundColor: "#fff" }}
        >
          <div className="blockContent">
            <div className="blockTop2">
              <div className="redBox">
                <h3>No.{props.props.problem_id}</h3>
              </div>

              <h3>{props.props.problem_title}</h3>
            </div>

            <div className="blockSec2">
              {Rating(`${props.props.problem_diff}`)}
              <p>정답률 : {props.props.problem_rate}%</p>
            </div>

            <div className="blockThird">
              <p>시간 제한 : {props.props.problem_timeLimit}sec</p>
              <p>메모리 제한 : {props.props.problem_memLimit}mb</p>
              <p>총 제출수 : {props.props.problem_submitCount}</p>
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