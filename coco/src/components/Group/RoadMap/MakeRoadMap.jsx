import React, { useRef, useState, useEffect, useMemo } from "react";
import "./MakeRoadMap.css";
import { Header } from "../../Home/Header";
import { Footer } from "../../Home/Footer";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { GoSearch } from "react-icons/go";
import { Suspense } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/esm/Spinner";
import Swal from "sweetalert2";
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
import { useAppSelector } from "../../../app/store";
import { API } from "api/config";
import ReactQuill from "react-quill";
import axiosInstance from "api/axiosWithPathParameter";

export const MakeRoadMap = () => {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const path = window.location.pathname.split("/");
  const [filter, setFilter] = useState({});

  const nameRef = useRef(null);

  const quillRef = useRef(); // quill editor에 접근하기 위한 ref
  const userInfo = useAppSelector((state) => state.loginState); //로컬스토리지에 저장된 유저 정보 접근

  const confirmRoadmap = () => {
    const updateName = nameRef.current.value;

    if (
      updateName === "" ||
      quillRef.current.value === "" ||
      tasks.length === 0
    ) {
      Swal.fire({
        icon: "warning",
        title:
          "Roadmap 이름과 설명을 모두 작성해주세요.\n문제는 최소 1문제 이상 포함되어야 합니다.",
      });
    } else {
      let task_ids = tasks.map((a) => a.id);
      axiosInstance
        .post(
          API.ROOMROADMAP,
          {
            name: updateName,
            desc: quillRef.current.value,
            tasks: task_ids,
          },
          {
            headers: {
              Authorization: "Bearer " + userInfo.access_token,
            },
            urlParams: {
              room_id: path.at(-1),
            },
          }
        )
        .then((res) => {
          Swal.fire({ icon: "success", title: "로드맵을 생성하였습니다" }).then(
            (res) => {
              if (res.isConfirmed) {
                navigate(`/room/${path.at(-1)}`);
              }
            }
          );
        });
    }
  };

  const addProblems = (e) => {
    console.log(e);
    if (tasks.includes(e)) {
      Swal.fire({ icon: "warning", title: "이미 추가된 문제입니다." });
    } else {
      Swal.fire({
        icon: "success",
        title: `No.${e.id}번 문제를 로드맵에 추가하였습니다.`,
      });

      setTasks([...tasks, e]);
    }
  };

  const deleteProblem = (e) => {
    Swal.fire({
      icon: "info",
      title: `No.${e}번 문제를 로드맵에서 제거하였습니다.`,
    });

    setTasks(tasks.filter((value) => value.id !== e));
  };

  // --------------------------- quill editor 관련 함수 ----------------------
  const imageHandler = () => {
    // 1. 이미지를 저장할 input type=file DOM을 만든다.
    const input = document.createElement("input");

    // 속성 써주기
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click(); // 에디터 이미지버튼을 클릭하면 이 input이 클릭된다.
    // input이 클릭되면 파일 선택창이 나타난다.

    // input에 변화가 생긴다면 = 이미지를 선택
    input.addEventListener("change", async () => {
      const file = input.files[0];
      const editor = quillRef.current.getEditor(); // 에디터 객체 가져오기
      //현재 에디터 커서 위치값을 가져온다
      const range = editor.getSelection();
      axiosInstance
        .post(
          API.IMAGE,
          {
            file: file, // 파일
          },
          {
            headers: {
              "Content-Type": `multipart/form-data; `,
              Authorization: "Bearer " + userInfo.access_token,
            },
            params: {
              type: 5,
            },
          }
        )
        .then((res) => {
          const IMG_URL = res.data;
          // 가져온 위치에 이미지를 삽입한다
          editor.insertEmbed(range.index, "image", IMG_URL);
          //커서를 한칸 뒤로 이동
          editor.setSelection(range.index + 1);
        })
        .catch(() => {
          //오류시에 안내 메시지를 삽입
          editor.insertText(range.index, "이미지 업로드에 실패했습니다", {
            color: "#ff0000",
            bold: true,
          });
        });
    });
  };

  //userMemo를 써야 오류가 안난다.
  const quill_module = useMemo(() => {
    return {
      toolbar: {
        container: [
          [
            { size: ["small", false, "large", "huge"] },
            { header: [1, 2, 3, 4, 5, 6, false] },
          ], // custom dropdown
          ["bold", "underline", "link", "image"], // toggled buttons

          [{ list: "ordered" }, { list: "bullet" }],
          [{ script: "super" }], // superscript

          [{ color: [] }], // dropdown with defaults from theme
          [{ align: [] }],

          ["clean"],
        ],
        handlers: {
          // 이미지 처리는 imageHandler로 처리
          image: imageHandler,
        },
      },
      imageResize: {
        modules: ["Resize", "DisplaySize"],
      },
    };
  }, []);

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
              <ReactQuill
                theme="snow"
                modules={quill_module}
                ref={quillRef}
                placeholder={"ex) for 문은 파이썬의 기본적인 반복문으로써 ..."}
                style={{
                  height: "400px",
                  width: "100%",
                  marginBottom: "50px",
                }}
              />
              {/* <InputGroup className="mb-0">
                <Form.Control
                  as="textarea"
                  ref={descRef}
                  placeholder="ex) 조건문과 반복문을 숙지하자"
                />
              </InputGroup> */}
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
                  resource={fetchData(API.TASK, {
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
              <MyTasksList tasks={tasks} deleteProblem={deleteProblem} />
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
    axiosInstance.get(API.CATEGORY).then((value) => {
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

const MyTasksList = ({ tasks, deleteProblem }) => {
  const [page, setPage] = useState(1);

  return (
    <>
      {tasks.slice(10 * (page - 1), 10 * page).map((e) => {
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
          count={Math.ceil(tasks.length / 10)}
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
