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

export const StatusList = () => {
  const location = useLocation();
  var [onlyMy, setOnlyMy] = useState(false);
  var [onlyC, setOnlyC] = useState(false);
  var [onlyPy, setOnlyPy] = useState(false);
  var [onlyAns, setOnlyAns] = useState(false);

  const onlyMyHandler = () => {
    onlyMy = !onlyMy;
    setOnlyMy(onlyMy);
  };
  const onlyCHandler = () => {
    onlyC = !onlyC;
    setOnlyC(onlyC);
  };
  const onlyPyHandler = () => {
    onlyPy = !onlyPy;
    setOnlyPy(onlyPy);
  };
  const onlyAnswerHandler = () => {
    onlyAns = !onlyAns;
    setOnlyPy(onlyAns);
  };

  useEffect(() => {
    console.log(onlyMy);
  }, [onlyMy, onlyAns, onlyC, onlyPy]);

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
              onChange={() => onlyCHandler()}
              style={{ marginRight: "20px" }}
            />
            <p>
              <span style={{ color: "#50bcdf" }}>Python 3</span> 제출만 보기
            </p>
            <Form.Check type="checkbox" onChange={() => onlyPyHandler()} />
          </div>

          <div className="sortBox">
            <p>
              <span style={{ color: "rgb(98, 148, 255)" }}>정답</span>만 보기
            </p>
            <Form.Check type="checkbox" onChange={() => onlyAnswerHandler()} />
          </div>

          <div className="sortBox">
            <SearchBar />
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
          <Getsubmits
            resource={
              location.state == null
                ? fetchData(`http://127.0.0.1:8000/status`)
                : fetchData(
                    `http://127.0.0.1:8000/status?user_id=${location.state.user_id}`
                  )
            }
          />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
};

const SearchBar = () => {
  const startSearch = (e) => {
    let value = document.getElementById("SV").value;
    console.log(value);
  };

  return (
    <div className="searchBar">
      <input type="text" placeholder="문제 번호 or 제목" id="SV" />
      <GoSearch
        size={23}
        color="rgb(97, 127, 192)"
        id="goSearch"
        onClick={() => startSearch()}
      />
    </div>
  );
};

const Getsubmits = ({ resource }) => {
  const problemList = resource.read();
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
