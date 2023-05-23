import "../Manage.css";
import React, { Suspense, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import fetchData from "../../../api/fetchTask";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import Pagination from "@mui/material/Pagination";
import { useAppSelector } from "../../../app/store";

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
  const userInfo = useAppSelector((state) => state.loginState);
  const problemList = resource.read();
  const [tasks, settasks] = useState(problemList);

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
    <div className="m-upload">
      <div className="taskTop">
        <h3>ID</h3>
        <h3>제목</h3>
        <h3>난이도</h3>
        <h3>정답률</h3>
        <h3>제출수</h3>
        <h3>언어</h3>
      </div>
      {/* {tasks.map((e) => {
        return <ListBox info={e} settasks={settasks}></ListBox>;
      })} */}
      {tasks.slice(20 * (page - 1), 20 * (page - 1) + 20).map((e) => {
        return (
          <ListBox info={e} token={userInfo.access_token} settasks={settasks} />
        );
      })}
      <div className="pageController">
        <Pagination
          count={maxPage}
          variant="outlined"
          shape="rounded"
          defaultPage={1}
          onChange={(e) => handlePage(e)}
        />
      </div>
    </div>
  );
};

const ListBox = ({ info, token, settasks }) => {
  const lan = (e1, e2) => {
    if (e1 === 1 && e2 === 1) {
      return (
        <div>
          <img src="./image/lan_c.png" height="30px" alt="" />
          <img
            src="./image/python.png"
            height="30px"
            style={{ paddingRight: "10px" }}
            alt=""
          />
        </div>
      );
    } else if (e1 === 1 && e2 === 0) {
      return (
        <div>
          <img src="./image/lan_c.png" height="30px" alt="" />
        </div>
      );
    } else if (e1 === 0 && e2 === 1) {
      return (
        <div>
          <img src="./image/python.png" height="30px" alt="" />
        </div>
      );
    }
  };
  const navigate = useNavigate();
  const goDetail = (e) => {
    navigate(`/problems/${e}`);
  };
  const loadlist = (e) => {
    axios
      .get("http://127.0.0.1:8000/deletetask/" + info.id, {
        headers: { Authorization: "Bearer " + token },
      })
      .then(function (response) {
        axios.get("http://127.0.0.1:8000/tasklist").then(function (response) {
          alert("task를 삭제하였습니다.");
          console.log(response.data);
          settasks(response.data);
        });
        // 성공 핸들링
      });
  };
  return (
    <div className="taskList">
      <h4>No.{info.id}</h4>
      <h4
        onClick={() => {
          goDetail(info.id);
        }}
      >
        {info.title}
      </h4>
      <h4>{info.diff}</h4>
      <h4>{info.rate}%</h4>
      <h4>{info.count == null ? 0 : info.count}</h4>
      <h4>{lan(info.lan_c, info.lan_py)}</h4>
      <BsTrash
        cursor="pointer"
        size={20}
        color="red"
        onClick={loadlist}
        style={{ justifySelf: "center" }}
      />
    </div>
  );
};
