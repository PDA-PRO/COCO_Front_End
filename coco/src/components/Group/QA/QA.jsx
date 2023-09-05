import React, { useState, useMemo } from "react";
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
import { BsDashCircle } from "react-icons/bs";

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

  console.log(info);

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
                <BsDashCircle size={25} color="grey" />
              </div>
              {/* <div className="check">
            {info.check ? (
              <BsCheckCircle size={25} color="skyblue" />
            ) : (
              <BsDashCircle size={25} color="grey" />
            )}
          </div> */}
            </div>

            <Accordion.Body>
              {"질문"}
              <div
                className="q_content"
                dangerouslySetInnerHTML={{
                  __html: e.question,
                }}
              ></div>
              {"코드"}
              <div className="q_content">
                <CodeMirror value={e.code} editable={false} />
              </div>

              {/* info에 들어있는 answer 배열로 넘겨줘서 map으로 answer 띄워주면 될듯*/}
              {"답변"}
              {e.answers.map((ans) => {
                return <Answer info={ans} />;
              })}
              <MakeAnswer room_id={path.at(-1)} q_id={e.id} />
            </Accordion.Body>
          </Accordion.Item>
        );
      })}
    </>
  );
};

const Answer = ({ info }) => {
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
