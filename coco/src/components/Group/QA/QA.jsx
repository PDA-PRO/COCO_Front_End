import React, { useState, useMemo, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import Pagination from "@mui/material/Pagination";
import "./QA.css";
import Button from "react-bootstrap/Button";
import CodeMirror from "@uiw/react-codemirror";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import axios from "axios";
import { useAppSelector } from "../../../app/store";
import { API } from "api/config";
import { useQuery } from "@tanstack/react-query";
import { BsDashCircle, BsCheckCircle } from "react-icons/bs";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";

export const QA = () => {
  var path = window.location.pathname;
  path = path.split("/");
  const [page, setPage] = useState(1);
  const { data } = useQuery(
    ["qa", path.at(-1), page],
    () => {
      return axios.get(API.ROOMQUESTION + path.at(-1), {
        params: { size: 1, page: page },
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
            <Question resource={data.data.question_list} />
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
  var path = window.location.pathname;
  path = path.split("/");
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
              {/* <div className="check">
                <BsDashCircle size={25} color="grey" />
              </div> */}
              <div className="check">
                {e.check ? (
                  <BsCheckCircle size={25} color="skyblue" />
                ) : (
                  <BsDashCircle size={25} color="grey" />
                )}
              </div>
            </div>

            <Accordion.Body className="contentBody">
              <div className="whoQue">
                <p>
                  작성자 :{" "}
                  <b>
                    <span style={{ color: "rgb(39, 148, 199)" }}>Lv 2.</span>{" "}
                    name
                  </b>
                </p>
                <p>23-09-10 19:30</p>
              </div>

              <div className="oneQuestion">
                <div
                  className="q_content"
                  dangerouslySetInnerHTML={{
                    __html: e.question,
                  }}
                ></div>

                <h4>CODE</h4>
                <div className="q_content">
                  <CodeMirror value={e.code} editable={false} />
                </div>
              </div>

              {/* info에 들어있는 answer 배열로 넘겨줘서 map으로 answer 띄워주면 될듯*/}
              <div className="whoAns">
                <h4>Answer</h4>
              </div>

              {e.answers.map((ans) => {
                return <Answer info={ans} room_id={path.at(-1)} />;
              })}
              <MakeAnswer room_id={path.at(-1)} q_id={e.id} />
            </Accordion.Body>
          </Accordion.Item>
        );
      })}
    </>
  );
};

const Answer = ({ info, room_id }) => {
  const userInfo = useAppSelector((state) => state.loginState);
  const [isGood, setIsGood] = useState(info.check);

  useEffect(() => {
    setIsGood(info.check);
  });

  const Good = () => {
    if (userInfo.id === info.ans_writer) {
      if (isGood) {
        if (
          window.confirm("이미 채택된 답변입니다.\n채택을 취소하시겠습니까?")
        ) {
          axios
            .put(API.SELECTANSWER, {
              room_id: room_id,
              a_id: info.a_id,
              select: 0,
            })
            .then((res) => {
              if (res.data === true) {
                setIsGood(0);
                alert("채택이 취소되었습니다.");
                // window.location.replace(`/room/${room_id}`);
              } else {
                alert("ERROR - SERVER COMMUNICATION FAILED");
              }
            })
            .catch(() => {
              alert("인증실패");
            });
        }
      } else {
        axios
          .put(API.SELECTANSWER, {
            room_id: room_id,
            a_id: info.a_id,
            select: 1,
          })
          .then((res) => {
            if (res.data === true) {
              setIsGood(1);
              alert("답변이 채택되었습니다.");
              // window.location.replace(`/room/${room_id}`);
            } else {
              alert("ERROR - SERVER COMMUNICATION FAILED");
            }
          })
          .catch(() => {
            alert("인증실패");
          });
      }
    } else {
      alert("질문 작성자가 아닙니다.");
    }
  };

  const getTime = (time) => {
    time = time.split("T");
    return time[0] + " " + time[1];
  };

  return (
    <div className="ans">
      <div className="ansTop">
        <div className="nameAnddate">
          <p>{info.ans_writer}</p>
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
      <CodeMirror width="100%" value={info.code} readOnly={true} />
    </div>
  );
};

const MakeAnswer = ({ room_id, q_id }) => {
  const userInfo = useAppSelector((state) => state.loginState);
  const [quillValue, setquillValue] = useState(""); // 메인 설명 html State !필수
  const [code, setCode] = useState("");

  const quill_module = useMemo(() => {
    return {
      toolbar: { container: ["bold"] },
    };
  }, []);

  const uploadAnswer = () => {
    console.log(q_id);
    axios
      .post(
        API.ROOMANSWER,
        {
          room_id: room_id,
          q_id: q_id,
          answer: quillValue,
          code: code,
          ans_writer: userInfo.id,
        },
        {
          headers: { Authorization: "Bearer " + userInfo.access_token },
        }
      )
      .then(function (response) {
        if (response.data === true) {
          alert(`답변 업로드 성공`);
          window.location.replace(`/room/${room_id}`);
        } else {
          alert("ERROR - SERVER COMMUNICATION FAILED");
        }
      })
      .catch(() => {
        alert("답변 등록 실패");
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
