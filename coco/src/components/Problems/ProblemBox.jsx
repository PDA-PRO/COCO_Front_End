import React from "react";
import "./Problems.css";
import { FaStar } from "react-icons/fa";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export const ProblemBox = (info) => {
  console.log(info.info)
  const goDetail = (e) => {
    window.location.href = `/problems/${e}`
  }

  return (
    <div className="problemsBox" onClick={()=>goDetail(info.info.id)}>
      <div className="problemsNum">
        No.{info.info.id}
      </div>
      <div className="problemsName">
        {info.info.title}
      </div>
      <div className="problemsRate">{Rating(`${info.info.diff}`)}</div>
      <div
        className="problemsAns"
        style={{ color: info.info.rate >= 40 ? "skyblue" : "rgb(218, 55, 55)" }}
      >
        {info.info.rate}%
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
              size="23"
              className={colored[el] && "yellowStar"}
            />
          );
        })}
      </Stars>
    </Wrap>
  );
}

export default Rating;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  // padding-top: 15px;
`;

const Stars = styled.div`
  display: flex;
  // padding-top: 5px;

  & svg {
    color: gray;
    margin: 0 5px;
  }

  .yellowStar {
    color: #fcc419;
  }
`;
