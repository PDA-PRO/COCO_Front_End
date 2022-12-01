import React, { Suspense } from "react";
import { Header } from "../Home/Header";
import { Footer } from "../Home/Footer";
import "./Problems.css";
import { ProblemBox } from "./ProblemBox";
import Spinner from "react-bootstrap/Spinner";
import fetchData from "../../api/fetchTask";

// class ProblemInfo {
//   constructor(
//     id,
//     title,
//     desc,
//     inputEx1,
//     inputEx2,
//     outputEx1,
//     outputEx2,
//     rate,
//     memLimit,
//     timeLimit,
//     desPic,
//     diff,
//     inputDescription,
//     outputDescription,
//     C_Lan,
//     python
//   ) {
//     this.id = id;
//     this.title = title;
//     this.desc = desc;
//     this.inputEx1 = inputEx1;
//     this.inputEx2 = inputEx2;
//     this.outputEx1 = outputEx1;
//     this.outputEx2 = outputEx2;
//     this.rate = rate;
//     this.memLimit = memLimit;
//     this.timeLimit = timeLimit;
//     this.desPic = desPic;
//     this.diff = diff;
//     this.inputDescription = inputDescription;
//     this.outputDescription = outputDescription;
//     this.C_Lan = C_Lan;
//     this.python = python;
//   }
// }

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
        <Suspense fallback={<Spinner />}>{/* <GetProblems /> */}</Suspense>
      </div>
      <Footer />
    </div>
  );
};

//const resource = fetchData("http://127.0.0.1:8000/problems");

// const GetProblems = () => {
//   const problemList = resource.read();
//   console.log(problemList);
//   return (
//     <>
//       {problemList.map((e) => {
//         return <ProblemBox info={e} key={e.id} />;
//       })}
//     </>
//   );
// };
