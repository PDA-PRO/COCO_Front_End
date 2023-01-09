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
import { useAppSelector } from "../../app/store";

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
  const userInfo = useAppSelector((state) => state.loginState);

  //코드 입력
  const onCodeHandler = (e) => {
    setCode(e.currentTarget.value);
  };

  //submit이후 결과창 이동
  const goToResult = (e) => {
    console.log(e);
    navigate(`/status?user_id=${userInfo.id}`, {
      state: { user_id: userInfo.id },
    });
  };

  //코드 submit
  const submitCode = () => {
    Promise.resolve().then(
      axios
        .post(
          "http://127.0.0.1:8000/submission",
          {
            taskid: detail.id,
            userid: userInfo.id,
            sourcecode: code,
            callbackurl: "string",
          },
          {
            headers: { Authorization: "Bearer " + userInfo.access_token },
          }
        )
        .then(function (response) {
          alert(`${userInfo.id}님 ${detail.id} 제출완료`);
          goToResult(userInfo.id, { state: { userid: userInfo.id } });
        })
        .catch(() => {
          alert("인증실패");
        })
    );
  };

  return (
    <div className="PBD">
      <div className="PBD-title">
        <div className="problemsName-pbd">
          <div>No.{detail.id}</div>
          <div>{detail.title}</div>
        </div>
        <div className="problemsRate-pbd">{Rating(detail.diff)}</div>
        <div
          className="problemsAns-pbd"
          style={{
            color:
              detail.rate == 0
                ? "gray"
                : detail.rate >= 40
                ? "skyblue"
                : "rgb(218, 55, 55)",
          }}
        >
          <span style={{ color: "gray" }} id="jung">
            정답률 :{" "}
          </span>
          {detail.rate}%
        </div>
      </div>

      <div className="PBD-secTitle">
        <div className="PBD-timeLimit">시간제한 : {detail.timeLimit}sec</div>
        <div className="PBD-memLimit">메모리 제한 : {detail.memLimit}mbyte</div>
      </div>

      <div className="PBD-body">
        <div className="PBD-problem">
          <div className="PBD-pbTxt">
            <div className="PBD-pbTitle">
              <BsClipboardCheck size={30} />
              <h2>문제 설명</h2>
            </div>

            <p id="PBD-txt">{detail.mainDesc}</p>
          </div>

          <div className="PBD-exBox">
            <div className="PBD-exInput">
              <div className="PBD-pbTitle">
                <BsArrowDownRight size={30} color="red" />
                <h2 className="ttun">Input</h2>
              </div>

              <p className="PBD-txt2">{detail.inDesc}</p>

              <div className="PBD-pbTitle">
                <BsQuestionLg size={30} color="red" />
                <h2 className="ttun">입력 예시</h2>
              </div>

              <p className="PBD-txt2">{detail.inputEx1}</p>
            </div>

            <div className="PBD-exOutput">
              <div className="PBD-pbTitle">
                <BsArrowUpLeft size={30} color="#00ff00" />
                <h2 className="ttun">Output</h2>
              </div>

              <p className="PBD-txt2">{detail.outDesc}</p>

              <div className="PBD-pbTitle">
                <BsExclamationLg size={30} color="#00ff00" />
                <h2 className="ttun">출력 예시</h2>
              </div>

              <p className="PBD-txt2">{detail.outputEx1}</p>
            </div>
          </div>
        </div>

        <div className="PBD-input">
          <div className="PBD-pbTitle">
            <IoLogoPython size={30} color="skyblue" />
            <h2 className="ttun">코드 입력 : Python3</h2>
          </div>

          <InputGroup>
            <InputGroup.Text className="ttun2">CODE</InputGroup.Text>
            <Form.Control
              as="textarea"
              id="PBD-codeArea"
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
              size="30"
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
`;

const Stars = styled.div`
  display: flex;
  padding-top: 5px;

  & svg {
    color: gray;
    margin: 0 6px;
  }

  .yellowStar {
    color: #fcc419;
  }
`;
