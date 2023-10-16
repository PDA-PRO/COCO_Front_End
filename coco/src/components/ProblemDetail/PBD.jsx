import React, { Suspense, useEffect } from "react";
import "./PBD.css";
import Button from "react-bootstrap/Button";
import { IoLogoPython } from "react-icons/io5";
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
import { IoMdPaperPlane } from "react-icons/io";
import { API } from "api/config";

export const PBD = () => {
  var path = window.location.pathname;
  path = path.split("/");
  return (
    <>
      <Suspense fallback={<>문제가 존재하지 않습니다</>}>
        <GetDetail resource={fetchData(API.TASK + path.at(-1))} />
      </Suspense>
    </>
  );
};

const GetDetail = ({ resource }) => {
  const detail = resource.read(); //api fetch 결과
  const navigate = useNavigate();
  const userInfo = useAppSelector((state) => state.loginState);
  const [codeLang, setcodeLang] = useState(0);
  var code = "";
  //submit이후 결과창 이동
  const goToResult = (e) => {
    navigate(`/status?user_id=${userInfo.id}`, {
      state: { user_id: userInfo.id },
    });
  };
  //코드 submit
  const submitCode = () => {
    if (userInfo.id === "") {
      const check = window.confirm(
        "로그인이 필요한 서비스입니다\n로그인 하시겠습니까"
      );
      if (check === true) {
        navigate("/login");
      }
    } else {
      Promise.resolve().then(
        axios
          .post(
            API.SUBMISSION,
            {
              taskid: detail.id,
              sourcecode: code,
              callbackurl: "string",
              lang: codeLang,
            },
            {
              headers: { Authorization: "Bearer " + userInfo.access_token },
            }
          )
          .then(function (response) {
            alert(`${userInfo.id}님 ${detail.id} 제출완료`);
            goToResult(userInfo.id, { state: { userid: userInfo.id } });
          })
          .catch(() => {
            alert("인증실패");
          })
      );
      return;
    }
  };

  const setMyTask = (task_id) => {
    console.log(task_id);
    axios
      .post(
        API.MYTASK,
        {},
        {
          headers: { Authorization: "Bearer " + userInfo.access_token },
          params: {
            task_id: task_id,
          },
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
          {userInfo.id === "" ? (
            <></>
          ) : (
            <div id="pbd-pick" onClick={() => setMyTask(detail.id)}>
              <IoMdPaperPlane size={25} />
              <p>Homework</p>
            </div>
          )}
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
                  <p className="PBD-txt">{detail.inputEx2}</p>
                </div>

                <div>
                  <div className="PBD-pbTitle">
                    <BsExclamationLg size={25} color="#00ff00" />
                    <h2>출력 예시</h2>
                  </div>

                  <p className="PBD-txt">{detail.outputEx2}</p>
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
                    <option value={0}>Python3</option>
                    <option value={1}>C</option>
                  </Form.Select>
                </div>
              </div>
              <div className="PBD-scroll">
                <CodeMirror
                  value=""
                  extensions={codeLang == 1 ? [cpp()] : [python()]}
                  onChange={(val) => {
                    code = val;
                  }}
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
            navigate(-1);
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
