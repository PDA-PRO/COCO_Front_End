import React, { Suspense, useState } from "react";
import "./Home.css";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useNavigate } from "react-router-dom";
import { SlPin } from "react-icons/sl";
import { Block } from "./Block";
import Spinner from "react-bootstrap/esm/Spinner";
import fetchData from "../../api/fetchTask";
import { useAppSelector } from "../../app/store";
import { HomeGraph } from "./HomeGraph";
import { DiffGraph } from "./DiffGraph";
import { useMediaQuery } from "react-responsive";
import { Loader } from "../Loader/Loader";
import { API } from "api/config";

export const Home = () => {
  const userInfo = useAppSelector((state) => state.loginState);

  const navigate = useNavigate();
  const goDetail = (e) => {
    navigate(`/mypage/${e}`);
  };

  const Large = useMediaQuery({ minWidth: 1200 });
  const path = window.location.pathname.split("/");

  return (
    <div>
      <Header />
      <div className="home">
        <div className="home-body">
          <div className="txt-box">
            <h2 id="t1">코딩, 초보자라면?</h2>
            <h2 id="t2">
              Coding Coach,
              <span id="t2-1">
                {" "}
                C<span style={{ color: "black" }}>O</span>C
                <span style={{ color: "black" }}>O</span>
              </span>
            </h2>
          </div>

          {/* 기능 차별점 - AI 얘기 */}
          <CocoShow />

          {userInfo.id === "" ? (
            <></>
          ) : (
            <div className={Large ? "homeGraph" : "else"}>
              <div className="levelGraph" onClick={() => goDetail(userInfo.id)}>
                <h3>{userInfo.id}님 현재 레벨</h3>
                <Suspense fallback={<Spinner />}>
                  <MyLevel
                    resource={fetchData(API.LEVEL, {
                      params: { user_id: userInfo.id },
                    })}
                  />
                </Suspense>
              </div>

              <Suspense fallback={<Spinner />}>
                <MyGraph
                  resource={fetchData(API.MYSTATUS, {
                    urlParams: {
                      user_id: userInfo.id,
                    },
                  })}
                />
              </Suspense>
            </div>
          )}
          <Suspense fallback={<Loader />}>
            <GetHot resource={fetchData(API.HOT)} />
          </Suspense>
          <div className="ad-box">
            <img
              src="/image/ad.png"
              alt=""
              loading="lazy"
              style={{ borderRadius: "20px" }}
              width="100%"
            />
          </div>
          <div className="notice">
            <Suspense fallback={<Loader />}>
              <GetNotice resource={fetchData(API.NOTICE)} />
            </Suspense>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const CocoShow = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="whatdiff">
      <h4>
        당신의 코딩 실력 향상을 위해,{" "}
        <span style={{ color: "#00ff00" }}>C</span>O
        <span style={{ color: "#00ff00" }}>C</span>O가 준비했습니다.
      </h4>
      <div className="aiShow">
        <div className="Box" id="WPCbox">
          <p>혼자 어디가 틀렸는지 고민하지 않게, AI가 필요하면 바로</p>
          <img src="./image/wpc.png" alt="wpc" width="70%" />
          <p style={{ textAlign: "end", color: "gray" }}>
            WPC(Wrong Part of Code) AI 코칭 시스템
          </p>
        </div>

        <div className="Box" id="QA">
          <p>모르는게 생겼다면, 주저없이 질문할 수 있게</p>
          {/* <img src="./image/findCode.png" alt="hi" /> */}
          <p>AI Q&A 시스템</p>
        </div>

        <div className="Box" id="review">
          <p>내가 만든 코드에 개선점은 없을까?</p>
          <p>AI를 통한 개선점 확인 시스템</p>
        </div>

        <div className="Box" id="otherCode">
          <p>문제를 해결하는 다른 방법까지 한 번에</p>
          <p>AI를 통한 다른 로직 & 유사 로직 코드 확인 시스템</p>
        </div>

        <div className="Box" id="genAI">
          <p>AI가 만든 문제는 어떨까</p>
          <p>생성형 AI가 만든 문제를 해결하기</p>
        </div>

        {open === true ? (
          <div className="hiddenBoxes">
            <div className="Box" id="graphBanner">
              <p>내 성장 수준을 한눈에 확인할 수 있을까</p>
              <p>그래프와 레벨을 비롯한 수치들을 통해 직관적으로 확인</p>
            </div>

            <div className="Box" id="srBanner">
              <p>지속적인 코칭이 필요할 땐</p>
              <p>튜터-튜티로 이루어진 스터디룸에서 어렵지 않게</p>
            </div>
          </div>
        ) : (
          <></>
        )}

        <div className="moreBtn">
          <p onClick={() => setOpen(!open)}>{open ? "CLOSE" : "MORE"}</p>
        </div>
      </div>
    </div>
  );
};

const GetHot = ({ resource }) => {
  const hot = resource.read();
  return <>{<Block info={hot} key={hot.id} />}</>;
};

const GetNotice = ({ resource }) => {
  const notice = resource.read();
  return (
    <div className="noticeHere">
      <div className="title-notice">
        <SlPin size={22} color="red" />
        <h2>공지사항</h2>
      </div>
      <div
        className="body-notice"
        dangerouslySetInnerHTML={{ __html: notice }}
      ></div>
    </div>
  );
};

const MyGraph = ({ resource }) => {
  const detail = resource.read();
  return (
    <>
      <HomeGraph growth={detail.growth} />
      <DiffGraph diff={detail.diff} />
    </>
  );
};

const MyLevel = ({ resource }) => {
  const data = resource.read();
  return (
    <>
      <h2>Level {data.level}</h2>
      <p>전체 {data.rank}등</p>
    </>
  );
};
