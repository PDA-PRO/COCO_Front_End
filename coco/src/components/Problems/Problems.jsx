import React, { Suspense, useState } from "react";
import { Header } from "../Home/Header";
import { Footer } from "../Home/Footer";
import "./Problems.css";
import { ProblemBox } from "./ProblemBox";
import Spinner from "react-bootstrap/Spinner";
import fetchData from "../../api/fetchTask";
import { GoSearch } from "react-icons/go";
import { IoIosArrowDown, IoIosSearch } from "react-icons/io";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import Form from "react-bootstrap/Form";
import {
  TiBatteryCharge,
  TiBatteryLow,
  TiBatteryMid,
  TiBatteryHigh,
  TiBatteryFull,
} from "react-icons/ti";
import { AiOutlineCheck, AiOutlineReload } from "react-icons/ai";
import Pagination from "@mui/material/Pagination";
import Button from "react-bootstrap/esm/Button";
// import { diffDayAndTime } from "fullcalendar";
import axios from "axios";

export const Problems = () => {
  const [order, setOrder] = useState([]);
  const onSubmitHandler = (order) => {
    // console.log('parent submit', order);
    axios
      .post("http://127.0.0.1:8000/order_task", {
        order: order,
      })
      .then((res) => {
        setOrder(res.data);
      });
  };

  const onSearchHandler = (info) => {
    axios
    .post("http://127.0.0.1:8000/find_task/", {
      info: info,
    })
    .then((res) => {
      setOrder(res.data);
    });
  }

  return (
    <div>
      <Header />
      <div className="problemsContainer">
        <div className="proTop">
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
              <h4>언어</h4>
            </div>
            <Suspense fallback={<Spinner />}>
              <GetProblems
                resource={fetchData("http://127.0.0.1:8000/tasklist")}
                order={order}
              />
            </Suspense>
          </div>
          <div className="BodyRight">
            <SearchBar search={onSearchHandler}/>
            <BodyRight submit={onSubmitHandler} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const SearchBar = ({search}) => {
  const onSearchHandler = (e) => {
    var info = document.getElementById("SV").value;
    search(info)
    console.log(info);
  };

  return (
    <div className="searchBar">
      <input type="text" placeholder="search" id="SV" />
      <GoSearch
        size={23}
        color="rgb(98, 148, 255)"
        id="goSearch"
        onClick={() => onSearchHandler()}
      />
    </div>
  );
};

const BodyRight = ({ submit }) => {
  const [diff, setDiff] = useState([false, false, false, false, false]);
  const [lang, setLang] = useState([false, false]);
  const [rate, setRate] = useState(0); //기본 0, 낮은순 1, 높은순 2

  const onDiffHanlder = (e) => {
    diff[e - 1] = !diff[e - 1];
    setDiff([...diff]);
  };

  const onDiffReset = () => {
    setDiff([false, false, false, false, false]);
  };

  const onLangHandler = (e) => {
    lang[e - 1] = !lang[e - 1];
    setLang([...lang]);
  };

  const onLangReset = () => {
    setLang([false, false]);
  };

  const onRateHander = (e) => {
    setRate(e);
    // rate[e-1] = !rate[e-1]
    // setRate([...rate]);
  };

  const onRateReset = () => {
    setRate(0);
  };

  const onSubmitHandler = () => {
    let diffList = [];
    for (let i = 0; i < 5; i++) {
      if (diff[i] == true) {
        diffList.push(i + 1);
      } else {
        diffList.push(0);
      }
    }
    let langList = [];
    for (let i = 0; i < 2; i++) {
      if (lang[i] == true) {
        langList.push(1);
      } else {
        langList.push(0);
      }
    }
    // let rateList = []
    // for(let i=0;i<2;i++){
    //   if(rate[i] = true){
    //     rateList.push(1)
    //   }
    // }

    submit({
      diff: diffList,
      lang: langList,
      rate: rate,
    });
    //정렬할 때 데이터만 추려서 보내기
  };

  const onResetHandler = () => {
    setDiff([false, false, false, false, false]);
    setLang([false, false]);
    setRate([false, false]);
  };

  return (
    <div className="rightBox1">
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
            언어
            <span>
              <IoIosArrowDown size={20} style={{ marginLeft: "5px" }} />
            </span>
          </h3>
        </label>
        <input type="checkbox" id="touch2" />

        <div className="slide">
          <div className="chose2">
            <Form.Check
              type="checkbox"
              checked={lang[0]}
              value="1"
              onChange={(e) => onLangHandler(e.target.value)}
            />
            <h5>Python3</h5>
            <img src="./image/python.png" height="30px" alt="" />
          </div>
          <div className="chose2">
            <Form.Check
              type="checkbox"
              checked={lang[1]}
              value="2"
              onChange={(e) => onLangHandler(e.target.value)}
            />
            <h5>C</h5>
            <img src="./image/lan_c2.png" height="30px" alt="" />
          </div>

          <p onClick={onLangReset}>초기화</p>
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
              // checked={rate == 0 ? false : pass}
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
              // checked={rate == 0 ? false : pass}
              value="2"
              onChange={(e) => onRateHander(e.target.value)}
            />
            <h5>높은 순</h5>
            <BsArrowDownRight size={22} color="red" />
          </div>

          <p onClick={onRateReset}>초기화</p>
        </div>
      </nav>

      <div className="chose4">
        <div className="subOne" onClick={onSubmitHandler}>
          <AiOutlineCheck color="rgb(98, 148, 255)" size={22} />
          <h5>적용하기</h5>
        </div>
        <div className="subOne" onClick={onResetHandler}>
          <AiOutlineReload color="red" size={22} />
          <h5>전체 초기화</h5>
        </div>
      </div>
    </div>
  );
};

// const resource = fetchData("http://127.0.0.1:8000/problems");

const GetProblems = ({ resource, order }) => {
  const problemList = order.length == 0 ? resource.read() : order;
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
