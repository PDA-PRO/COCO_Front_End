import React, { Suspense, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Footer } from "../Home/Footer";
import { Header } from "../Home/Header";
import "./Result.css";
import fetchData from "../../api/fetchTask";
import Spinner from "react-bootstrap/Spinner";
import { useAppSelector } from "../../app/store";
import { API } from "api/config";
import {
  TiBatteryCharge,
  TiBatteryLow,
  TiBatteryMid,
  TiBatteryHigh,
  TiBatteryFull,
} from "react-icons/ti";
import {
  BsSlashCircle,
  BsCheckCircle,
  BsBoxArrowInRight,
  BsX,
} from "react-icons/bs";
import { VscListFlat } from "react-icons/vsc";
import { MdOutlineManageSearch } from "react-icons/md";
import { OtherLogic } from "./OtherLogic";
import ReactDiffViewer from "react-diff-viewer";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { BiTimeFive, BiMemoryCard } from "react-icons/bi";

export const Result = (code) => {
  const { id } = useParams();
  const locate = useLocation();
  const userInfo = useAppSelector((state) => state.loginState);

  const num = parseInt(id);

  return (
    <>
      <Header />
      <Suspense fallback={<Spinner />}>
        <ResultBox
          resource={fetchData(API.RESULT + num, {
            headers: { Authorization: "Bearer " + userInfo.access_token },
          })}
          info={locate.state.info}
        />
      </Suspense>
      <Footer />
    </>
  );
};

const ResultBox = ({ resource, info }) => {
  const userInfo = useAppSelector((state) => state.loginState);
  const { id } = useParams();
  const [wpc, setWpc] = useState(0);
  const [otherLogic, setOtherLogic] = useState(false);

  const problemList = resource.read();

  const setLang = (e) => {
    switch (e) {
      case 0:
        return (
          <div className="un2">
            <img src="/image/python.png" height="27px" alt="" />
            <p style={{ fontWeight: "600" }}>Python 3</p>
          </div>
        );

      case 1:
        return (
          <div className="un2">
            <img src="/image/lan_c2.png" height="27px" alt="" />
            <p>C</p>
          </div>
        );
    }
  };

  const setLevel = (e) => {
    switch (e) {
      case 1:
        return <TiBatteryLow size={40} color="rgb(98, 148, 255)" />;
      case 2:
        return <TiBatteryMid size={40} color="#9DD84B" />;
      case 3:
        return <TiBatteryHigh size={40} color="#ff7e00" />;
      case 4:
        return <TiBatteryFull size={40} color="red" />;
      case 5:
        return <TiBatteryCharge size={40} color="#7d1b7e" />;
    }
  };

  const isCorrect = (e) => {
    switch (e) {
      case 3:
        return (
          <>
            <BsCheckCircle size={25} color="rgb(98, 148, 255)" />{" "}
            <p style={{ color: "rgb(98, 148, 255)" }}>정답</p>
          </>
        );
      default:
        return (
          <>
            <BsSlashCircle size={25} color="red" />{" "}
            <p style={{ color: "red" }}>오답</p>
          </>
        );
    }
  };

  // ---------------- 날짜 표시 위한 변수 선언 및 함수

  const dateString = problemList.subDetail["time"];
  const dateObject = new Date(dateString);

  const year = dateObject.getFullYear();

  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObject.getDate().toString().padStart(2, "0");

  const hours = dateObject.getHours().toString().padStart(2, "0");
  const minutes = dateObject.getMinutes().toString().padStart(2, "0");

  const formattedDate = `${
    year - 2000
  }년 ${month}월 ${day}일 ${hours}시${minutes}분`;

  // ---------------- 날짜 표시 위한 변수 선언 및 함수

  // ---------------- 코드 옆 라인 숫자 표시 위한 변수 선언 및 함수

  const dataArray = problemList.subDetail["code"].split("\n");

  const numberedData = dataArray
    .map((item, index) => {
      return `${index + 1}@${item}`;
    })
    .join("\n");

  console.log(problemList.lint);
  var wrongLines = [];
  var wrongStart = [];
  var wrongEnd = [];
  var messages = [];
  for (let i = 0; i < problemList.lint.length; i++) {
    wrongLines.push(problemList.lint[i].line);
    wrongStart.push(problemList.lint[i].column);
    wrongEnd.push(problemList.lint[i].endColumn);
    messages.push(problemList.lint[i].message);
  }

  function makeLine(arr, line, start, end, message) {
    console.log(line, start, end);
    function isRight(line, start, end, message) {
      line.shift();
      start.shift();
      end.shift();
      message.shift();
    }

    if (end[0] === null) {
      const strings = arr.split("\n").map((str) => {
        const [num, val] = str.split("@");
        return (
          <div className="codeLine">
            <div className="codeNum">{num}.</div>

            {line[0] == num ? (
              <div className="codeTxt">
                {val.slice(0, start[0] - 1)}
                <u
                  style={{ color: "red", fontWeight: "600", cursor: "pointer" }}
                  title={message[0]}
                >
                  {val.slice(start[0] - 1)}
                </u>
                {isRight(line, start, end, message)}
              </div>
            ) : (
              <div className="codeTxt">{val}</div>
            )}
          </div>
        );
      });
      return strings;
    } else {
      const strings = arr.split("\n").map((str) => {
        const [num, val] = str.split("@");
        return (
          <div className="codeLine">
            <div className="codeNum">{num}.</div>

            {line[0] == num ? (
              <div className="codeTxt">
                {val.slice(0, start[0])}
                <u
                  style={{ color: "red", fontWeight: "600", cursor: "pointer" }}
                  title={message[0]}
                >
                  {val.slice(start[0], end[0])}
                </u>
                {val.slice(end[0])}
                {isRight(line, start, end, message)}
              </div>
            ) : (
              <div className="codeTxt">{val}</div>
            )}
          </div>
        );
      });
      return strings;
    }
  }

  function makeNoLine(arr) {
    const strings = arr.split("\n").map((str) => {
      const [num, val] = str.split("@");
      return (
        <div className="codeLine">
          <n className="codeNum">{num}.</n>
          <n className="codeTxt">{val}</n>
        </div>
      );
    });

    return strings;
  }

  // ---------------- 코드 옆 라인 숫자 표시 위한 변수 선언 및 함수

  const changeLogic = () => {
    const code = problemList.subDetail["code"];

    if (otherLogic === false) {
      Swal.fire({
        icon: "info",
        title:
          "AI가 코드의 개선점을 찾아 수정하고 있습니다.\n\n 다른 로직의 코드를 찾고 있습니다.",
        footer: "시간이 다소 소요될 수 있습니다.",

        showConfirmButton: false,

        didOpen: () => {
          Swal.showLoading();
          //axios 받아서 then걸고, 불러와지면 setOtherLogic 변경
          axios
            .post(
              API.AI + "/ai-code",
              {
                code: code,
                task_id: info.task_id,
                sub_id: info.sub_id,
              },
              {
                headers: {
                  Authorization: "Bearer " + userInfo.access_token,
                },
              }
            )
            .then((res) => {
              if (res.data.data === true) {
                console.log(res.data.data);
                setOtherLogic(!otherLogic);
                setImproveCode(res.data.code);
                setImproveComment(res.data.desc);
                setTimeout(function () {
                  Swal.close();
                }, 1500);
              }
            });
        },
      });
    } else {
      setOtherLogic(!otherLogic);
    }
  };

  // AI가 주는 개선된 코드, 개선내역 comment
  const [improveCode, setImproveCode] = useState("");
  const [improveComment, setImproveComment] = useState("");

  return (
    <div className="Res">
      <div className="res-body">
        <div className="res-top">
          <div className="box">
            <p className="taskNo">PROBLEM ID : No.{info.task_id}</p>
            <p style={{ fontSize: "1.3em" }}>{info.title}</p>
          </div>

          <div className="box">
            <div
              className="un"
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <p>난이도 : </p>
              {setLevel(problemList.subDetail.diff)}
            </div>

            <p>정답률 : {problemList.subDetail.rate}%</p>
          </div>
        </div>

        {otherLogic === false ? (
          <>
            <div className="my_submit">
              <div className="fBox">
                <p className="taskNo2">SUBMIT ID : No.{info.sub_id}</p>
                <div className="box">
                  <div className="un2">
                    <p>제출 언어 : </p>
                    {setLang(info.lang)}
                  </div>
                </div>
              </div>

              <div className="fBox">
                <div className="scoring">
                  <div className="un">
                    <p>채점 결과 : </p>
                    {isCorrect(problemList.subDetail["status"])}
                  </div>
                  <p className="message">{problemList.subDetail["message"]}</p>
                </div>
                <div className="un">
                  <p className="time">제출 시간 : {formattedDate}</p>
                </div>
              </div>
            </div>

            <div className="myCode">
              <div className="un">
                <VscListFlat size={30} color="darkgray" />
                <p>내 제출 코드</p>
              </div>
              {problemList.subDetail["status"] === 3 ? (
                <div className="ifCorrect">
                  <pre className="R-Code">{makeNoLine(numberedData)}</pre>
                  <div className="timeAndMemory">
                    <div className="c-un">
                      <BiTimeFive color="gray" size={22} />
                      <p>소요 시간 : 2ms</p>
                    </div>
                    <div className="c-un">
                      <BiMemoryCard color="gray" size={22} />
                      <p>소요 메모리 : 15mb</p>
                    </div>
                  </div>
                </div>
              ) : (
                <pre className="R-Code">
                  {makeLine(
                    numberedData,
                    wrongLines,
                    wrongStart,
                    wrongEnd,
                    messages
                  )}
                </pre>
              )}
            </div>
            {problemList.subDetail["status"] === 3 ? (
              <div className="afterCorrect" onClick={() => changeLogic()}>
                <p>다른 로직 코드 보러가기</p>
                <BsBoxArrowInRight size={23} />
              </div>
            ) : problemList.subDetail["message"] == "TC 실패" ? (
              <>
                {wpc === 1 ? (
                  <div className="afterWrong" onClick={() => setWpc(2)}>
                    {/* 이름은 나중에 바꾸는걸로... */}
                    <p>닫기</p>
                    <BsX size={25} color="red" />
                  </div>
                ) : (
                  <div className="afterWrong" onClick={() => setWpc(1)}>
                    {/* 이름은 나중에 바꾸는걸로... */}
                    <p>WPC 확인하기</p>
                    <BsBoxArrowInRight size={23} />
                  </div>
                )}
              </>
            ) : null}

            {wpc === 1 ? (
              <WPC
                sub_id={problemList.subDetail["id"]}
                task_id={info.task_id}
                raw_code={problemList.subDetail["code"]}
              />
            ) : (
              <></>
            )}

            {problemList.subDetail["status"] === 3 ? (
              <></>
            ) : (
              <Lint props={problemList.lint} />
            )}
          </>
        ) : (
          <>
            <OtherLogic
              changeLogic={changeLogic}
              impCode={improveCode}
              impCmt={improveComment}
              task_id={info.task_id}
              sub_id={problemList.subDetail["id"]}
            />
          </>
        )}
      </div>
    </div>
  );
};

const WPC = ({ sub_id, task_id, raw_code }) => {
  const userInfo = useAppSelector((state) => state.loginState);
  const { isFetching, data, isError } = useQuery(
    ["wpc1", sub_id],
    () =>
      axios.get(API.WPC, {
        params: {
          sub_id: sub_id,
          task_id: task_id,
        },
        headers: { Authorization: "Bearer " + userInfo.access_token },
      }),
    { retry: false }
  );
  if (isFetching) {
    return <Spinner />;
  } else {
    if (isError) {
      return <div>확장 기능이 존재하지 않습니다.</div>;
    }
    if (data.data.status !== 1) {
      return <div>WPC 분석이 불가합니다.</div>;
    } else {
      return (
        <div className="wpcBox">
          <div className="wpcItem">
            <p>내 제출 코드</p>
          </div>

          <div className="wpcItem">
            <p>AI 분석 후 코드</p>
          </div>
          <div className="differ">
            <ReactDiffViewer
              oldValue={raw_code}
              newValue={data.data.wpc_result}
              splitView={true}
              showDiffOnly={false}
            />
          </div>
        </div>
      );
    }
  }
};

const Lint = ({ props }) => {
  return (
    <div className="pylint">
      <div className="un" style={{ marginBottom: "1em" }}>
        <MdOutlineManageSearch size={30} color="lightgreen" />
        <p>채점결과 세부사항</p>
      </div>
      {props.map((e) => {
        return <LintDetail info={e} />;
      })}
    </div>
  );
};

const LintDetail = (info) => {
  return (
    <div className="detail">
      <li>
        Line : <u style={{ color: "red" }}>No. {info.info.line}</u>
      </li>
      <li>오류 타입 : "{info.info.type}"</li>
      <li>오류 메세지 : "{info.info.message}"</li>
    </div>
  );
};
