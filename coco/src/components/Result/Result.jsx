import React, { Suspense, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Footer } from "../Home/Footer";
import { Header } from "../Home/Header";
import { IoLogoPython } from "react-icons/io5";
import "./Result.css";
import { RiEmotionLaughLine, RiEmotionSadLine } from "react-icons/ri";
import styled from "styled-components";
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
import { BiRightArrowAlt } from "react-icons/bi";
import { OtherLogic } from "./OtherLogic";
import ReactDiffViewer from "react-diff-viewer";

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

  var wrongLines = [];
  var wrongStart = [];
  var wrongEnd = [];
  for (let i = 0; i < problemList.lint.length; i++) {
    wrongLines.push(problemList.lint[i].line);
    wrongStart.push(problemList.lint[i].column);
    wrongEnd.push(problemList.lint[i].endColumn);
  }

  console.log("lint", problemList.lint);

  function makeLine(arr, line, start, end) {
    console.log(line, start, end);
    function isRight(line, start, end) {
      line.shift();
      start.shift();
      end.shift();
    }

    if (end[0] === null) {
      console.log("여기 들어오긴 함?");
      const strings = arr.split("\n").map((str) => {
        const [num, val] = str.split("@");
        return (
          <div className="codeLine">
            <div className="codeNum">{num}.</div>

            {line[0] == num ? (
              <div className="codeTxt">
                {val.slice(0, start[0] - 1)}
                <u style={{ color: "red", fontWeight: "600" }}>
                  {val.slice(start[0] - 1)}
                </u>
                {isRight(line, start, end)}
              </div>
            ) : (
              <div className="codeTxt">{val}</div>
            )}
          </div>
        );
      });
      return strings;
    } else {
      console.log("일로 들어옴");
      const strings = arr.split("\n").map((str) => {
        const [num, val] = str.split("@");
        return (
          <div className="codeLine">
            <div className="codeNum">{num}.</div>

            {line[0] == num ? (
              <div className="codeTxt">
                {val.slice(0, start[0])}
                <u style={{ color: "red", fontWeight: "600" }}>
                  {val.slice(start[0], end[0])}
                </u>
                {val.slice(end[0])}
                {isRight(line, start, end)}
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
    setOtherLogic(!otherLogic);
  };

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
              {setLevel(info.status)}
            </div>

            <p>정답률 : 54.6%</p>
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
                <pre className="R-Code">{makeNoLine(numberedData)}</pre>
              ) : (
                <pre className="R-Code">
                  {makeLine(numberedData, wrongLines, wrongStart, wrongEnd)}
                </pre>
              )}
            </div>
            {problemList.subDetail["status"] === 3 ? (
              <div className="afterCorrect" onClick={() => changeLogic()}>
                <p>다른 로직 코드 보러가기</p>
                <BsBoxArrowInRight size={23} />
              </div>
            ) : (
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
            )}

            {wpc === 1 ? (
              <div className="wpcBox">
                <div className="wpcItem">
                  <p>내 제출 코드</p>
                </div>

                <div className="wpcItem">
                  <p>AI 분석 후 코드</p>
                </div>
                <div className="differ">
                  <ReactDiffViewer
                    oldValue={problemList.subDetail["code"]}
                    newValue={problemList.subDetail["code"]} // 여기에 WPC 받아온 code
                    splitView={true}
                    // hideLineNumbers={true}
                    showDiffOnly={false}
                    // codeFoldMessageRenderer={3}
                  />
                </div>

                {/* <BiRightArrowAlt size={30} style={{ marginTop: "25px" }} /> */}
              </div>
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
            <OtherLogic changeLogic={changeLogic} />
          </>
        )}
      </div>
    </div>
  );
};

// const WPC = () => {
//   return (
//     <>
//       <p>태그</p>
//     </>
//   );
// };

const Lint = ({ props }) => {
  console.log(props.length);

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
