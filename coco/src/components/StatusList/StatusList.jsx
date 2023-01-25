import React, { Suspense, useState } from "react";
import { Header } from "../Home/Header";
import { Footer } from "../Home/Footer";
import "./StatusList.css";
import { StatusListBox } from "./StatusListBox";
import Spinner from "react-bootstrap/Spinner";
import fetchData from "../../api/fetchTask";
import { useLocation } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Form from "react-bootstrap/Form";
import { useEffect } from "react";
import { GoSearch } from "react-icons/go";
import axios from "axios";
import { useAppSelector } from "../../app/store";

export const StatusList = () => {
  const userInfo = useAppSelector((state) => state.loginState);
  const [option, setOption] = useState([false, -1, false]);
  const [taskStatus, setTaskStatus] = useState([])

  const onlyMyHandler = () => {
    option[0] = !option[0];
    setOption([...option]);
  };
  const onlyLangHandler = (value) => {
    //c가 1, py가 0
    if (option[1] === value) {
      option[1] = -1;
    } else {
      option[1] = value;
    }
    setOption([...option]);
  };

  const onlyAnswerHandler = () => {
    option[2] = !option[2];
    setOption([...option]);
  };

  useEffect(() => {
    console.log(option)
  }, [option]);

  const onSearchHandler = (value) => {
    axios
    .post("http://127.0.0.1:8000/task_status/", {
      user_id: userInfo.id,
      option: option,
      task_info: value
    })
    .then((res) => {
      console.log(res.data);
      setTaskStatus(res.data);
    });
  };

  const taskOption = () => {
    if (
      option[0] === false &&
      option[1] === -1 &&
      option[2] === false
    ) {
      console.log("init");
      return fetchData(`http://127.0.0.1:8000/status?lang=${option[1]}&result=${option[2]}`);
    } else {
      if (option[0] === true) {
        return fetchData(`http://127.0.0.1:8000/status?user_id=${userInfo.id}
        &lang=${option[1]}&result=${option[2]}`);
      } else {
        return fetchData(`http://127.0.0.1:8000/status?user_id
        &lang=${option[1]}&result=${option[2]}`);
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="statusListContainer">
        <div className="statusListTop">
          <img src="./image/score.png" height="80px" alt="" />
          <h4>COCO SCORE BOARD</h4>
        </div>
        <div className="statusSort">
          <div className="sortBox">
            <p>내 문제만 보기</p>
            <Form.Check type="checkbox" onChange={() => onlyMyHandler()} />
          </div>

          <div className="sortBox">
            <p>
              <span style={{ color: "#8b00ff" }}>C언어</span> 제출만 보기
            </p>
            <Form.Check
              type="checkbox"
              onChange={() => onlyLangHandler(1)}
              style={{ marginRight: "20px" }}
              checked={option[1] === 1 ? true : false}
            />
            <p>
              <span style={{ color: "#50bcdf" }}>Python 3</span> 제출만 보기
            </p>
            <Form.Check
              type="checkbox"
              checked={option[1] === 0 ? true : false}
              onChange={() => onlyLangHandler(0)}
            />
          </div>

          <div className="sortBox">
            <p>
              <span style={{ color: "rgb(98, 148, 255)" }}>정답</span>만 보기
            </p>
            <Form.Check type="checkbox" onChange={() => onlyAnswerHandler()} />
          </div>

          <div className="sortBox">
            <SearchBar search={onSearchHandler} />
          </div>
        </div>
        <div className="statusListBox" id="SLBtop">
          <h4>Submit No.</h4>
          <h4>User ID</h4>
          <h4>No.</h4>
          <h4>Title</h4>
          <h4>언어</h4>
          <h4>결과</h4>
          <h4>제출 시간</h4>
        </div>
        <Suspense fallback={<Spinner />}>
          <Getsubmits resource={taskOption()}
          taskStatus = {taskStatus} />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
};

const SearchBar = ({ search }) => {
  const onSearchHandler = (e) => {
    const value = document.getElementById("SV").value;
    search(value);
  };

  return (
    <div className="searchBar">
      <input type="text" placeholder="문제 번호 or 제목" id="SV" />
      <GoSearch
        size={23}
        color="rgb(97, 127, 192)"
        id="goSearch"
        onClick={() => onSearchHandler()}
      />
    </div>
  );
};

const Getsubmits = ({ resource, taskStatus }) => {
  const problemList = taskStatus.length === 0 ? resource.read() : taskStatus;
  const maxPage = Math.ceil(problemList.length / 15);
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
      {problemList.slice(15 * (page - 1), 15 * (page - 1) + 15).map((e) => {
        return <StatusListBox info={e} key={e.sub_id} />;
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
    </>
  );
};
