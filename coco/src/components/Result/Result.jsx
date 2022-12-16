import React, { Suspense } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Footer } from "../Home/Footer";
import { Header } from "../Home/Header";
import { IoLogoPython } from "react-icons/io5";
import "./Result.css";
import { RiEmotionLaughLine, RiEmotionSadLine } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import styled from "styled-components";
import fetchData from "../../api/fetchTask";
import Spinner from "react-bootstrap/Spinner";

export const Result = (code) => {
  const { id } = useParams();
  const locate = useLocation();

  const num = parseInt(id);

  return (
    <>
      <Header />
      <Suspense fallback={<Spinner />}>
        <ResultBox
          resource={fetchData(`http://127.0.0.1:8000/result/${num}`)}
          info={locate.state.info}
        />
      </Suspense>
      <Footer />
    </>
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
              size="23"
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
  // padding-top: 15px;
`;

const Stars = styled.div`
  display: flex;
  // padding-top: 5px;

  & svg {
    color: gray;
    margin: 0 5px;
  }

  .yellowStar {
    color: #fcc419;
  }
`;

const ResultBox = ({ resource, info }) => {
  const whatResult = (e) => {
    if (e === 3) {
      return <RiEmotionLaughLine size={40} color="#6666ff" />;
    } else {
      return <RiEmotionSadLine size={40} color="red" />;
    }
  };
  const problemList = resource.read();
  console.log(problemList);
  console.log(info);
  return (
    <div className="Res">
      <div className="PBD-title">
        <div className="problemsName-pbd">
          <div>{info.sub_id}</div>
          <div>{info.title}</div>
        </div>
        <div className="problemsRate-pbd">{Rating(2)}</div>
        <div className="problemsAns-pbd">54.6%</div>
      </div>
      <div className="Res-Body">
        <div className="Res-yourCode">
          <div className="Res-pbTitle">
            <IoLogoPython size={40} color="skyblue" />
            <h2>제출 코드</h2>
          </div>
          <div className="Res-code">
            <p id="R-Code">{problemList[2]}</p>
          </div>
        </div>

        <div className="Res-others">
          <div className="Res-pbTitle">
            {/* <IoLogoPython size={30} color="skyblue" /> */}
            <img src="/image/logo.png" alt="" height="40px" />
            <h2>채점 결과 :</h2>
            {whatResult(problemList[12])}
          </div>
          <div className="Res-code">
            <p id="R-Code">{problemList[9]}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
