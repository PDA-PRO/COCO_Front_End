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
import {
  TiBatteryCharge,
  TiBatteryLow,
  TiBatteryMid,
  TiBatteryHigh,
  TiBatteryFull,
} from "react-icons/ti";

export const Block = (props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.loginState);
  const Large = useMediaQuery({ minWidth: 1000 });

  const board = props.info.board;
  const problem = props.info.problem;


  const moveBoard = (e) => {
    navigate(`/board/${e}`);
  };

  const moveTask = (e) => {
    navigate(`/problems/${e}`);
  };
  const [category, setCategory] = useState("");
  const [bgColor, setBgColor] = useState("white");
  const [date, setDate] = useState("");

  const setLevel = (e) => {
    switch (e) {
      case 1:
        return (
          <TiBatteryLow
            size={34}
            color="rgb(98, 148, 255)"
            style={{ paddingBottom: "3px" }}
          />
        );
      case 2:
        return (
          <TiBatteryMid
            size={34}
            color="#9DD84B"
            style={{ paddingBottom: "3px" }}
          />
        );
      case 3:
        return (
          <TiBatteryHigh
            size={34}
            color="#ff7e00"
            style={{ paddingBottom: "3px" }}
          />
        );
      case 4:
        return (
          <TiBatteryFull
            size={34}
            color="red"
            style={{ paddingBottom: "3px" }}
          />
        );
      case 5:
        return (
          <TiBatteryCharge
            size={34}
            color="#7d1b7e"
            style={{ paddingBottom: "3px" }}
          />
        );
    }
  };

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
      const convertTime =  timeValue.getTime()+9 * 60 * 60 * 1000;

      const betweenTime = Math.floor(
        (today.getTime() - convertTime) / 1000 / 60
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

    chCate(board.category);
    var originTime = board.time;
    setDate(timeForToday(originTime));
  }, [board]);

  return (
    <div
      className="Block"
      style={{ marginTop: userInfo.id === "" ? "10rem" : "5rem" }}
    >
      {board !== false ? (
        <div className="box1">
          <div className="boxTitle">
            {/* <FaHotjar size={28} color="red" /> */}
            <h2>인기 게시글</h2>
          </div>

          <div
            className="blockBox"
            style={{ backgroundColor: bgColor }}
            onClick={() => {
              moveBoard(board.board_id);
            }}
          >
            <div className="blockContent">
              <div className="blockTop">
                <h3>{board.title}</h3>
                <h4>{date}</h4>
              </div>
              <div className="blockSec">
                <h3 id="blockCat">{category}</h3>

                <div className="block_un">
                  <div className="unOne">
                    <BsFillEyeFill
                      color="rgb(112, 112, 112)"
                      size={15}
                      style={{ marginBottom: "3px" }}
                    />
                    <p>{board.views}</p>
                  </div>
                  <div className="unOne">
                    <BsChatSquareTextFill
                      color="rgb(112, 112, 112)"
                      size={15}
                      style={{ marginLeft: "7px" }}
                    />
                    <p>{board.comments}</p>
                  </div>

                  <div className="unOne">
                    <BsHeartFill color="red" size={15} />
                    <p style={{ color: "red" }}>{board.likes}</p>
                  </div>
                </div>
              </div>

              <div className="blockBody">
                <p>작성자 : {board.user_id}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="boxTitle">
            {/* <FaHotjar size={28} color="red" /> */}
            <h2/>
          </div>
          <div
            className="box1Board shadow-drop-2-center"
            onClick={() => navigate(`/board`)}
          >게시글 쓰러가기</div>
        </div>
      )}

      {problem !== false ? (
        <div className="box2">
          <div className="boxTitle">
            {/* <FaHotjar size={28} color="red" /> */}
            <h2>관심도 높은 문제</h2>
          </div>

          <div
            className="blockBox"
            onClick={() => {
              moveTask(problem.problem_id);
            }}
            style={{ backgroundColor: "#f7f7f7" }}
          >
            <div className="blockContent">
              <div className="blockTop2">
                <div className="redBox">
                  <h3>No.{problem.problem_id}</h3>
                </div>

                <h3>{problem.problem_title}</h3>
              </div>

              <div className="blockSec2">
                <div className="un">
                  <p>난이도 : </p>
                  {setLevel(problem.problem_diff)}
                </div>

                <p>
                  정답률 :{" "}
                  <span
                    style={
                      problem.problem_rate > 50
                        ? { color: "#7472ce" }
                        : { color: "red" }
                    }
                  >
                    {problem.problem_rate}%
                  </span>
                </p>
              </div>

              <div className="blockThird">
                <p>시간 제한 : {problem.problem_timeLimit}sec</p>
                <p>메모리 제한 : {problem.problem_memLimit}mb</p>
                <p>총 제출수 : {problem.problem_submitCount}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (

        <div>
        <div className="boxTitle">
          {/* <FaHotjar size={28} color="red" /> */}
          <h2/>
        </div>
        <div
          className="box2Problem shadow-drop-2-center"
          onClick={() => navigate(`/problems`)}
        >
          문제 풀러가기
        </div>
      </div>

      )}
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
