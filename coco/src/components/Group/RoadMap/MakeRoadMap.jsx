import React, { useRef, useState, useEffect } from "react";
import "./MakeRoadMap.css";
import { Header } from "../../Home/Header";
import { Footer } from "../../Home/Footer";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { GoSearch } from "react-icons/go";
import { Suspense } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/esm/Spinner";
import {
  TiBatteryCharge,
  TiBatteryLow,
  TiBatteryMid,
  TiBatteryHigh,
  TiBatteryFull,
} from "react-icons/ti";
import { AiOutlineCheck, AiOutlineReload } from "react-icons/ai";
import Pagination from "@mui/material/Pagination";
import { IoIosArrowDown } from "react-icons/io";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import Select from "react-select";
import { ProblemBox } from "../../Problems/ProblemBox";
import fetchData from "../../../api/fetchTask";

export const MakeRoadMap = () => {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const path = window.location.pathname.split("/");
  const [filter, setFilter] = useState({});

  const nameRef = useRef(null);
  const descRef = useRef(null);

  const confirmRoadmap = () => {
    const updateName = nameRef.current.value;
    const updateDesc = descRef.current.value;

    if (updateName === "" || updateDesc === "" || tasks.length === 0) {
      alert(
        "Roadmap 이름과 설명을 모두 작성해주세요.\n문제는 최소 1문제 이상 포함되어야 합니다."
      );
    } else {
      axios
        .post("http://127.0.0.1:8000/room/roadmap", {
          id: path.at(-1),
          name: updateName,
          desc: updateDesc,
          tasks: tasks,
        })
        .then((res) => {
          alert("로드맵을 생성하였습니다");
          navigate(`/room/${path.at(-1)}`);
        });
    }
  };

  const addProblems = (e) => {
    if (tasks.includes(e)) {
      alert("이미 추가된 문제입니다.");
    } else {
      alert(`No.${e}번 문제를 로드맵에 추가하였습니다.`);
      setTasks([...tasks, e]);
    }
  };

  const deleteProblem = (e) => {
    alert(`No.${e}번 문제를 로드맵에서 제거하였습니다.`);
    setTasks(tasks.filter((value) => value !== e));
  };

  return (
    <>
      <Header />
      <div className="makeRM">
        <div className="makeRM-Body">
          <h3>Create RoadMap</h3>
          <hr />
          <div className="nameAndDesc">
            <div className="name">
              <p>RoadMap Name</p>
              <InputGroup className="mb-0">
                <Form.Control ref={nameRef} placeholder="ex) 초보자용 로드맵" />
              </InputGroup>
            </div>
            <div className="name">
              <p>RoadMap 설명</p>
              <InputGroup className="mb-0">
                <Form.Control
                  as="textarea"
                  ref={descRef}
                  placeholder="ex) 조건문과 반복문을 숙지하자"
                />
              </InputGroup>
            </div>
          </div>
          <div className="inputBox">
            <div className="firstBox">
              {/* TODO: 모든 문제 리스트 */}
              {/* <Suspense fallback={<Spinner />}>
                <TasksList resource="" />
              </Suspense> */}
              <TasksList setFilter={setFilter} />
            </div>
            <div className="secondBox">
              <div className="leftTop">
                <h4>No</h4>
                <h4>Title</h4>
                <h4>난이도</h4>
                <h4>정답률</h4>
                <h4>ADD</h4>
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
                  addProblems={addProblems}
                />
              </Suspense>
            </div>

            {/* TODO: 추가된 문제 리스트 */}
            <div className="thirdBox">
              <div className="leftTop">
                <h4>No</h4>
                <h4>Title</h4>
                <h4>난이도</h4>
                <h4>정답률</h4>
                <h4>DEL</h4>
              </div>
              <Suspense fallback={<Spinner />}>
                <MyTasksList
                  resource={fetchData("http://127.0.0.1:8000/task/", {
                    params: {
                      size: 10,
                      page: page,
                    },
                  })}
                  setPage={setPage}
                  page={page}
                  tasks={tasks}
                  deleteProblem={deleteProblem}
                />
              </Suspense>
            </div>
          </div>
          <Button
            variant="outline-secondary"
            id="submit_btn"
            onClick={() => confirmRoadmap()}
          >
            CREATE
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
};

const TasksList = ({ setFilter }) => {
  const keywordRef = useRef();
  const [diff, setDiff] = useState([false, false, false, false, false]);
  const [rate, setRate] = useState(0); //기본 0, 낮은순 1, 높은순 2
  const [option, setOption] = useState([]);
  const asyncRef = useRef();

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
      <div className="index">
        {/* 검색창 */}
        <div className="searchBar">
          <input ref={keywordRef} type="text" placeholder="search" id="SV" />
          <GoSearch size={23} color="rgb(98, 148, 255)" id="goSearch" />
        </div>
        <div className="items">
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
      </div>
    </>
  );
};

const GetProblems = ({ resource, page, setPage, addProblems }) => {
  const problemList = resource.read();

  // console.log("이거 안되냐" + tasks);

  return (
    <>
      {problemList.tasks.map((e) => {
        return (
          <ProblemBox info={e} key={e.id} type={1} addProblems={addProblems} />
        );
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

const MyTasksList = ({ resource, page, setPage, tasks, deleteProblem }) => {
  const problemList = resource.read();
  const problemsId = problemList.tasks;

  var myList = []; // 내가 선택한 문제들만 들어있는 배열

  function extractFieldAsArray(objects, field) {
    const fieldArray = objects.map((obj) => obj[field]);
    return fieldArray;
  }

  const pTasks = extractFieldAsArray(problemsId, "id");

  myList = pTasks.filter((value) => tasks.includes(value));

  function filterObjectsByFieldValues(objects, field, valuesToMatch) {
    const filteredObjects = objects.filter((obj) =>
      valuesToMatch.includes(obj[field])
    );
    return filteredObjects;
  }

  const matched = filterObjectsByFieldValues(problemsId, "id", myList);

  return (
    <>
      {matched.map((e) => {
        return (
          <ProblemBox
            info={e}
            key={e.id}
            type={2}
            deleteProblem={deleteProblem}
          />
        );
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
