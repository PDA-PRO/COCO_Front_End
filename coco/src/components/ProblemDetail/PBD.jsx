import React, { Suspense } from "react";
import "./PBD.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { FaStar } from "react-icons/fa";
import styled from "styled-components";
import { IoLogoPython } from "react-icons/io5";
import {
  BsClipboardCheck,
  BsArrowDownRight,
  BsArrowUpLeft,
  BsQuestionLg,
  BsExclamationLg,
} from "react-icons/bs";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { Header } from "../Home/Header";
import { Footer } from "../Home/Footer";
import { useState } from "react";
import { Result } from "../Result/Result";
import fetchData from "../../api/fetchTask";
import axios from "axios";

export const PBD = () => {
  var path = window.location.pathname;
  path = path.split("/");
  // const resource = fetchData(`http://127.0.0.1:8000/problems/${path.at(-1)}`);
  return (
    <>
      <Header />
      <Suspense fallback={<>문제가 존재하지 않습니다</>}>
        <GetDetail
          resource={fetchData(`http://127.0.0.1:8000/problems/${path.at(-1)}/`)}
        />
      </Suspense>
      <Footer />
    </>
  );
};

const GetDetail = ({ resource }) => {
  const detail = resource.read(); //api fetch 결과
  const navigate = useNavigate();
  const [code, setCode] = useState(""); //작성한 코드

  //코드 입력
  const onCodeHandler = (e) => {
    setCode(e.currentTarget.value);
  };

  //submit이후 결과창 이동
  const goToResult = (e) => {
    console.log(code);
    navigate(`/result/${detail.id}/`, { state: { code: code } });
    // window.location.href = `/result/${e}/`;
  };

  //코드 submit
  const submitCode = () => {
    Promise.resolve()
      .then(
       
      )
      .then(() => {
        goToResult(detail.id);
      });
  };

  return (
    <div className="PBD">
      <div className="PBD-title">
        <div className="problemsName-pbd">
          <div>No.{detail.id}</div>
          <div>{detail.title}</div>
        </div>
        <div className="problemsRate-pbd">{Rating(detail.diff)}</div>
        <div className="problemsAns-pbd">{detail.rate}</div>
      </div>

      <div className="PBD-body">
        <div className="PBD-problem">
          <div className="PBD-pbTxt">
            <div className="PBD-pbTitle">
              <BsClipboardCheck size={30} />
              <h2>문제 설명</h2>
            </div>

            <p id="PBD-txt">
              {/* 정수 2개를 입력받아 합을 출력해보자.
              <br />
              단, 입력되는 정수는 -2147483648 ~ +2147483648 이다. */}
              {detail.mainDesc}
            </p>
          </div>

          <div className="PBD-exBox">
            <div className="PBD-exInput">
              <div className="PBD-pbTitle">
                <BsArrowDownRight size={30} color="red" />
                <h2>Input</h2>
              </div>

              <p className="PBD-txt2">{detail.inDesc}</p>

              <div className="PBD-pbTitle">
                <BsQuestionLg size={30} color="red" />
                <h2>입력 예시</h2>
              </div>

              <p className="PBD-txt2">{detail.inputEx1}</p>
            </div>

            <div className="PBD-exOutput">
              <div className="PBD-pbTitle">
                <BsArrowUpLeft size={30} color="#00ff00" />
                <h2>Output</h2>
              </div>

              <p className="PBD-txt2">{detail.outDesc}</p>

              <div className="PBD-pbTitle">
                <BsExclamationLg size={30} color="#00ff00" />
                <h2>출력 예시</h2>
              </div>

              <p className="PBD-txt2">{detail.outputEx1}</p>
            </div>
          </div>
        </div>

        <div className="PBD-input">
          <div className="PBD-pbTitle">
            <IoLogoPython size={30} color="skyblue" />
            <h2>코드 입력 : Python3</h2>
          </div>

          <InputGroup>
            <InputGroup.Text>CODE</InputGroup.Text>
            <Form.Control
              as="textarea"
              aria-label="With textarea"
              style={{ minHeight: "700px" }}
              onChange={onCodeHandler}
            />
          </InputGroup>

          <Button
            variant="outline-secondary"
            id="submit_btn"
            onClick={submitCode}
          >
            SUBMIT
          </Button>
        </div>
      </div>
    </div>
  );
};

const ARRAY = [0, 1, 2, 3, 4];

function Rating(n) {
  const colored = [false, false, false, false, false];
  for (let i = 0; i < n; i++) {
    colored[i] = true;
  }

  return (
    <Wrap>
      <Stars>
        {ARRAY.map((el, idx) => {
          return (
            <FaStar
              key={idx}
              size="40"
              className={colored[el] && "yellowStar"}
            />
          );
        })}
      </Stars>
    </Wrap>
  );
}

export default Rating;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 15px;
`;

const Stars = styled.div`
  display: flex;
  padding-top: 5px;

  & svg {
    color: gray;
    margin: 0 10px;
  }

  .yellowStar {
    color: #fcc419;
  }
`;
