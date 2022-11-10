import React from "react";
import { Header } from "../Home/Header";
import { Footer } from "../Home/Footer";
import "./Problems.css";
import { ProblemBox } from "./ProblemBox";

class ProblemInfo {
  constructor(num, title, rate, ans) {
    this.num = num;
    this.title = title;
    this.rate = rate;
    this.ans = ans;
  }
}

export const Problems = () => {
  const problemList = [
    new ProblemInfo(1, "더하기 문제", 3, 54.6),
    new ProblemInfo(2, "빼기 문제", 4, 38.3),
    new ProblemInfo(3, "곱하기 문제", 2, 73),
    new ProblemInfo(4, "나눗셈 문제", 5, 29.6),
  ];
  
  return (
    <div>
      <Header />
      <div className="problemsContainer">
        <div className="problemsBox">
          <div className="problemsName problemsTitle">문제 제목</div>
          <div className="problemsRate problemsTitle">난이도</div>
          <div className="problemsAns problemsTitle">정답률</div>
        </div>
        {
          problemList.map((e) => {
            return <ProblemBox info={e}/>
          })
        }
      </div>
      <Footer />
    </div>
  );
};
