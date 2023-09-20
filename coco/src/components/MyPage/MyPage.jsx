import React, { Suspense } from "react";
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

export const MyPage = () => {
  const userInfo = useAppSelector((state) => state.loginState);
  const path = window.location.pathname.split("/");

  var me = userInfo.id;
  var now = path.at(-1);

  return (
    <>
      <Header />
      <div className="myPage">
        <div className="myPageBody">
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
          <Suspense fallback={<Spinner />}>
            <GetFirst
              resource={fetchData(API.ONE + path.at(-1), {
                headers: {
                  Authorization: "Bearer " + userInfo.access_token,
                },
              })}
            />
          </Suspense>
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
          <Suspense fallback={<Spinner />}>
            <GetSecond
              resource={fetchData(API.TWO + path.at(-1), {
                headers: {
                  Authorization: "Bearer " + userInfo.access_token,
                },
              })}
            />
          </Suspense>
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
              <Suspense fallback={<Spinner />}>
                <GetThird
                  resource={fetchData(API.THREE + path.at(-1), {
                    headers: {
                      Authorization: "Bearer " + userInfo.access_token,
                    },
                  })}
                  userinfo={userInfo}
                />
              </Suspense>
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
              <Suspense fallback={<Spinner />}>
                <GetMyTasks
                  resource={fetchData(API.MYTASK + path.at(-1), {
                    headers: {
                      Authorization: "Bearer " + userInfo.access_token,
                    },
                  })}
                />
              </Suspense>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

const GetFirst = ({ resource }) => {
  const res = resource.read();
  return <>{<FirstBox props={res[0]} key={res.id} />}</>;
};

const GetSecond = ({ resource }) => {
  const res = resource.read();
  return <>{<SecondBox props={res} key={res.id} />}</>;
};

const GetThird = ({ resource, userinfo }) => {
  const res = resource.read();
  return <>{<ThirdBox props={res} key={res.id} userinfo={userinfo} />}</>;
};

const GetMyTasks = ({ resource }) => {
  const res = resource.read();
  return <>{<MyTasks props={res} key={res.id} />}</>;
};
