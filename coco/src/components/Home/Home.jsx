import React, { Suspense } from "react";
import "./Home.css";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useNavigate } from "react-router-dom";
import { SlPin } from "react-icons/sl";
import { Block } from "./Block";
import Spinner from "react-bootstrap/esm/Spinner";
import fetchData from "../../api/fetchTask";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftjsToHtml from "draftjs-to-html";
import { useAppDispatch, useAppSelector } from "../../app/store";

export const Home = () => {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.loginState);
  const navigate = useNavigate();
  const goDetail = (e) => {
    navigate(`/mypage/${e}`);
  };

  return (
    <div>
      <Header />
      <div className="home">
        <div className="home-body" style={{ width: "1200px" }}>
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
          {userInfo.id === "" ? (
            <></>
          ) : (
            <div className="homeGraph">
              <div className="levelGraph" onClick={() => goDetail(userInfo.id)}>
                <h3>{userInfo.id}님 현재 레벨</h3>
                <h2>Level 4</h2>
                <p>전체 50등</p>
              </div>
              <div className="growGraph"></div>
            </div>
          )}

          <Suspense fallback={<Spinner />}>
            <GetHot resource={fetchData("http://127.0.0.1:8000/hot")} />
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
            <Suspense fallback={<Spinner />}>
              <GetNotice
                resource={fetchData("http://127.0.0.1:8000/manage/notice")}
              />
            </Suspense>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const GetHot = ({ resource }) => {
  const HOT = resource.read();
  return <>{<Block info={HOT} key={HOT.id} />}</>;
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

//how to center a div?
<div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  }}
>
  <h1> I am centered </h1>
</div>;

//Source: https://stackoverflow.com/questions/42125775
