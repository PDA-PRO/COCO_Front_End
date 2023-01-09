import "../Manage.css";

import React, { Suspense, useRef, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import fetchData from "../../../api/fetchTask";
import axios from "axios";
import Button from "react-bootstrap/Button";

export const PostList = () => {
  return (
    <>
      <h2 className="mTi">POST LIST</h2>
      <div>
        <Suspense fallback={<Spinner />}>
          <BoardList resource={fetchData(`http://127.0.0.1:8000/boardlist`)} />
        </Suspense>
      </div>
    </>
  );
};

const BoardList = ({ resource }) => {
  const problemList = resource.read();
  const [tasks, settasks] = useState(problemList);

  return (
    <div className="m-upload">
      <div className="tasksimple">
        <div>문제id</div>
        <div>문제제목</div>
        <div>제출개수</div>
      </div>
      {tasks.map((e) => {
        return <ListPost info={e} settasks={settasks}></ListPost>;
      })}
    </div>
  );
};

const ListPost = ({ info, settasks }) => {
  const loadlist = (e) => {
    console.log(info[0]);
    axios
      .get("http://127.0.0.1:8000/deleteBoard/" + info.id)
      .then(function (response) {
        axios.get("http://127.0.0.1:8000/boardlist").then(function (response) {
          console.log(response.data);
          settasks(response.data);
        });
        // 성공 핸들링
      });
  };
  return (
    <div className="tasksimplelist">
      <div>{info.id}</div>
      <div>{info.title}</div>
      <div>{info[3] == null ? 0 : info[3]}</div>
      <Button onClick={loadlist}>삭제</Button>
    </div>
  );
};
