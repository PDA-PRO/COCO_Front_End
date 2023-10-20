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
import { useAppDispatch, useAppSelector } from "../../app/store";
import { HomeGraph } from "./HomeGraph";
import { DiffGraph } from "./DiffGraph";
import { useMediaQuery } from "react-responsive";
import { Loader } from "../Loader/Loader";
import { API } from "api/config";

export const Home = () => {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.loginState);

  const navigate = useNavigate();
  const goDetail = (e) => {
    navigate(`/mypage/${e}`);
  };

  const Large = useMediaQuery({ minWidth: 1200 });
  const Laptop = useMediaQuery({ maxWidth: 1199.99999, minWidth: 992 });
  const Tablet = useMediaQuery({ maxWidth: 991.99999, minWidth: 768 });
  const Phone = useMediaQuery({ maxWidth: 767.99999 });
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
          {userInfo.id === undefined || userInfo.id === "" ? (
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
                  resource={fetchData(API.MYSTATUS + userInfo.id, {
                    headers: {
                      Authorization: "Bearer " + userInfo.access_token,
                    },
                  })}
                />
              </Suspense>
            </div>
          )}

          <Suspense fallback={<Loader />}>
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
