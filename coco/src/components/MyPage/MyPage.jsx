import React, { Suspense, useEffect, useState } from "react";
import { Header } from "../Home/Header";
import { Footer } from "../Home/Footer";
import "./MyPage.css";
import fetchData from "../../api/fetchTask";
import { SecondBox } from "./SecondBox";
import { IoInformationCircleOutline } from "react-icons/io5";
import { BsGraphUp } from "react-icons/bs";
import { ThirdBox } from "./ThirdBox";
import { FirstBox } from "./FirstBox";
import { MyTasks } from "./MyTasks";
import Spinner from "react-bootstrap/Spinner";
import { useAppSelector } from "../../app/store";
import { GiBlackBook, GiNotebook } from "react-icons/gi";
import { API } from "api/config";
import { Notfound } from "../Notfound.jsx";

export const MyPage = () => {
  const userInfo = useAppSelector((state) => state.loginState);
  const path = decodeURI(window.location.pathname).split("/");
  const me = userInfo.id;
  const now = path.at(-1);
  return (
    <>
      <Header />
      <div className="myPage">
        <div className="myPageBody">
          <Suspense fallback={<Spinner />}>
            {me === now ? (
              <GetFirst
                resource={fetchData(API.MYPAGE + "1/" + path.at(-1), {
                  headers: {
                    Authorization: "Bearer " + userInfo.access_token,
                  },
                })}
                me={userInfo.id}
                now={path.at(-1)}
              />
            ) : (
              <GetFirst
                resource={fetchData(API.MYPAGE + "2/" + path.at(-1), {
                  headers: {
                    Authorization: "Bearer " + userInfo.access_token,
                  },
                })}
                me={userInfo.id}
                now={path.at(-1)}
              />
            )}
          </Suspense>
        </div>
      </div>
      <Footer />
    </>
  );
};

const GetFirst = ({ resource, me, now }) => {
  const res = resource.read();
  console.log(res);
  const userInfo = useAppSelector((state) => state.loginState);

  if (res == undefined) {
    return (
      <div style={{ width: "100%" }}>
        <Notfound />
      </div>
    );
  }

  const user = res.user_info;
  const sub = res.sub_result;
  const level = res.level;
  const board = res.board;
  const task = res.task;

  return (
    <>
      <h2>
        <span>
          <IoInformationCircleOutline
            size={30}
            color="green"
            style={{ paddingBottom: "3px", marginRight: "8px" }}
          />
        </span>
        회원 정보
      </h2>
      <FirstBox props={user} level={level} key={now + 1} />
      <h2>
        <span>
          <BsGraphUp
            size={27}
            color="green"
            style={{ paddingBottom: "3px", marginRight: "13px" }}
          />
        </span>
        {me === now ? "내 역량" : `${now}님 역량`}
      </h2>
      <SecondBox props={sub} key={now + 2} />

      {me === now ? (
        <>
          <h2>
            <span>
              <GiNotebook
                size={29}
                color="green"
                style={{ paddingBottom: "3px", marginRight: "13px" }}
              />
            </span>
            내 게시글
          </h2>
          <ThirdBox
            props={board}
            key={userInfo.id + "Board"}
            userinfo={userInfo}
          />
          <h2>
            <span>
              <GiBlackBook
                size={29}
                color="green"
                style={{ paddingBottom: "3px", marginRight: "13px" }}
              />
            </span>
            내 문제집
          </h2>
          <MyTasks props={task} key={userInfo.id + "Task"} />
        </>
      ) : (
        <></>
      )}
    </>
  );
};
