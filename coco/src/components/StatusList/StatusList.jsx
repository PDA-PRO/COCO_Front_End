import React, { Suspense, useRef, useState } from "react";
import { Header } from "../Home/Header";
import { Footer } from "../Home/Footer";
import "./StatusList.css";
import { StatusListBox } from "./StatusListBox";
import Spinner from "react-bootstrap/Spinner";
import fetchData from "../../api/fetchTask";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Form from "react-bootstrap/Form";
import { useEffect } from "react";
import { GoSearch } from "react-icons/go";
import { useAppSelector } from "../../app/store";
import { useMediaQuery } from "react-responsive";
import { API } from "api/config";

export const StatusList = () => {
  const userInfo = useAppSelector((state) => state.loginState);
  const [filter, setFilter] = useState({
    answer: false,
    task_id: null,
    onlyme: false,
    lang: null,
  });
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const reload = (e) => {
    navigate(0);
  };

  useEffect(() => {
    console.log(filter);
    console.log(userInfo);
  }, [filter]);

  return (
    <div>
      <Header />
      <div className="statusListContainer">
        <div className="parentSLC">
          <div className="statusListTop">
            <img
              src="./image/score.png"
              height="80px"
              alt=""
              onClick={() => reload()}
              style={{ cursor: "pointer" }}
            />
            <h4 onClick={() => reload()} style={{ cursor: "pointer" }}>
              COCO SCORE BOARD
            </h4>
          </div>
          <OptionBox
            setFilter={setFilter}
            filter={filter}
            isLogin={userInfo.id == "" ? true : false}
          />
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
            <Getsubmits
              resource={fetchData(API.STATUS, {
                params: {
                  task_id: filter.task_id,
                  lang: filter.lang,
                  user_id: filter.onlyme ? userInfo.user_id : null,
                  answer: filter.answer,
                  size: 10,
                  page: page,
                },
              })}
              setPage={setPage}
              page={page}
            />
          </Suspense>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const Getsubmits = ({ resource, page, setPage }) => {
  const statusList = resource.read();

  return (
    <>
      {statusList.statuslist.map((e) => {
        return <StatusListBox info={e} key={e.sub_id} />;
      })}
      <div className="pageController">
        <Pagination
          count={Math.ceil(statusList.total / statusList.size)}
          variant="outlined"
          shape="rounded"
          defaultPage={1}
          page={page}
          onChange={(e, value) => setPage(value)}
        />
      </div>
    </>
  );
};

const OptionBox = ({ filter, setFilter, isLogin }) => {
  const Large = useMediaQuery({ minWidth: 1135 });
  const taskInputRef = useRef();
  return (
    <div className={Large ? "statusSort" : "elseStatus"}>
      <div className="sortBox">
        <p>내 문제만 보기</p>
        <Form.Check
          type="checkbox"
          disabled={isLogin}
          onChange={() => {
            filter.onlyme = !filter.onlyme;
            setFilter({ ...filter });
          }}
        />
      </div>

      <div className="sortBox">
        <p>
          <span style={{ color: "#8b00ff" }}>C언어</span> 제출만 보기
        </p>
        <Form.Check
          type="radio"
          name="group1"
          onChange={() => {
            filter.lang = 1;
            setFilter({ ...filter });
          }}
          style={{ marginRight: "20px" }}
        />
        <p>
          <span style={{ color: "#50bcdf" }}>Python 3</span> 제출만 보기
        </p>
        <Form.Check
          type="radio"
          name="group1"
          onChange={() => {
            filter.lang = 0;
            setFilter({ ...filter });
          }}
        />
      </div>

      <div className="sortBox">
        <p>
          <span style={{ color: "rgb(98, 148, 255)" }}>정답</span>만 보기
        </p>
        <Form.Check
          type="checkbox"
          onChange={() => {
            filter.answer = !filter.answer;
            setFilter({ ...filter });
          }}
        />
      </div>

      <div className="sortBox">
        <div className="searchBar">
          <input
            ref={taskInputRef}
            type="text"
            placeholder="문제 번호"
            id="SV"
          />
          <GoSearch
            size={23}
            color="rgb(97, 127, 192)"
            id="goSearch"
            onClick={() => {
              filter.task_id = taskInputRef.current.value;
              setFilter({ ...filter });
            }}
          />
        </div>
      </div>
    </div>
  );
};
