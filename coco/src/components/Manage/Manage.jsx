import React, { Suspense, useRef } from "react";
import "./Manage.css";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import {
  BsArrowDownRight,
  BsArrowUpLeft,
  BsImages,
  BsUiChecksGrid,
  BsFileEarmarkZip,
} from "react-icons/bs";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import fetchData from "../../api/fetchTask";

export const Manage = () => {
  // --------------------------- 페이지 전환 --------------------------------
  const firstRef = useRef(null);
  const secondRef = useRef(null);
  const thirdRef = useRef(null);
  const navigate = useNavigate();
  const moveHome = () => {
    navigate("/");
  };

  // --------------------------- 페이지 전환 --------------------------------

  // --------------------------- POST 보낼 값 State 화 ----------------------
  const [title, setTitle] = useState(""); // 제목 State !필수
  const [desc, setDesc] = useState(""); // 디스크립션 State !필수
  const [desPic, setDesPic] = useState(null); // 디스크립션 사진 State

  const [diff, setDiff] = useState(""); // 난이도 State !필수
  const [time, setTime] = useState(""); // 시간제한 State !필수
  const [mem, setMem] = useState(""); // 메모리제한 State !필수

  const [inputDesc, setInputDesc] = useState(""); // 입력 설명 State !필수
  const [inputEx1, setInputEx1] = useState(""); // 입력 예시 State !필수
  const [inputEx2, setInputEx2] = useState("");

  const [outputDesc, setOutputDesc] = useState(""); // 출력 설명 State !필수
  const [outputEx1, setOutputEx1] = useState(""); // 출력 예시 State !필수
  const [outputEx2, setOutputEx2] = useState("");

  const [py, setPy] = useState(true); // 설정 언어 State !필수
  const [cLan, setCLan] = useState(false); // 설정 언어 State !필수
  const [testCase, setTestCase] = useState(null); // 테스트 케이스 State !필수

  const onTitleHandler = (e) => {
    setTitle(e.currentTarget.value);
  };

  const onDescHandler = (e) => {
    setDesc(e.currentTarget.value);
  };

  const onDiffHandler = (e) => {
    setDiff(e.currentTarget.value);
  };

  const onTimeHandler = (e) => {
    setTime(e.currentTarget.value);
  };

  const onMemHandler = (e) => {
    setMem(e.currentTarget.value);
  };

  const onInputDescHandler = (e) => {
    setInputDesc(e.currentTarget.value);
  };

  const onInputEx1Handler = (e) => {
    setInputEx1(e.currentTarget.value);
  };

  const onInputEx2Handler = (e) => {
    setInputEx2(e.currentTarget.value);
  };

  const onOutputDescHandler = (e) => {
    setOutputDesc(e.currentTarget.value);
  };

  const onOutputEx1Handler = (e) => {
    setOutputEx1(e.currentTarget.value);
  };

  const onOutputEx2Handler = (e) => {
    setOutputEx2(e.currentTarget.value);
  };
  // --------------------------- POST 보낼 값 State 화 ----------------------

  // --------------------------- 파일 업로드에 관한 코드 ---------------------
  const [image, setImage] = React.useState("");
  const imageRef = React.useRef(null);

  function useDisplayImage() {
    const [result, setResult] = React.useState("");

    function uploader(e) {
      const imageFile = e.target.files[0];

      const reader = new FileReader();
      reader.addEventListener("load", (e) => {
        setResult(e.target.result);
      });

      reader.readAsDataURL(imageFile);
    }

    return { result, uploader };
  }

  const { result, uploader } = useDisplayImage();

  // --------------------------- 파일 업로드에 관한 코드 ---------------------

  // --------------------------- Submit 버튼으로 post ---------------------
  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("shoot");
    if (
      title == "" ||
      desc == "" ||
      diff == "" ||
      time == "" ||
      mem == "" ||
      inputDesc == "" ||
      inputEx1 == "" ||
      outputDesc == "" ||
      outputEx1 == ""
    ) {
      return alert("정보 입력 부족");
    } else {
      if (testCase == null) {
        console.log(testCase);
        console.log(desPic);
        axios
          .post(
            "http://127.0.0.1:8000/manage",
            {
              testCase: testCase, // 파일
            },
            {
              headers: { "Content-Type": `multipart/form-data; ` },
              params: {
                title: title,
                description: desc,
                diff: diff,
                timeLimit: time,
                memLimit: mem,
                inputDescription: inputDesc,
                inputEx1: inputEx1,
                inputEx2: inputEx2,
                outputDescription: outputDesc,
                outputEx1: outputEx1,
                outputEx2: outputEx2,
                python: py,
                C_Lan: cLan,
              },
            }
          )
          .then(function (response) {
            if (response.data.result === 1) {
              alert(`${title} 업로드 성공`);
              moveHome();
            } else {
              alert("ERROR - SERVER COMMUNICATION FAILED");
            }
          });
      } else {
        console.log(testCase);
        console.log(desPic);
        axios
          .post(
            "http://127.0.0.1:8000/manage",
            {
              desPic: desPic,
              testCase: testCase, // 파일
            },
            {
              headers: { "Content-Type": `multipart/form-data; ` },
              params: {
                title: title,
                description: desc,
                diff: diff,
                timeLimit: time,
                memLimit: mem,
                inputDescription: inputDesc,
                inputEx1: inputEx1,
                inputEx2: inputEx2,
                outputDescription: outputDesc,
                outputEx1: outputEx1,
                outputEx2: outputEx2,
                python: py,
                C_Lan: cLan,
              },
            }
          )
          .then(function (response) {
            if (response.data.result === 1) {
              alert(`${title} 업로드 성공`);
              moveHome();
            } else {
              alert("ERROR - SERVER COMMUNICATION FAILED");
            }
          });
      }
    }
  };

  // --------------------------- Submit 버튼으로 post ---------------------
  return (
    <div className="manage">
      <div className="m-head">
        <h2 id="m-title">관리자 : 조민수</h2>
        <h2 id="m-Logo" onClick={() => moveHome()}>
          COCO
        </h2>
      </div>
      <Menu refProps={{ firstRef, secondRef, thirdRef }} />

      <h2 className="mTi" ref={firstRef}>
        TASK UPLOAD
      </h2>
      <div className="m-upload">
        <InputGroup className="m-title">
          <InputGroup.Text id="inputGroup-sizing-default">
            Title
          </InputGroup.Text>
          <Form.Control
            placeholder="문제 제목을 입력해주세요. (문제 제목은 40자 이내)"
            onChange={onTitleHandler}
          />
        </InputGroup>
        <div className="m-upload-context">
          <div className="m-desc">
            {/* 문제 디스크립션 */}
            <InputGroup className="m-des">
              <InputGroup.Text>Des.</InputGroup.Text>
              <Form.Control
                as="textarea"
                style={{ minHeight: "550px" }}
                placeholder="문제에 대한 Description 입력"
                onChange={onDescHandler}
              />
            </InputGroup>
            {/* 문제 디스크립션 */}

            {/* 문제에 대한 사진 추가 */}
            <Form.Group controlId="formFileMultiple" className="m-des-img">
              <Form.Label>
                <BsImages size={20} style={{ marginRight: "15px" }} />
                문제 설명에 추가할 사진 선택
              </Form.Label>
              <Form.Control
                type="file"
                multiple
                onChange={(e) => {
                  setDesPic(e.target.files[0]);
                }}
              />
            </Form.Group>
            {result && (
              <img
                ref={imageRef}
                src={result}
                style={({ maxWidth: "100%" }, { minWidth: "100%" })}
              />
            )}

            {/* 문제에 대한 사진 추가 */}

            {/* 문제에 대한 난이도 선정 */}
            <div className="m-diff">
              <FloatingLabel controlId="floatingSelect" label="난이도">
                <Form.Select aria-label="F" onChange={onDiffHandler}>
                  <option>문제에 대한 난이도 선택</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Form.Select>
              </FloatingLabel>
            </div>
            {/* 문제에 대한 난이도 선정 */}

            {/* 문제에 대한 시간제한 선정 */}
            <InputGroup id="m-timeLimit">
              <InputGroup.Text>Time Limit</InputGroup.Text>
              <Form.Control onChange={onTimeHandler} />
              <InputGroup.Text>SEC</InputGroup.Text>
            </InputGroup>
            {/* 문제에 대한 시간제한 선정 */}

            {/* 문제에 대한 메모리 제한 선정 */}
            <InputGroup id="m-memLimit">
              <InputGroup.Text>Memory Limit</InputGroup.Text>
              <Form.Control onChange={onMemHandler} />
              <InputGroup.Text>MB</InputGroup.Text>
            </InputGroup>
            {/* 문제에 대한 메모리 제한 선정 */}
          </div>

          <div className="m-inOut">
            {/* 문제 입력에 대한 설명 */}
            <InputGroup className="m-input">
              <InputGroup.Text id="inputGroup-sizing-default">
                <BsArrowDownRight size={30} />
              </InputGroup.Text>
              <Form.Control
                onChange={onInputDescHandler}
                placeholder="문제 입력에 대한 설명 입력."
                as="textarea"
                style={{ minHeight: "120px" }}
              />
            </InputGroup>

            <FloatingLabel
              controlId="floatingTextarea"
              label="입력 예시 01"
              id="m-input-one"
            >
              <Form.Control
                as="textarea"
                placeholder="입력 예시"
                onChange={onInputEx1Handler}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingTextarea"
              label="입력 예시 02"
              id="m-input-two"
            >
              <Form.Control
                as="textarea"
                placeholder="입력 예시"
                onChange={onInputEx2Handler}
              />
            </FloatingLabel>

            {/* 문제 입력에 대한 설명 */}

            {/* 문제 출력에 대한 설명 */}

            <InputGroup className="m-output" style={{ marginTop: "100px" }}>
              <InputGroup.Text id="inputGroup-sizing-default">
                <BsArrowUpLeft size={30} />
              </InputGroup.Text>
              <Form.Control
                placeholder="문제 출력에 대한 설명 입력."
                as="textarea"
                style={{ minHeight: "120px" }}
                onChange={onOutputDescHandler}
              />
            </InputGroup>

            <FloatingLabel
              controlId="floatingTextarea"
              label="출력 예시 01"
              id="m-output-one"
            >
              <Form.Control
                as="textarea"
                placeholder="출력 예시"
                onChange={onOutputEx1Handler}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingTextarea"
              label="출력 예시 02"
              id="m-output-two"
            >
              <Form.Control
                as="textarea"
                placeholder="출력 예시"
                onChange={onOutputEx2Handler}
              />
            </FloatingLabel>

            {/* 문제 입력에 대한 설명 */}

            {/* 문제 풀이 가능 언어 선택 */}
            <Form className="m-choLen">
              <p style={{ margin: "0 !important" }}>
                <span>
                  <BsUiChecksGrid size={20} style={{ marginRight: "20px" }} />
                </span>
                문제 풀이 가능 언어
              </p>
              {["checkbox"].map((type) => (
                <div key={`inline-${type}`} className="m-lan">
                  <Form.Check
                    inline
                    label="Python3"
                    defaultChecked
                    type={type}
                    id="m-lan-py"
                    style={{ marginRight: "80px" }}
                    onChange={() => {
                      setPy(true);
                    }}
                  />
                  <Form.Check
                    inline
                    label="C언어"
                    type={type}
                    id="m-lan-c"
                    onChange={() => {
                      setCLan(true);
                    }}
                  />
                </div>
              ))}
            </Form>

            {/* 문제 풀이 가능 언어 선택 */}

            {/* 입출력 테스트 케이스 zip파일 */}

            <Form.Group controlId="formFileMultiple" className="m-testCase">
              <Form.Label>
                <BsFileEarmarkZip size={20} style={{ marginRight: "15px" }} />
                문제에 대한 Test Case (.zip)
              </Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => {
                  setTestCase(e.target.files[0]);
                }}
              />
            </Form.Group>

            {/* 입출력 테스트 케이스 zip파일 */}
          </div>
        </div>

        <Button
          variant="outline-secondary"
          id="m-submit_btn"
          onClick={onSubmitHandler}
        >
          SUBMIT
        </Button>
      </div>

      <h2 className="mTi" ref={secondRef}>
        TASK LIST
      </h2>
      <div>
        <Suspense fallback={<Spinner />}>
          <TaskList resource={fetchData(`http://127.0.0.1:8000/tasklist`)} />
        </Suspense>
      </div>

      <h2 className="mTi" ref={thirdRef}>
        POST LIST
      </h2>
      <div>
        <Suspense fallback={<Spinner />}>
          <BoardList resource={fetchData(`http://127.0.0.1:8000/boardlist`)} />
        </Suspense>
      </div>
    </div>
  );
};

//---------------------------------- 메뉴 ----------------------------------------------

const Menu = (props) => {
  console.log(props.refProps.firstRef.current);
  const moveTo = (e) => {
    switch (e) {
      case 1:
        props.refProps.firstRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        break;
      case 2:
        props.refProps.secondRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        break;
      case 3:
        props.refProps.thirdRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        break;
    }
  };

  return (
    <div className="manageMenu">
      <h3 onClick={() => moveTo(1)}>- TASK UPLOAD</h3>
      <h3 onClick={() => moveTo(2)}>- TASK LIST</h3>
      <h3 onClick={() => moveTo(3)}>- POST LIST</h3>
    </div>
  );
};

//----------------------------------문제 리스트----------------------------------------------

const TaskList = ({ resource }) => {
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

//----------------------------------게시글 리스트----------------------------------------------

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
