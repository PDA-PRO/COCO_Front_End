import React, { Suspense } from "react";
import { Header } from "../Home/Header";
import { Footer } from "../Home/Footer";
import "./Problems.css";
import { ProblemBox } from "./ProblemBox";
import Spinner from "react-bootstrap/Spinner";
import fetchData from "../../api/fetchTask";
import { IoIosArrowDown } from "react-icons/io";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import Form from "react-bootstrap/Form";
import {
  TiBatteryCharge,
  TiBatteryLow,
  TiBatteryMid,
  TiBatteryHigh,
  TiBatteryFull,
} from "react-icons/ti";

export const Problems = () => {
  return (
    <div>
      <Header />
      <div className="problemsContainer">
        <div className="proTop">
          <img src="./image/co.png" height="80px" alt="" />
          <h4>COCO JUDGE</h4>
        </div>
        <div className="proBody">
          <div className="BodyLeft">
            <div className="leftTop">
              <h4>No</h4>
              <h4>Title</h4>
              <h4>Difficulty</h4>
              <h4>Rate</h4>
              <h4>Language</h4>
            </div>
            <Suspense fallback={<Spinner />}>
              <GetProblems
                resource={fetchData("http://127.0.0.1:8000/tasklist")}
              />
            </Suspense>
            <div className="leftBottom">
              <h4>페이지 네이션</h4>
            </div>
          </div>

          <div className="BodyRight">
            <div className="rightBox1">
              <h4>문제 보기</h4>
              <nav>
                <label for="touch">
                  <h3>
                    난이도
                    <span>
                      <IoIosArrowDown size={20} style={{ marginLeft: "5px" }} />
                    </span>
                  </h3>
                </label>
                <input type="checkbox" id="touch" />

                <div className="slide">
                  <div className="chose">
                    <Form.Check type="checkbox" />
                    <h5>Lv. 1</h5>
                    <TiBatteryLow size={35} color="rgb(98, 148, 255)" />
                  </div>
                  <div className="chose">
                    <Form.Check type="checkbox" />
                    <h5>Lv. 2</h5>
                    <TiBatteryMid size={35} color="#9DD84B" />
                  </div>
                  <div className="chose">
                    <Form.Check type="checkbox" />
                    <h5>Lv. 3</h5>
                    <TiBatteryHigh size={35} color="#ff7e00" />
                  </div>

                  <div className="chose">
                    <Form.Check type="checkbox" />
                    <h5>Lv. 4</h5>
                    <TiBatteryFull size={35} color="red" />
                  </div>

                  <div className="chose">
                    <Form.Check type="checkbox" />
                    <h5>Lv. 5</h5>
                    <TiBatteryCharge size={35} color="#7d1b7e" />
                  </div>

                  <p>초기화</p>
                </div>
              </nav>

              <nav>
                <label for="touch2">
                  <h3>
                    언어
                    <span>
                      <IoIosArrowDown size={20} style={{ marginLeft: "5px" }} />
                    </span>
                  </h3>
                </label>
                <input type="checkbox" id="touch2" />

                <div className="slide">
                  <div className="chose2">
                    <Form.Check type="checkbox" />
                    <h5>Python3</h5>
                    <img src="./image/python.png" height="30px" alt="" />
                  </div>
                  <div className="chose2">
                    <Form.Check type="checkbox" />
                    <h5>C</h5>
                    <img src="./image/lan_c2.png" height="30px" alt="" />
                  </div>

                  <p>초기화</p>
                </div>
              </nav>

              <nav>
                <label for="touch3">
                  <h3>
                    정답률
                    <span>
                      <IoIosArrowDown size={20} style={{ marginLeft: "5px" }} />
                    </span>
                  </h3>
                </label>
                <input type="checkbox" id="touch3" />

                <div className="slide">
                  <div className="chose3">
                    <Form.Check type="checkbox" name="group1" />
                    <h5>낮은 순</h5>
                    <BsArrowUpRight size={22} color="skyblue" />
                  </div>
                  <div className="chose3">
                    <Form.Check type="checkbox" name="group1" />
                    <h5>높은 순</h5>
                    <BsArrowDownRight size={22} color="red" />
                  </div>

                  <p>초기화</p>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// const resource = fetchData("http://127.0.0.1:8000/problems");

const GetProblems = ({ resource }) => {
  const problemList = resource.read();
  console.log(problemList);
  return (
    <>
      {problemList.map((e) => {
        return <ProblemBox info={e} key={e.id} />;
      })}
    </>
  );
};
