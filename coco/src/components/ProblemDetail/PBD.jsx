import React, { Suspense } from "react";
import "./PBD.css";
import Button from "react-bootstrap/Button";
import {
  BsClipboardCheck,
  BsArrowDownRight,
  BsArrowUpLeft,
  BsQuestionLg,
  BsExclamationLg,
  BsCodeSquare,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import fetchData from "../../api/fetchTask";
import { useAppSelector } from "../../app/store";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import CodeMirror from "@uiw/react-codemirror";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { IoMdPaperPlane } from "react-icons/io";
import { API } from "api/config";
import Swal from "sweetalert2";
import axiosInstance from "api/axiosWithPathParameter";
import { Notfound } from "../Notfound.jsx";
import { CustomSelect } from "components/CustomSelect";

export const PBD = () => {
  var path = window.location.pathname;
  path = path.split("/");
  return (
    <>
      <Suspense fallback={<>문제가 존재하지 않습니다</>}>
        <GetDetail
          resource={fetchData(API.TASK, {
            urlParams: { task_id: path.at(-1) },
          })}
        />
      </Suspense>
    </>
  );
};

const GetDetail = ({ resource }) => {
  const detail = resource.read(); //api fetch 결과
  function removeSubstringFromStart(inputString, targetSubstring) {
    const index = inputString.indexOf(targetSubstring);

    if (index !== -1) {
      return inputString.slice(0, index).trim();
    }

    return inputString;
  }
  const navigate = useNavigate();
  const userInfo = useAppSelector((state) => state.loginState);
  const [codeLang, setcodeLang] = useState({
    value: 0,
    label: "python",
    highlighter: "python",
  });
  const [code, setCode] = useState("");
  //submit이후 결과창 이동

  function hasAiIgnoreCase(arr) {
    return arr.some(
      (item) => typeof item === "string" && item.toLowerCase().includes("ai")
    );
  }

  const goToResult = (e) => {
    navigate(`/status?user_id=${userInfo.id}`, {
      state: { user_id: userInfo.id },
    });
  };
  //코드 submit
  const submitCode = () => {
    if (userInfo.id === "") {
      Swal.fire({
        icon: "warning",
        title: "로그인이 필요한 서비스입니다\n로그인 하시겠습니까?",
      }).then((res) => {
        if (res.isConfirmed) {
          navigate("/login");
        }
      });
    } else {
      Promise.resolve().then(
        axiosInstance
          .post(
            API.SUBMISSION,
            {
              taskid: detail.id,
              sourcecode: code,
              lang: codeLang.value,
            },
            {
              headers: { Authorization: "Bearer " + userInfo.access_token },
            }
          )
          .then(function (response) {
            Swal.fire({
              icon: "success",
              title: `${userInfo.id}님 \n ${detail.id} 제출완료`,
            });
            goToResult(userInfo.id, { state: { userid: userInfo.id } });
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "ERROR - Server Identification Failed",
            });
          })
      );
      return;
    }
  };

  const setMyTask = (task_id) => {
    axiosInstance
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
          Swal.fire({ icon: "error", title: "이미 추가된 문제입니다." });
        } else {
          Swal.fire({ icon: "success", title: "내 문제집에 추가하였습니다" });
        }
      })
      .catch(() => {
        Swal.fire({ icon: "error", title: "내 문제집에 추가하지 못했습니다" });
      });
  };

  return detail !== undefined ? (
    <div className="PBD">
      <div
        className="PBD-title"
        style={
          hasAiIgnoreCase(detail.category) === true
            ? { backgroundColor: "rgb(222, 255, 224)" }
            : { backgroundColor: "rgb(241, 241, 241)" }
        }
      >
        <div className="problemsName-pbd">
          <div>No.{detail.id}</div>
          <div className="problemInfo-pbd">
            {removeSubstringFromStart(detail.title, "wpc")}

            <div className="PBD-secTitle">
              <div className="PBD-timeLimit">
                시간제한 : {detail.timeLimit}s
              </div>
              <div className="PBD-memLimit">
                메모리 제한 : {detail.memLimit}MB
              </div>
              <div className="PBD-memLimit">
                카테고리 : {detail.category.join(", ")}
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
              {hasAiIgnoreCase(detail.category) === true ? (
                <div className="isAimade">
                  <img src="../image/ai-file.png" alt="ai" width="35px" />
                  <p>AI가 생성한 문제입니다.</p>
                </div>
              ) : (
                <></>
              )}
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
                <BsCodeSquare size={25} />
                <h2>코드 입력 : </h2>
                <div>
                  <CustomSelect
                    onChange={(newValue, actionMeta) => {
                      setcodeLang(newValue);
                    }}
                    defaultValue={codeLang}
                  />
                </div>
              </div>
              <div className="PBD-scroll">
                <CodeMirror
                  value=""
                  extensions={[loadLanguage(codeLang.highlighter)]}
                  onChange={(val) => {
                    setCode(val);
                  }}
                  basicSetup={{ autocompletion: false }}
                />
              </div>
            </div>
          </Allotment.Pane>
        </Allotment>
      </div>
      <div
        className="PBD-menu"
        style={
          hasAiIgnoreCase(detail.category) === true
            ? { backgroundColor: "rgb(222, 255, 224)" }
            : { backgroundColor: "rgb(241, 241, 241)" }
        }
      >
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
  ) : (
    <Notfound />
  );
};
