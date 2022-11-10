import React, { useState, useEffect } from "react";
import { Header } from "../Home/Header";
import { Footer } from "../Home/Footer";
import "./Problems.css";
import { FaStar } from 'react-icons/fa';
import styled from 'styled-components';

export const Problems = () => {
  return (
    <div>
      <Header />
      {/* <div className='problemsHeader'>
            <h4>문제명</h4>
            <h4>난이도</h4>
            <h4>정답률</h4>
          </div> */}
      <div className="problemsContainer">
        <div className="problemsBox">
          <div className="problemsName">
            <div>No.1</div>
            <div>더하기 문제</div>
          </div>
            <div className="problemsRate">
              {Rating(2)}
            </div>
            <div className="problemsAns">54.6%</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};



const ARRAY = [0, 1, 2, 3, 4];

function Rating(n) {
  const colored = [false, false, false, false, false];
  for(let i=0;i<n;i++){
    colored[i] = true;
  }
  
  return (
    <Wrap>
      <Stars>
        {ARRAY.map((el, idx) => {
          return (
            <FaStar
              key={idx}
              size="40"
              className={colored[el] && 'yellowStar'}
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
  padding-top: 15px;
`;

const Stars = styled.div`
  display: flex;
  padding-top: 5px;

  & svg {
    color: gray;
    margin: 0 10px;
  }

  .yellowStar {
    color: #fcc419;
  }
`;



