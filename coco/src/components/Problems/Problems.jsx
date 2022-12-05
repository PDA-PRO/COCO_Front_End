import React, { Suspense } from "react";
import { Header } from "../Home/Header";
import { Footer } from "../Home/Footer";
import "./Problems.css";
import { ProblemBox } from "./ProblemBox";
import Spinner from "react-bootstrap/Spinner";
import fetchData from "../../api/fetchTask";

export const Problems = () => {
  return (
    <div>
      <Header />
      <div className="problemsContainer">
        <div className="problemsBox problemsTitle">
          <div className="problemsNum">문제 번호</div>
          <div className="problemsName">문제 제목</div>
          <div className="problemsRate">난이도</div>
          <div className="problemsAns">정답률</div>
        </div>
        <Suspense fallback={<Spinner />}>
          <GetProblems resource={fetchData("http://127.0.0.1:8000/problems")} />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
};

// const resource = fetchData("http://127.0.0.1:8000/problems");

const GetProblems = ({ resource }) => {
  const problemList = resource.read();
  console.log(problemList);
  return (
    <>
      {problemList.map((e) => {
        return <ProblemBox info={e} key={e.id} />;
      })}
    </>
  );
};
