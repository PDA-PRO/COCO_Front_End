import React, { Suspense, useState } from "react";
import "./Inside.css";
import { Header } from "../../Home/Header";
import { Footer } from "../../Home/Footer";
import { useAppSelector } from "../../../app/store";
import { BsTrash, BsPencil } from "react-icons/bs";
import { MdConstruction } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import fetchData from "../../../api/fetchTask";
import { Loader } from "../../Loader/Loader";
import { ProblemBox } from "../../Problems/ProblemBox";
import Pagination from "@mui/material/Pagination";
import { useMediaQuery } from "react-responsive";

export const Inside = () => {
  const path = window.location.pathname.split("/");

  return (
    <>
      <Header />
      <div className="inside">
        <div className="inside-body">
          <Suspense fallback={<Loader />}>
            <Content
              resource={fetchData(
                `http://127.0.0.1:8000/room/roadmap/${path.at(-2)}/${path.at(
                  -1
                )}`
              )}
            />
          </Suspense>
        </div>
      </div>
      <Footer />
    </>
  );
};

const Content = ({ resource }) => {
  const userInfo = useAppSelector((state) => state.loginState);
  const userID = userInfo.id;
  const [page, setPage] = useState(1);

  const data = resource.read();

  const navigate = useNavigate();

  const goMypage = (e) => {
    navigate(`/mypage/${e}`);
  };

  const Phone = useMediaQuery({ maxWidth: 810 });

  var date = data.roadmap.last_modify;
  var slicedDate = date.substring(0, 10);

  var members = data.solved_list;
  var ids = Object.keys(members);

  const check = (e) => {
    var mySolved = data.problem_list.filter((problem) =>
      data.solved_list[`${e}`].includes(problem.id)
    );
    return mySolved.length;
  };

  const checkRate = (e) => {
    var num = check(e);
    let res = ((num / data.problem_list.length) * 100).toFixed(1);
    return res;
  };

  const compare = (e) => {
    var idx = data.solved_list[`${userID}`].findIndex(
      (problem) => problem === e
    );
    return idx !== -1 ? 1 : 0;
  };

  return (
    <>
      <div className="top">
        <h4>{data.roadmap.name}</h4>
        <p>마지막 업데이트 : {slicedDate}</p>
      </div>
      <hr />
      <div className="mid">
        <p>{data.roadmap.desc}</p>
        <div className="taskRating">
          <p>
            총 문제 수 : <b>{data.problem_list.length}</b>
          </p>
          <p>
            내가 해결한 문제 수 : <b>{check(userID)}</b>
          </p>
          <p>
            학습 달성률 :{" "}
            <span
              style={
                checkRate(userID) >= 50.0
                  ? { color: "#1876FB" }
                  : { color: "#FF0044" }
              }
            >
              <b>{checkRate(userID)}%</b>
            </span>{" "}
          </p>
        </div>
      </div>
      {/* 왼쪽에 문제 오른쪽에 유저리스트 */}
      <div className="grid-body">
        <div className="insideTasks">
          <div className="taskHead">
            <p>No</p>
            <p>Title</p>
            <p>난이도</p>
            <p>정답률</p>
            <p>Solve</p>
          </div>
          {data.problem_list.map((e) => {
            return <ProblemBox info={e} type={3} check={compare(e.id)} />;
          })}
          <div className="leftBottom">
            <Pagination
              count={Math.ceil(data.problem_list.length / 10)}
              variant="outlined"
              shape="rounded"
              defaultPage={1}
              page={page}
              onChange={(e, value) => setPage(value)}
            />
          </div>
        </div>
        <div className="insideUsers">
          <div className="userHead">
            <p>Name</p>

            <p>{Phone ? "달성률" : "학습 달성률"}</p>
          </div>
          {ids.map((e) => {
            return (
              <div key={e} className="user" onClick={() => goMypage(e)}>
                <p>{e}</p>
                <p>{checkRate(e)}%</p>
              </div>
            );
          })}

          {/* 여기는 그룹장만 가능하게 */}
          {data.roadmap.leader === userID ? (
            <>
              <div className="fixRoadmap" style={{ marginTop: "3em" }}>
                <p>로드맵 수정</p>
                <MdConstruction size={20} />
              </div>
              <div className="deleteRoadmap" style={{ marginTop: "1.5em" }}>
                <p>로드맵 삭제</p>
                <BsTrash size={20} />
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};
