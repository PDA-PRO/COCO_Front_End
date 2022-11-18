import React from "react";
import { useNavigate, useParams, useLocation  } from "react-router-dom";
import { Footer } from "../Home/Footer";
import { Header } from "../Home/Header";
import { IoLogoPython, IoClose, IoRadioButtonOffSharp } from "react-icons/io5";
import "./Result.css";
import { RiEmotionLaughLine, RiEmotionSadLine } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import styled from "styled-components";

export const Result = (code) => {
  const { id } = useParams();
  const location = useLocation();

  const num = parseInt(id);

  console.log(location.state.code);
  const navigate = useNavigate();
  const whatResult = (e) => {
    if (e === 1) {
      return <RiEmotionLaughLine size={40} color="#6666ff" />;
    } else {
      return <RiEmotionSadLine size={40} color="red" />;
    }
  };
  return (
    <>
      <Header />
      <div className="Res">
        <div className="PBD-title">
          <div className="problemsName-pbd">
            <div>No.{num}</div>
            <div>더하기 문제</div>
          </div>
          <div className="problemsRate-pbd">{Rating(2)}</div>
          <div className="problemsAns-pbd">54.6%</div>
        </div>
        <div className="Res-Body">
          <div className="Res-yourCode">
            <div className="Res-pbTitle">
              <IoLogoPython size={40} color="skyblue" />
              <h2>My Code</h2>
            </div>
            <div className="Res-code">
              <p id="R-Code">{location.state.code}</p>
            </div>
          </div>

          <div className="Res-others">
            <div className="Res-pbTitle">
              {/* <IoLogoPython size={30} color="skyblue" /> */}
              <img src="/image/logo.png" alt="" height="40px" />
              <h2>채점 결과 :</h2>
              {whatResult(1)}
            </div>

            <h3 id="Res-out" onClick={() => navigate("/problems")}>
              문제 목록으로..
            </h3>
          </div>
        </div>
      </div>

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
