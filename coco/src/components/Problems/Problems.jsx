import React, { Suspense, useState, useEffect, useRef } from "react";
import { Header } from "../Home/Header";
import { Footer } from "../Home/Footer";
import "./Problems.css";
import { ProblemBox } from "./ProblemBox";
import Spinner from "react-bootstrap/Spinner";
import fetchData from "../../api/fetchTask";
import { GoSearch } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import Form from "react-bootstrap/Form";
import { useMediaQuery } from "react-responsive";
import Select from "react-select";

import {
  TiBatteryCharge,
  TiBatteryLow,
  TiBatteryMid,
  TiBatteryHigh,
  TiBatteryFull,
} from "react-icons/ti";
import { AiOutlineCheck, AiOutlineReload } from "react-icons/ai";
import Pagination from "@mui/material/Pagination";
import axios from "axios";

export const Problems = () => {
  const Large = useMediaQuery({ minWidth: 1100 });
  const reload = (e) => {
    window.location.reload();
  };
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({});

  return (
    <div>
      <Header />
      <div className="problemsContainer">
        <div className={Large ? "parentPC" : "elseParentPC"}>
          <div className="proTop" onClick={() => reload()}>
            <img src="./image/co.png" height="80px" alt="" />
            <h4>COCO JUDGE</h4>
          </div>
          <div className="proBody">
            <div className="BodyLeft">
              <div className="leftTop">
                <h4>No</h4>
                <h4>문제 제목</h4>
                <h4>난이도</h4>
                <h4>정답률</h4>
              </div>
              <Suspense fallback={<Spinner />}>
                <GetProblems
                  resource={fetchData("http://127.0.0.1:8000/task/", {
                    params: {
                      keyword: filter.keyword,
                      diff: filter.diff,
                      category: filter.category,
                      rateSort: filter.rateSort,
                      size: 10,
                      page: page,
                    },
                  })}
                  setPage={setPage}
                  page={page}
                />
              </Suspense>
            </div>
            <div className="BodyRight">
              <BodyRight setFilter={setFilter} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const BodyRight = ({ setFilter }) => {
  const [diff, setDiff] = useState([false, false, false, false, false]);
  const [rate, setRate] = useState(0); //기본 0, 낮은순 1, 높은순 2
  const [option, setOption] = useState([]);
  const asyncRef = useRef();
  const keywordRef = useRef();

  useEffect(() => {
    axios.get("http://localhost:8000/task/category").then((value) => {
      var option = [];
      for (let i = 0; i < value.data.length; i++) {
        option.push({ value: value.data[i], label: value.data[i] });
      }
      return setOption(option);
    });
  }, []);

  const onDiffHanlder = (e) => {
    diff[e - 1] = !diff[e - 1];
    setDiff([...diff]);
  };

  const onRateHander = (e) => {
    setRate(e);
  };

  const onDiffReset = () => {
    setDiff([false, false, false, false, false]);
  };

  const onFilterHandler = () => {
    let diffList = [];
    for (let i = 0; i < 5; i++) {
      if (diff[i] == true) {
        diffList.push(i + 1);
      }
    }
    setFilter({
      keyword: keywordRef.current.value,
      diff: diffList.join(","),
      ratesort: rate,
      category: asyncRef.current
        .getValue()
        .map((e) => e.value)
        .join(","),
    });
    //정렬할 때 데이터만 추려서 보내기
  };

  const onResetHandler = () => {
    setDiff([false, false, false, false, false]);
    keywordRef.current.value = "";
    asyncRef.current.clearValue();
  };

  return (
    <>
      <div className="rightBox1">
        <div className="searchBar">
          <input ref={keywordRef} type="text" placeholder="search" id="SV" />
          <GoSearch size={23} color="rgb(98, 148, 255)" id="goSearch" />
        </div>

        <h4>문제 보기</h4>

        <nav>
          <label for="touch">
            <h3>
              난이도
              <span>
                <IoIosArrowDown size={20} style={{ marginLeft: "5px" }} />
              </span>
            </h3>
          </label>
          <input type="checkbox" id="touch" />

          <div className="slide">
            <div className="chose">
              <Form.Check
                type="checkbox"
                checked={diff[0]}
                value="1"
                onChange={(e) => onDiffHanlder(e.target.value)}
              />
              <h5>Lv. 1</h5>
              <TiBatteryLow size={35} color="rgb(98, 148, 255)" />
            </div>
            <div className="chose">
              <Form.Check
                type="checkbox"
                checked={diff[1]}
                value="2"
                onChange={(e) => onDiffHanlder(e.target.value)}
              />
              <h5>Lv. 2</h5>
              <TiBatteryMid size={35} color="#9DD84B" />
            </div>
            <div className="chose">
              <Form.Check
                type="checkbox"
                checked={diff[2]}
                value="3"
                onChange={(e) => onDiffHanlder(e.target.value)}
              />
              <h5>Lv. 3</h5>
              <TiBatteryHigh size={35} color="#ff7e00" />
            </div>

            <div className="chose">
              <Form.Check
                type="checkbox"
                checked={diff[3]}
                value="4"
                onChange={(e) => onDiffHanlder(e.target.value)}
              />
              <h5>Lv. 4</h5>
              <TiBatteryFull size={35} color="red" />
            </div>

            <div className="chose">
              <Form.Check
                type="checkbox"
                checked={diff[4]}
                value="5"
                onChange={(e) => onDiffHanlder(e.target.value)}
              />
              <h5>Lv. 5</h5>
              <TiBatteryCharge size={35} color="#7d1b7e" />
            </div>

            <p onClick={onDiffReset}>초기화</p>
          </div>
        </nav>

        <nav>
          <label for="touch2">
            <h3>
              카테고리
              <span>
                <IoIosArrowDown size={20} style={{ marginLeft: "5px" }} />
              </span>
            </h3>
          </label>
          <input type="checkbox" id="touch2" />

          <div className="slide">
            <div className="category">
              <Select ref={asyncRef} isMulti options={option} />
            </div>
          </div>
        </nav>

        <nav>
          <label for="touch3">
            <h3>
              정답률
              <span>
                <IoIosArrowDown size={20} style={{ marginLeft: "5px" }} />
              </span>
            </h3>
          </label>
          <input type="checkbox" id="touch3" />

          <div className="slide">
            <div className="chose3">
              <Form.Check
                type="radio"
                name="group1"
                value="1"
                onChange={(e) => onRateHander(e.target.value)}
              />
              <h5>낮은 순</h5>
              <BsArrowUpRight size={22} color="skyblue" />
            </div>
            <div className="chose3">
              <Form.Check
                type="radio"
                name="group1"
                value="2"
                onChange={(e) => onRateHander(e.target.value)}
              />
              <h5>높은 순</h5>
              <BsArrowDownRight size={22} color="red" />
            </div>
            <div className="chose3">
              <Form.Check
                type="radio"
                name="group1"
                value="0"
                onChange={(e) => onRateHander(e.target.value)}
              />
              <h5>기본</h5>
              <BsArrowDownRight size={22} color="green" />
            </div>
          </div>
        </nav>

        <div className="chose4">
          <div className="subOne" onClick={onFilterHandler}>
            <AiOutlineCheck color="rgb(98, 148, 255)" size={22} />
            <h5>적용하기</h5>
          </div>
          <div className="subOne" onClick={onResetHandler}>
            <AiOutlineReload color="red" size={22} />
            <h5>전체 초기화</h5>
          </div>
        </div>
      </div>
    </>
  );
};

const GetProblems = ({ resource, page, setPage }) => {
  const problemList = resource.read();

  console.log(problemList);

  return (
    <>
      {problemList.tasks.map((e) => {
        return <ProblemBox info={e} key={e.id} type={0} />;
      })}
      <div className="leftBottom">
        <Pagination
          count={Math.ceil(problemList.total / problemList.size)}
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
