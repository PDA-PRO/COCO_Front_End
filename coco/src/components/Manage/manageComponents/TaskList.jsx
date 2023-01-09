import "../Manage.css";
import React, { Suspense, useRef, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import fetchData from "../../../api/fetchTask";
import Button from "react-bootstrap/Button";
import axios from "axios";

export const TaskList = () => {
  return (
    <>
      <h2 className="mTi">TASK LIST</h2>
      <div>
        <Suspense fallback={<Spinner />}>
          <TasksList resource={fetchData(`http://127.0.0.1:8000/tasklist`)} />
        </Suspense>
      </div>
    </>
  );
};

const TasksList = ({ resource }) => {
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
        return <ListBox info={e} settasks={settasks}></ListBox>;
      })}
    </div>
  );
};

const ListBox = ({ info, settasks }) => {
  console.log(info);
  const loadlist = (e) => {
    console.log(info.id);
    axios
      .get("http://127.0.0.1:8000/deletetask/" + info.id)
      .then(function (response) {
        axios.get("http://127.0.0.1:8000/tasklist").then(function (response) {
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
      <div>{info.count == null ? 0 : info.count}</div>

      <Button onClick={loadlist}>삭제</Button>
    </div>
  );
};
