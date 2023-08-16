import React, { useState, Suspense, useMemo } from "react";
import Accordion from "react-bootstrap/Accordion";
import Pagination from "@mui/material/Pagination";
import { BsCheckCircle, BsDashCircle } from "react-icons/bs";
import Form from "react-bootstrap/Form";
import "./QA.css";
import Button from "react-bootstrap/Button";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";
import Spinner from "react-bootstrap/esm/Spinner";
import fetchData from "../../../api/fetchTask";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import axios from "axios";
import { useAppSelector } from "../../../app/store";
import { API } from "api/config";

export const QA = () => {
  var path = window.location.pathname;
  path = path.split("/");

  // const maxPage = Math.ceil(problemList.length / 10);
  const maxPage = 10;
  const [page, setPage] = useState(1);
  const handlePage = (event) => {
    if (
      event.target.innerHTML ===
      '<path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>'
    ) {
      setPage(page - 1);
    } else if (
      event.target.innerHTML ===
      '<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>'
    ) {
      setPage(page + 1);
    } else {
      setPage(parseInt(event.target.outerText));
    }
  };

  return (
    <div className="QA">
      <div className="questions-body">
        <div className="qContents">
          <Accordion defaultActiveKey={["0"]} alwaysOpen>
            <Suspense fallback={<Spinner />}>
              <Question resource={fetchData(API.ROOMQUESTION + path.at(-1))} />
            </Suspense>
          </Accordion>
        </div>
      </div>
      <div className="pageController">
        <Pagination
          count={maxPage}
          variant="outlined"
          shape="rounded"
          defaultPage={1}
          onChange={(e) => handlePage(e)}
        />
      </div>
    </div>
  );
};

const Question = ({ resource }) => {
  const info = resource.read();
  var path = window.location.pathname;
  path = path.split("/");
  console.log(info);

  return (
    <>
      {info.map((e) => {
        return (
          <Accordion.Item eventKey={e.question.id}>
            <div className="Head-Ac">
              <Accordion.Header>
                Q :{" "}
                <div
                  dangerouslySetInnerHTML={{
                    __html: e.question.title,
                  }}
                ></div>
              </Accordion.Header>
              {/* <div className="check">
            {info.check ? (
              <BsCheckCircle size={25} color="skyblue" />
            ) : (
              <BsDashCircle size={25} color="grey" />
            )}
          </div> */}
            </div>

            <Accordion.Body>
              <div
                className="q_content"
                dangerouslySetInnerHTML={{
                  __html: e.question.question,
                }}
              ></div>
              {/* info에 들어있는 answer 배열로 넘겨줘서 map으로 answer 띄워주면 될듯*/}
              {e.answers.map((ans) => {
                return <Answer info={ans} />;
              })}
              <MakeAnswer room_id={path.at(-1)} q_id={e.question.id} />
            </Accordion.Body>
          </Accordion.Item>
        );
      })}
    </>
  );
};

const Answer = ({ info }) => {
  console.log(info);
  return (
    <div className="ans">
      <div
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
