import React, { Suspense } from "react";
import "./PBD.css";
import Button from "react-bootstrap/Button";
import { IoLogoPython } from "react-icons/io5";
import $ from "jquery";
import {
  BsClipboardCheck,
  BsArrowDownRight,
  BsArrowUpLeft,
  BsQuestionLg,
  BsExclamationLg,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import fetchData from "../../api/fetchTask";
import axios from "axios";
import { useAppSelector } from "../../app/store";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";
import Form from "react-bootstrap/Form";
import draftToHtml from "draftjs-to-html";
import { convertFromRaw } from "draft-js";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { IoMdPaperPlane } from "react-icons/io";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

export const PBD = () => {
  var path = window.location.pathname;
  path = path.split("/");
  // const resource = fetchData(`http://127.0.0.1:8000/problems/${path.at(-1)}`);
  return (
    <>
      <Suspense fallback={<>문제가 존재하지 않습니다</>}>
        <GetDetail
          resource={fetchData(`http://127.0.0.1:8000/problems/${path.at(-1)}/`)}
        />
      </Suspense>
    </>
  );
};

const GetDetail = ({ resource }) => {
  const detail = resource.read(); //api fetch 결과
  const navigate = useNavigate();
  const [code, setCode] = useState(""); //작성한 코드
  const userInfo = useAppSelector((state) => state.loginState);
  const [codeLang, setcodeLang] = useState(2);
  //submit이후 결과창 이동
  const goToResult = (e) => {
    navigate(`/status?user_id=${userInfo.id}`, {
      state: { user_id: userInfo.id },
    });
  };

  //코드 submit
  const submitCode = () => {
    console.log($(".cm-activeLine.cm-line").val());
    //setCode($("#hereCode").val);
    // Promise.resolve().then(
    //   axios
    //     .post(
    //       "http://127.0.0.1:8000/submission",
    //       {
    //         taskid: detail.id,
    //         userid: userInfo.id,
    //         sourcecode: code,
    //         callbackurl: "string",
    //         lang: codeLang,
    //       },
    //       {
    //         headers: { Authorization: "Bearer " + userInfo.access_token },
    //       }
    //     )
    //     .then(function (response) {
    //       alert(`${userInfo.id}님 ${detail.id} 제출완료`);
    //       goToResult(userInfo.id, { state: { userid: userInfo.id } });
    //     })
    //     .catch(() => {
    //       alert("인증실패");
    //     })
    // );
  };

  const setMyTask = (task_id) => {
    console.log(task_id);
    axios
      .post(
        "http://127.0.0.1:8000/mytask",
        {
          user_id: userInfo.id,
          task_id: task_id,
          solved: 0,
        },
        {
          headers: { Authorization: "Bearer " + userInfo.access_token },
        }
      )
      .then((res) => {
        if (res.data === false) {
          alert("이미 추가된 문제입니다");
        } else {
          alert("내 문제집에 추가하였습니다");
        }
      })
      .catch(() => {
        alert("내 문제집에 추가하지 못했습니다");
      });
  };

  return (
    <div className="PBD">
      <div className="PBD-title">
        <div className="problemsName-pbd">
          <div>No.{detail.id}</div>
          <div className="problemInfo-pbd">
            {detail.title}
            <div className="PBD-secTitle">
              <div className="PBD-timeLimit">
                시간제한 : {detail.timeLimit}s
              </div>
              <div className="PBD-memLimit">
                메모리 제한 : {detail.memLimit}MB
              </div>
            </div>
          </div>
        </div>
        <div className="pbd-topRight">
          <div
            className="problemsAns-pbd"
            style={{
              color:
                detail.rate == 0
                  ? "gray"
                  : detail.rate >= 40
                  ? "skyblue"
                  : "rgb(218, 55, 55)",
            }}
          >
            <span style={{ color: "gray" }} id="jung">
              {"정답률 :"}
            </span>
            {detail.rate}%
          </div>

          <div id="pbd-pick">
            <Suspense fallback={<>그룹 문제집에 추가</>}>
              <MyGroup
                resource={fetchData(
                  `http://127.0.0.1:8000/group/mygroup/${userInfo.id}`
                )}
                task_id={detail.id}
              />
            </Suspense>
          </div>

          <div id="pbd-pick" onClick={() => setMyTask(detail.id)}>
            <IoMdPaperPlane size={25} />
            <p>Homework</p>
          </div>
        </div>
      </div>

      <div className="PBD-body">
        <Allotment defaultSizes={[1, 1]} minSize={400} snap={true}>
          <div className="PBD-problem PBD-scroll">
            <div className="PBD-pbTxt">
              <div className="PBD-pbTitle">
                <BsClipboardCheck size={25} />
                <h2>문제 설명</h2>
              </div>
              <div
                className="PBD-txt"
                dangerouslySetInnerHTML={{
                  __html: detail.mainDesc,
                }}
              />
            </div>
            <div className="PBD-pbTxt">
              <div className="PBD-pbTitle">
                <BsArrowDownRight size={25} color="red" />
                <h2>Input</h2>
              </div>
              <p className="PBD-txt">{detail.inDesc}</p>
            </div>
            <div className="PBD-pbTxt">
              <div className="PBD-pbTitle">
                <BsArrowUpLeft size={25} color="#00ff00" />
                <h2>Output</h2>
              </div>
              <p className="PBD-txt">{detail.outDesc}</p>
            </div>

            <div className="PBD-exBox">
              <div>
                <div className="PBD-pbTitle">
                  <BsQuestionLg size={25} color="red" />
                  <h2>입력 예시</h2>
                </div>
                <p className="PBD-txt">{detail.inputEx1}</p>
              </div>

              <div>
                <div className="PBD-pbTitle">
                  <BsExclamationLg size={25} color="#00ff00" />
                  <h2>출력 예시</h2>
                </div>

                <p className="PBD-txt">{detail.outputEx1}</p>
              </div>
            </div>
            {detail.inputEx2 != "" ? (
              <div className="PBD-exBox">
                <div>
                  <div className="PBD-pbTitle">
                    <BsQuestionLg size={25} color="red" />
                    <h2>입력 예시</h2>
                  </div>
                  <p className="PBD-txt">{detail.inputEx1}</p>
                </div>

                <div>
                  <div className="PBD-pbTitle">
                    <BsExclamationLg size={25} color="#00ff00" />
                    <h2>출력 예시</h2>
                  </div>

                  <p className="PBD-txt">{detail.outputEx1}</p>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
          <Allotment.Pane snap={false}>
            <div className="PBD-input">
              <div className="PBD-pbTitle">
                <IoLogoPython size={25} color="skyblue" />
                <h2>코드 입력 : </h2>
                <div>
                  <Form.Select
                    size="sm"
                    aria-label="F"
                    onChange={(e) => {
                      setcodeLang(e.currentTarget.value);
                    }}
                  >
                    {detail.python === 1 ? (
                      <option value={2}>Python3</option>
                    ) : (
                      <></>
                    )}
                    {detail.C_Lan === 1 ? <option value={1}>C</option> : <></>}
                  </Form.Select>
                </div>
              </div>
              <div className="PBD-scroll">
                <CodeMirror
                  value=""
                  extensions={codeLang == 1 ? [cpp()] : [python()]}
                />
              </div>
            </div>
          </Allotment.Pane>
        </Allotment>
      </div>
      <div className="PBD-menu">
        <Button
          variant="outline-secondary"
          id="submit_btn"
          onClick={() => {
            navigate(`/problems`);
          }}
        >
          문제목록
        </Button>
        <Button
          variant="outline-secondary"
          id="submit_btn"
          onClick={submitCode}
        >
          SUBMIT
        </Button>
      </div>
    </div>
  );
};

const MyGroup = ({ resource, task_id }) => {
  const data = resource.read();
  const toGroupTask = (group_id, group_name, task_id) => {
    axios
      .post("http://127.0.0.1:8000/group/add_problem", {
        group_id: group_id,
        task_id: task_id,
      })
      .then((res) => {
        console.log(res);
        if (res.data === false) {
          alert("이미 추가된 문제입니다");
        } else {
          alert(`${group_name} 문제집에 추가하였습니다`);
        }
      })
      .catch(() => {
        alert(`${group_name} 문제집에 추가하지 못했습니다`);
      });
  };
  return (
    <>
      <DropdownButton id="dropdown-basic-button" title="그룹 문제집에 추가">
        {data.map((e) => {
          return (
            <Dropdown.Item onClick={() => toGroupTask(e.id, e.name, task_id)}>
              {e.name}
            </Dropdown.Item>
          );
        })}
      </DropdownButton>
    </>
  );
};
