import React, { Suspense, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Footer } from "../Home/Footer";
import { Header } from "../Home/Header";
import "./Result.css";
import fetchData from "../../api/fetchTask";
import { TbListSearch, TbMessageCircleQuestion } from "react-icons/tb";
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
import ReactDiffViewer from "react-diff-viewer-continued";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { BiTimeFive, BiMemoryCard } from "react-icons/bi";
import axiosInstance from "api/axiosWithPathParameter";
import { Improve } from "./Improve";
import { useNavigate } from "react-router-dom";
import { Notfound } from "components/Notfound";
import Collapse from "react-bootstrap/Collapse";

export const Result = (code) => {
  const { id } = useParams();
  const locate = useLocation();
  const userInfo = useAppSelector((state) => state.loginState);
  const num = parseInt(id);

  return (
    <>
      <Header />
      {locate.state !== null ? (
        <Suspense fallback={<Spinner />}>
          <ResultBox
            resource={fetchData(API.SUBMISSION, {
              headers: { Authorization: "Bearer " + userInfo.access_token },
              urlParams: { sub_id: num },
            })}
            info={locate.state.info}
          />
        </Suspense>
      ) : (
        <div className="Res">
          <Notfound />
        </div>
      )}

      <Footer />
    </>
  );
};

const ResultBox = ({ resource, info }) => {
  const userInfo = useAppSelector((state) => state.loginState);
  const { id } = useParams();
  const [wpc, setWpc] = useState(0);
  const navigate = useNavigate();
  const problemList = resource.read();

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

  // AI가 주는 개선된 코드, 개선내역 comment
  const [improve, setImprove] = useState(false);
  const [otherLogic, setOtherLogic] = useState(false);
  const [improveCode, setImproveCode] = useState("");
  const [improveComment, setImproveComment] = useState("");

  const changeLogic = () => {
    setOtherLogic(!otherLogic);
  };

  const changeImprove = () => {
    const code = problemList.subDetail["code"];
    setOtherLogic(false);
    if (improve === false) {
      Swal.fire({
        icon: "info",
        title: "AI가 코드의 개선점을 찾아 수정하고 있습니다.",
        footer: "시간이 다소 소요될 수 있습니다.",

        showConfirmButton: false,

        didOpen: () => {
          Swal.showLoading();
          //axiosInstance 받아서 then걸고, 불러와지면 setOtherLogic 변경
          axiosInstance
            .post(
              API.BASE_URL + "/ai-code/main",
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
                setImprove(!improve);
                setImproveCode(res.data.code);
                setImproveComment(res.data.desc);
                setTimeout(function () {
                  Swal.close();
                }, 1500);
              }
            })
            .catch(() => {
              Swal.fire({
                icon: "error",
                title: "AI Plugin 사용 불가\n\n404 NOT FOUND",
              });
            });
        },
      });
    } else {
      setImprove(!improve);
    }
  };

  const goDetail = (e) => {
    navigate(`/problems/${e}`);
  };

  function removeSubstringFromStart(inputString, targetSubstring) {
    const index = inputString.indexOf(targetSubstring);

    if (index !== -1) {
      return inputString.slice(0, index).trim();
    }

    return inputString;
  }

  return (
    <div className="Res">
      <div className="res-body">
        <div
          className="res-top"
          onClick={() => goDetail(info.task_id)}
          style={{ cursor: "pointer" }}
        >
          <div className="box">
            <p className="taskNo">PROBLEM ID : No.{info.task_id}</p>
            <p style={{ fontSize: "1.2em" }}>
              {removeSubstringFromStart(info.title, "wpc")}
            </p>
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

        <div className="my_submit">
          <div className="fBox">
            <p className="taskNo2">SUBMIT ID : No.{info.sub_id}</p>
            <div className="box">
              <div className="un2">
                <p>제출 언어 : </p>
                <p style={{ fontWeight: "600" }}>{info.lang}</p>
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
                  <p>
                    소요 시간 : {problemList.subDetail["used_time"] * 1000}
                    ms
                  </p>
                </div>
                <div className="c-un">
                  <BiMemoryCard color="gray" size={22} />
                  <p>
                    소요 메모리 :{" "}
                    {Math.ceil(problemList.subDetail["used_memory"] / 1024)}
                    MB
                  </p>
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
          improve === false && otherLogic === false ? (
            <div className="ifRight">
              <div className="afterCorrect" onClick={() => changeImprove()}>
                <p>AI 코드 개선 요청하기</p>
                <TbMessageCircleQuestion size={23} />
              </div>
              <div className="afterCorrect" onClick={() => changeLogic()}>
                <p>유사 / 다른 로직의 코드 보러가기</p>
                <TbListSearch size={23} />
              </div>
            </div>
          ) : (
            <></>
          )
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

        {improve === true && otherLogic === false ? (
          <Improve
            changeLogic={changeImprove}
            impCode={improveCode}
            impCmt={improveComment}
          />
        ) : improve === false && otherLogic === true ? (
          <OtherLogic
            changeLogic={changeLogic}
            task_id={info.task_id}
            sub_id={problemList.subDetail["id"]}
          />
        ) : (
          <></>
        )}

        {wpc === 1 ? (
          <WPC sub_id={problemList.subDetail["id"]} task_id={info.task_id} />
        ) : (
          <></>
        )}

        {problemList.subDetail["status"] === 3 ? (
          <></>
        ) : (
          <ScoringDetail
            num_of_tc={problemList.subDetail["num_of_tc"]}
            lint={problemList.lint}
            tc={problemList.tcDetail}
          />
        )}
      </div>
    </div>
  );
};

const WPC = ({ sub_id, task_id }) => {
  const userInfo = useAppSelector((state) => state.loginState);
  const { isFetching, data, isError } = useQuery(
    ["wpc1", sub_id],
    () =>
      axiosInstance.post(
        API.WPC,
        {},
        {
          params: {
            sub_id: sub_id,
            task_id: task_id,
          },
          headers: { Authorization: "Bearer " + userInfo.access_token },
        }
      ),
    { retry: false }
  );
  if (isFetching) {
    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          minHeight: "120px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p
          style={{
            fontFamily: "Pretendard-Regular",
            margin: "0",
            fontSize: "1.2em",
            fontWeight: "600",
          }}
        >
          is Loading...
        </p>
      </div>
    );
  } else {
    if (isError) {
      return (
        <div
          style={{
            width: "100%",
            minHeight: "120px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p
            style={{
              margin: "0",
              fontFamily: "Pretendard-Regular",
              fontWeight: "600",
              fontSize: "1.1em",
            }}
          >
            확장 기능이 존재하지 않습니다.
          </p>
        </div>
      );
    }
    if (data.data.status !== 1) {
      return (
        <div
          style={{
            width: "100%",
            minHeight: "120px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p
            style={{
              margin: "0",
              fontFamily: "Pretendard-Regular",
              fontWeight: "600",
              fontSize: "1.1em",
            }}
          >
            WPC 분석이 불가합니다.
          </p>
        </div>
      );
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
              oldValue={data.data.bug_code}
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

const ScoringDetail = ({ lint, tc, num_of_tc }) => {
  return (
    <div className="detail">
      <div className="un" style={{ marginBottom: "1em" }}>
        <MdOutlineManageSearch size={30} color="lightgreen" />
        <p>채점결과 세부사항</p>
      </div>

      {/* <p>오류 분석</p>
      <div className="detail_box">
        {lint.map((e) => {
          return <LintDetail info={e} />;
        })}
      </div> */}

      <p>테스트 케이스 정보</p>
      <div className="detail_box">
        {tc.map((e) => {
          return <TcDetail tc_info={e} num_of_tc={num_of_tc} />;
        })}
      </div>
    </div>
  );
};

const TcDetail = ({ tc_info, num_of_tc }) => {
  const [open, setOpen] = useState(false);

  switch (tc_info.status) {
    case 1:
      tc_info.status = "런타임 오류";
      tc_info.reason = tc_info.stderr;
      break;
    case 2:
      tc_info.status = "시간 초과";
      tc_info.reason = "추가 사항 없음";
      break;
    case 3:
      tc_info.status = "메모리 초과";
      tc_info.reason = "추가 사항 없음";
      break;
    case 4:
      tc_info.status = "TC 틀림";
      tc_info.reason = tc_info.stdout;
      break;
    case 5:
      tc_info.status = "컴파일 오류";
      tc_info.reason = tc_info.stderr;
      break;
    default:
      break;
  }
  return (
    <div className="tc_detail_box">
      <div
        className="tc_detail"
        onClick={() => setOpen(!open)}
        aria-controls="wrong_reason"
        aria-expanded={open}
      >
        <p style={{ width: "100px" }}>{`${num_of_tc} / ${tc_info.tc_num}`}</p>
        <p>{tc_info.status}</p>
      </div>
      <Collapse in={open}>
        <p id="wrong_reason" onClick={() => setOpen(!open)}>
          {tc_info.reason}
        </p>
      </Collapse>
    </div>
  );
};

const LintDetail = (info) => {
  return (
    <div className="pylint">
      <li>
        Line : <u style={{ color: "red" }}>No. {info.info.line}</u>
      </li>
      <li>오류 타입 : "{info.info.type}"</li>
      <li>오류 메세지 : "{info.info.message}"</li>
    </div>
  );
};
