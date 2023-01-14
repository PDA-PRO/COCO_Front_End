import React, { Suspense, useState } from "react";
import { Header } from "../Home/Header";
import { Footer } from "../Home/Footer";
import "./Problems.css";
import { ProblemBox } from "./ProblemBox";
import Spinner from "react-bootstrap/Spinner";
import fetchData from "../../api/fetchTask";
import Pagination from "@mui/material/Pagination";

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
                resource={fetchData("http://127.0.0.1:8000/manage/tasklist")}
              />
            </Suspense>
 
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

  const maxPage = Math.ceil(problemList.length / 10);
  const [page, setPage] = useState(1);
  const handlePage = (event) => {
    if (
      event.target.innerHTML ===
      '<path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>'
    ) {
      setPage(page - 1);
    } else if (
      event.target.innerHTML ===
      '<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>'
    ) {
      setPage(page + 1);
    } else {
      setPage(parseInt(event.target.outerText));
    }
  };


  return (
    <>
      {problemList.slice(20 * (page - 1), 20 * (page - 1) + 20).map((e) => {
        return <ProblemBox info={e} key={e.id} />;
      })}
      <div className="leftBottom">
        <Pagination
          count={maxPage}
          variant="outlined"
          shape="rounded"
          defaultPage={1}
          onChange={(e) => handlePage(e)}
        />
      </div>
    </>
  );
};
