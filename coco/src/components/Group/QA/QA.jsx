import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Pagination from "@mui/material/Pagination";
import { BsCheckCircle, BsDashCircle } from "react-icons/bs";
import Form from "react-bootstrap/Form";
import "./QA.css";
import Button from "react-bootstrap/Button";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";

export const QA = () => {
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
            <Question />
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

const Question = ({}) => {
  // const info = resource.read();

  return (
    <Accordion.Item eventKey="0">
      <div className="Head-Ac">
        <Accordion.Header>
          Q :{" "}
          {/* <div
            dangerouslySetInnerHTML={{
              __html: info.context,
            }}
          ></div> */}
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
        {/* info에 들어있는 answer 배열로 넘겨줘서 map으로 answer 띄워주면 될듯*/}
        <Answer />
        <Answer />
        <MakeAnswer />
      </Accordion.Body>
    </Accordion.Item>
  );
};

const Answer = () => {
  return (
    <div className="ans">
      <p>작성자 : id1님</p>
      <p>1. 이렇게 이렇게 저렇게 하면 됩니다. 병신아</p>
      <p>print('hello')</p>
    </div>
  );
};

const MakeAnswer = () => {
  const [context, setContext] = useState("");
  const [code, setCode] = useState("");

  const onContextHandler = (e) => {
    setContext(e.currentTarget.value);
  };

  const uploadAnswer = () => {
    alert("답변이 등록되었습니다.");
  };

  return (
    <div className="makeAns">
      <Form.Control
        as="textarea"
        id="commentArea"
        style={{ height: "100px" }}
        placeholder="답변 내용 작성"
        onChange={onContextHandler}
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
