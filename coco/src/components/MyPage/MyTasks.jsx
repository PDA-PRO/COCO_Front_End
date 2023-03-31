import React from "react";
import "./MyPage.css";
import { useNavigate } from "react-router-dom";
import { Suspense } from "react";
import Spinner from "react-bootstrap/esm/Spinner";
import fetchData from "../../api/fetchTask";
import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import { ProblemBox } from "../Problems/ProblemBox";

export const MyTasks = (props) => {
  const [list, setList] = useState([]);

  return (
    <div className="mp-FourthBox">
      <div className="BodyLeft">
        <div className="leftTop">
          <h4>No</h4>
          <h4>문제 제목</h4>
          <h4>난이도</h4>
          <h4>정답률</h4>
          <h4>언어</h4>
          <h4>Solve</h4>
        </div>

        <Suspense fallback={<Spinner />}>
          <GetProblems
            resource={fetchData("http://127.0.0.1:8000/tasklist")}
            list={props.props}
          />
        </Suspense>
      </div>
    </div>
  );
};

const GetProblems = ({ resource, list }) => {
  const tmpList = resource.read();
  const tmpIdList = [];
  for (let i = 0; i < tmpList.length; i++) {
    tmpIdList.push(tmpList[i].id);
  }
  var problemList = [];

  for (let i = 0; i < list.length; i++) {
    if (tmpIdList.includes(list[i].task_num)) {
      let a = list[i].task_num;

      for (let j = 0; j < tmpList.length; j++) {
        if (tmpList[j].id === a) {
          problemList.push(tmpList[j]);
        }
      }
    }
  }

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
