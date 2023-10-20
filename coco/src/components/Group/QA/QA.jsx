import React, { useState, useMemo, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import Pagination from "@mui/material/Pagination";
import "./QA.css";
import Button from "react-bootstrap/Button";
import CodeMirror from "@uiw/react-codemirror";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { useAppSelector } from "../../../app/store";
import { API } from "api/config";
import { useQuery } from "@tanstack/react-query";
import { BsDashCircle, BsCheckCircle } from "react-icons/bs";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { BiInfoSquare } from "react-icons/bi";
import { AiOutlineRobot, AiOutlineQuestionCircle } from "react-icons/ai";
import Swal from "sweetalert2";
import axios from "axios";

export const QA = () => {
  const userInfo = useAppSelector((state) => state.loginState);
  var path = window.location.pathname;
  path = path.split("/");
  const [page, setPage] = useState(1);
  const { data } = useQuery(
    ["qa", path.at(-1), page],
    () => {
      return axios.get(API.ROOMQUESTION + path.at(-1), {
        params: { size: 5, page: page },
        headers: {
          Authorization: "Bearer " + userInfo.access_token,
        },
      });
    },
    {
      suspense: true,
    }
  );
  return (
    <div className="QA">
      <div className="questions-body">
        <div className="qContents">
          <Accordion defaultActiveKey={["0"]} alwaysOpen>
            <Question
              resource={data.data.question_list}
              key={
                data.data.question_list.length > 0
                  ? data.data.question_list[0].id
                  : ""
              }
            />
          </Accordion>
        </div>
      </div>
      <div className="pageController">
        <Pagination
          count={Math.ceil(data.data.total / data.data.size)}
          variant="outlined"
          shape="rounded"
          defaultPage={1}
          page={page}
          onChange={(e, value) => setPage(value)}
        />
      </div>
    </div>
  );
};

const Question = ({ resource }) => {
  const info = resource;
  const userInfo = useAppSelector((state) => state.loginState);
  var path = window.location.pathname;
  path = path.split("/");

  function makeNoLine(arr) {
    if (arr.length == 0) {
      return "";
    } else {
      var dataArray = arr.split("\n");

      var numberedData = dataArray
        .map((item, index) => {
          return `${index + 1}@${item}`;
        })
        .join("\n");

      const strings = numberedData.split("\n").map((str) => {
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
  }

  const QforAI = (content, code, q_id) => {
    Swal.fire({
      icon: "question",
      title: content + `<pre class="swalCode">${code}</pre>` + "\n",

      showCancelButton: true,
      confirmButtonText: "TRY",
      footer: "시간이 다소 소요될 수 있습니다.",
    }).then((result) => {
      if (result.isConfirmed) {
        //여기에 axios 호출
        Swal.fire({
          icon: "info",
          title: "AI가 답변을 생성하고 있습니다.",
          showConfirmButton: false,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            axios
              .post(
                "http://localhost:8000/qa/main",
                {
                  content: content,
                  code: code,
                  room_id: path.at(-1),
                  q_id: q_id,
                },
                {
                  headers: {
                    Authorization: "Bearer " + userInfo.access_token,
                  },
                }
              )
              .then((res) => {
                if (res.data === true) {
                  Swal.fire({
                    icon: "success",
                    title: "AI로부터 답변이 등록되었습니다.",
                    timer: 1000,
                    showConfirmButton: false,
                  }).then(() => {
                    window.location.reload();
                  });
                } else {
                  Swal.fire({
                    icon: "info",
                    title: "AI로부터 등록된 답변이 존재합니다.",
                    timer: 1000,
                    showConfirmButton: false,
                  });
                }
              })
              .catch(() => {
                Swal.fire({
                  icon: "error",
                  title: "답변 생성 ai를 사용할 수 없습니다.",
                });
              });
          },
        });
      }
    });
  };

  return (
    <>
      {info.map((e) => {
        return (
          <Accordion.Item eventKey={e.id}>
            <div className="Head-Ac">
              <Accordion.Header>
                <span style={{ paddingRight: "7px", fontWeight: "600" }}>
                  Q :
                </span>
                <div style={{ fontWeight: "600" }}>{e.title}</div>
              </Accordion.Header>
              {/* {Todo : 질문 채택 및 표시} */}

              <div className="check">
                {e.check ? (
                  <BsCheckCircle size={25} color="skyblue" />
                ) : (
                  <BsDashCircle size={25} color="grey" />
                )}
              </div>
              {/* {Todo : 질문 채택 및 표시} */}
            </div>

            <Accordion.Body className="contentBody">
              {/* 질문 작성자, 레벨, 시간 출력 */}
              <div className="whoQue">
                <p>
                  작성자 :{" "}
                  <b>
                    <span style={{ color: "rgb(39, 148, 199)" }}>
                      Lv .{e.q_writer_level}
                    </span>{" "}
                    {e.writer}
                  </b>
                </p>
                <p>{getTime(e.time)}</p>
              </div>

              {/* 질문에 코드가 있으면 코드 출력 */}
              <div className="oneQuestion">
                <div
                  className="q_content"
                  dangerouslySetInnerHTML={{
                    __html: e.question,
                  }}
                  style={
                    e.code.length == 0
                      ? {}
                      : { borderBottom: "1px solid lightgray" }
                  }
                ></div>

                {e.code.length == 0 ? (
                  <></>
                ) : (
                  <>
                    <h4>CODE</h4>
                    <pre className="R-Code">{makeNoLine(e.code)}</pre>
                  </>
                )}
              </div>
              {/* 질문에 코드가 있으면 코드 출력 */}

              {/* AI에게 질문하기 */}

              <div
                className="qForAI"
                onClick={() => QforAI(e.question, e.code, e.id)}
              >
                {/* <Lottie options={defaultOptions} height={20} width={20} /> */}

                <p>AI에게 질문하기</p>
                <AiOutlineQuestionCircle size={23} />
              </div>

              {/* info에 들어있는 answer 배열로 넘겨줘서 map으로 answer 띄워주면 될듯*/}
              <div className="whoAns">
                <h4>Answer</h4>
              </div>

              {e.answers.map((ans, index) => {
                return (
                  <Answer
                    info={ans}
                    room_id={path.at(-1)}
                    writer={e.writer}
                    key={index}
                  />
                );
              })}
              <MakeAnswer room_id={path.at(-1)} q_id={e.id} />
            </Accordion.Body>
          </Accordion.Item>
        );
      })}
    </>
  );
};

const Answer = ({ info, room_id, writer }) => {
  const userInfo = useAppSelector((state) => state.loginState);
  const [isGood, setIsGood] = useState(info.check);
  useEffect(() => {}, [isGood]);

  function makeNoLine(arr) {
    if (arr.length == 0) {
      return "";
    } else {
      var dataArray = arr.split("\n");

      var numberedData = dataArray
        .map((item, index) => {
          return `${index + 1}@${item}`;
        })
        .join("\n");

      const strings = numberedData.split("\n").map((str) => {
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
  }

  const Good = () => {
    if (userInfo.id === writer) {
      if (isGood) {
        axios
          .put(
            API.SELECTANSWER,
            {
              room_id: room_id,
              a_id: info.a_id,
              select: 0,
              ans_writer: info.ans_writer,
            },
            { headers: { Authorization: "Bearer " + userInfo.access_token } }
          )
          .then((res) => {
            if (res.data.code) {
              setIsGood(0);
              Swal.fire({ icon: "info", title: "채택이 취소되었습니다." });

              // window.location.replace(`/room/${room_id}`);
            } else {
              Swal.fire({
                icon: "error",
                title: "ERROR - SERVER COMMUNICATION FAILED",
              });
            }
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "ERROR - SERVER IDENTIFICATION FAILED",
            });
          });
      } else {
        axios
          .put(
            API.SELECTANSWER,
            {
              room_id: room_id,
              a_id: info.a_id,
              select: 1,
              ans_writer: info.ans_writer,
            },
            { headers: { Authorization: "Bearer " + userInfo.access_token } }
          )
          .then((res) => {
            if (res.data.code) {
              setIsGood(1);
              Swal.fire({
                icon: "success",
                title:
                  "답변이 채택되었습니다.\n작성자에게 채택 알림이 발송됩니다.",
              });
              // window.location.replace(`/room/${room_id}`);
            } else {
              Swal.fire({
                icon: "error",
                title: "ERROR - SERVER COMMUNICATION FAILED",
              });
            }
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "ERROR - SERVER IDENTIFICATION FAILED",
            });
          });
      }
    } else {
      Swal.fire({ icon: "warning", title: "질문 작성자가 아닙니다." });
    }
  };

  return (
    <div
      className="ans"
      style={
        info.ans_writer != null
          ? { backgroundColor: "rgb(247, 252, 255)" }
          : { backgroundColor: "rgb(254, 244, 255)" }
      }
    >
      <div className="ansTop">
        <div className="nameAnddate">
          {info.ans_writer === null ? (
            <div className="fromAI">
              <img src="/image/chatbot.png" width="30px"></img>
              <h4 style={{ fontSize: "0.9em", fontWeight: "600" }}>
                AI가 작성한 답변입니다.
              </h4>
            </div>
          ) : (
            <p>{info.ans_writer}</p>
          )}

          <p>{getTime(info.time)}</p>
        </div>

        {isGood === 0 ? (
          <div className="itGood" onClick={() => Good()}>
            <AiOutlineLike size={20} />
            <p>채택하기</p>
          </div>
        ) : (
          <div className="itGood" onClick={() => Good()}>
            <AiFillLike size={20} color="blue" />
            <p style={{ color: "blue" }}>채택된 답변</p>
          </div>
        )}
      </div>

      <div
        className="AnswerContent"
        dangerouslySetInnerHTML={{
          __html: info.answer,
        }}
      ></div>
      {info.code.length == 0 ? (
        <></>
      ) : (
        <>
          <h4>CODE</h4>
          <pre className="R-Code">{makeNoLine(info.code)}</pre>
        </>
      )}
    </div>
  );
};

const MakeAnswer = ({ room_id, q_id }) => {
  const userInfo = useAppSelector((state) => state.loginState);
  const [quillValue, setquillValue] = useState(""); // 메인 설명 html State !필수
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const quill_module = useMemo(() => {
    return {
      toolbar: { container: ["bold"] },
    };
  }, []);

  const uploadAnswer = () => {
    axios
      .post(
        API.ROOMANSWER,
        {
          room_id: room_id,
          q_id: q_id,
          answer: quillValue,
          code: code,
        },
        {
          headers: { Authorization: "Bearer " + userInfo.access_token },
        }
      )
      .then(function (response) {
        if (response.data.code) {
          Swal.fire({ icon: "success", title: "답변 업로드 성공" }).then(
            (res) => {
              if (res.isConfirmed) {
                window.location.reload();
              }
            }
          );
        } else {
          Swal.fire({
            icon: "error",
            title: "ERROR - SERVER COMMUNICATION FAILED",
          });
        }
      })
      .catch(() => {
        Swal.fire({ icon: "error", title: "답변 등록 실패" });
      });
  };

  return (
    <div className="makeAns">
      <h5>답변 등록하기</h5>
      <ReactQuill
        id="quill"
        theme="bubble"
        onChange={setquillValue}
        modules={quill_module}
        value={quillValue}
        placeholder={"내용을 입력해주세요."}
      />

      <CodeMirror
        value="print('hello')"
        onChange={(value) => {
          setCode(value);
        }}
      />

      <Button
        variant="outline-info"
        id="answerSubmit"
        onClick={() => uploadAnswer()}
      >
        Submit
      </Button>
    </div>
  );
};

const getTime = (time) => {
  time = time.split("T");
  return time[0] + " " + time[1];
};
