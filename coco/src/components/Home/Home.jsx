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

export const Home = () => {
  return (
    <div className="home">
      <Header />
      <div className="homebody">
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
          <Suspense fallback={<Spinner />}>
            <GetHot resource={fetchData("http://127.0.0.1:8000/hot")} />
          </Suspense>

          <div className="ad-box">
            <img
              src="/image/ad.png"
              alt=""
              loading="lazy"
              style={{ borderRadius: "30px" }}
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
        <Footer />
      </div>
    </div>
  );
};

const GetHot = ({ resource }) => {
  const HOT = resource.read();
  console.log(HOT);
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
