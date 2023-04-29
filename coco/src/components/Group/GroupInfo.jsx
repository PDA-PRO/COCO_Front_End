import React from "react";
import "./GroupInfo.css";
import { Header } from "../Home/Header";
import { Footer } from "../Home/Footer";
import { Suspense } from "react";
import Spinner from "react-bootstrap/esm/Spinner";
import fetchData from "../../api/fetchTask";
import { Pagination } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { TbCrown } from "react-icons/tb";

export const GroupInfo = () => {
  var path = window.location.pathname;
  path = path.split("/");

  return (
    <>
      <Header />
      <div className="groupInfo">
        <div className="gi">
          <Suspense fallback={<Spinner />}>
            <GiHeader
              resource={fetchData(
                `http://127.0.0.1:8000/group/${path.at(-1)}/`
              )}
            />
          </Suspense>

          <div id="gi-B">
            <div className="gi-GB">
              <Suspense fallback={<Spinner />}>
                <GroupBoard
                  resource={fetchData(
                    `http://127.0.0.1:8000/group/board/${path.at(-1)}/`
                  )}
                />
              </Suspense>
            </div>
            <div className="gi-ML">
              <Suspense fallback={<Spinner />}>
                <MemberList
                  resource={fetchData(
                    `http://127.0.0.1:8000/group/${path.at(-1)}/`
                  )}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

const GiHeader = ({ resource }) => {
  const info = resource.read();
  return (
    <div className="gi-head">
      <div className="headOne">
        <div>
          <img src="\image\group.png" height="73px" />
          <h2>{info.name}</h2>
        </div>

        <div>
          <p>전체 그룹 랭킹 : 3위</p>
          <p>현재 그룹원 수 : {info.members.length}명</p>
          <p>그룹 장 : {info.leader}님</p>
        </div>
      </div>
      <div className="headTwo">
        <p>{info.desc}</p>
      </div>
    </div>
  );
};

const MemberList = ({ resource }) => {
  const info = resource.read();
  const members = info.members;
  members.sort(function (a, b) {
    return b[1] - a[1];
  });
  const maxPage = Math.ceil(members.length / 10);
  const [page, setPage] = useState(1);
  const leader = info.leader;
  return (
    <div className="member-list">
      <h3>Group Members</h3>
      <div className="member-list-header">
        <p> </p>
        <p>ID</p>
        <p>Score</p>
      </div>
      {members.slice(10 * (page - 1), 10 * (page - 1) + 10).map((e) => {
        return <Member info={e} key={e.id} props={leader} />;
      })}
    </div>
  );
};

const Member = ({ info, props }) => {
  const navigate = useNavigate();

  const GoInfo = (e) => {
    // 누른 멤버의 마이페이지로 이동
    navigate(`/group/${e}`);
  };

  return (
    <div className="oneMember">
      <p>{info[0] === props ? <TbCrown size={25} color="orange" /> : ""}</p>
      <p>{info[0]}</p>
      <p>{info[1]}</p>
    </div>
  );
};

const GroupBoard = ({ resource }) => {
  const info = resource.read();
};
