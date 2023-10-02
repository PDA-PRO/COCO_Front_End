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

  const num = parseInt(id);

  const problemList = resource.read();
  console.log("오류here", problemList);

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

  const dateString = problemList["time"];
  const dateObject = new Date(dateString);

  const year = dateObject.getFullYear();

  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObject.getDate().toString().padStart(2, "0");

  const hours = dateObject.getHours().toString().padStart(2, "0");
  const minutes = dateObject.getMinutes().toString().padStart(2, "0");

  const formattedDate = `${
    year - 2000
  }년 ${month}월 ${day}일 ${hours}시${minutes}분`;

  const dataArray = problemList["code"].split("\n");

  const numberedData = dataArray
    .map((item, index) => {
      return `${index + 1}@${item}`;
    })
    .join("\n");

  function makeLine(arr, line, start, end) {
    const strings = arr.split("\n").map((str) => {
      const [num, val] = str.split("@");
      return (
        <div className="codeLine">
          <n className="codeNum">{num}.</n>

          {line == num ? (
            <n className="codeTxt">
              <u style={{ color: "red" }}>{val.slice(start, end + 1)}</u>
              {val.slice(end + 1)}
            </n>
          ) : (
            <n className="codeTxt">{val}</n>
          )}
        </div>
      );
    });

    return strings;
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
                    {isCorrect(problemList["status"])}
                  </div>
                  <p className="message">{problemList["message"]}</p>
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
              {problemList["status"] === 3 ? (
                <pre className="R-Code">{makeNoLine(numberedData)}</pre>
              ) : (
                <pre className="R-Code">{makeLine(numberedData, 1, 0, 4)}</pre>
              )}
            </div>
            {problemList["status"] === 3 ? (
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
                  <pre className="R-Code">
                    {makeLine(numberedData, 1, 0, 4)}
                  </pre>
                </div>
                <BiRightArrowAlt size={30} style={{ marginTop: "25px" }} />
                <div className="wpcItem">
                  <p>AI 분석 후 코드</p>
                  <pre className="R-Code">
                    {makeLine(numberedData, 1, 0, 4)}
                  </pre>
                  {/* <WPC /> */}
                </div>
              </div>
            ) : (
              <></>
            )}

            {problemList["status"] === 3 ? (
              <></>
            ) : (
              <Suspense>
                {/* <Lint
                  resource={fetchData(API.LINT, { params: { sub_id: num } })}
                /> */}
              </Suspense>
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

const WPC = () => {
  return (
    <>
      <p>태그</p>
    </>
  );
};

const Lint = ({ resource }) => {
  const info = resource.read();
  console.log(info);

  return (
    <div className="pylint">
      <div className="un">
        <MdOutlineManageSearch size={30} color="lightgreen" />
        <p>채점결과 세부사항</p>
      </div>
      <div className="detail">
        <li>오류 타입 : 'error'</li>
        <li>오류 메세지 : " Undefined variable 'dddddd' "</li>
      </div>
    </div>
  );
};
