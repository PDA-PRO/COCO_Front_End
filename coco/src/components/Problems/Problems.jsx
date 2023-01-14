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
        <div className="proBody">
          <div className="BodyLeft">
            <div className="leftTop">
              <h4>No</h4>
              <h4>Title</h4>
              <h4>Difficulty</h4>
              <h4>Rate</h4>
              <h4>Language</h4>
            </div>
            <Suspense fallback={<Spinner />}>
              <GetProblems
                resource={fetchData("http://127.0.0.1:8000/tasklist")}
              />
            </Suspense>
            <div className="leftBottom">
              <h4>페이지 네이션</h4>
            </div>
          </div>

          <div className="BodyRight">
            <div className="rightBox1">
              <h4>정렬 기준</h4>
            </div>
          </div>
        </div>
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
