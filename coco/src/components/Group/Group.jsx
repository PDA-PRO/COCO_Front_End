import React from "react";
import "./Group.css";
import { Header } from "../Home/Header";
import { Footer } from "../Home/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { GoSearch } from "react-icons/go";
import { GroupBox } from "./GroupBox";
import { Pagination } from "@mui/material";
import { useState } from "react";
import { Suspense } from "react";
import Spinner from "react-bootstrap/esm/Spinner";
import fetchData from "../../api/fetchTask";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { AllGroupBox } from "./AllGroupBox";
import { TbCrown } from "react-icons/tb";
import { API } from "api/config";
import { IoSchoolOutline } from "react-icons/io5";
import { Tutor } from "./Tutor/Tutor";
import { HiArrowUturnLeft } from "react-icons/hi2";

export const Group = () => {
  const navigate = useNavigate();
  const userInfo = useAppSelector((state) => state.loginState);

  const [tutor, setTutor] = useState(0);

  console.log(userInfo);

  const reload = () => {
    navigate(0);
  };

  const movePage = () => {
    navigate("/makeroom");
  };

  return (
    <>
      <Header />
      <div className="group">
        <div className="group-Body">
          <div className="groupTop">
            <div className="groupLogo">
              <img
                src="/image/sm.png"
                height="80px"
                alt=""
                onClick={() => reload()}
                style={{ cursor: "pointer" }}
              />
              <h4 onClick={() => reload()} style={{ cursor: "pointer" }}>
                COCO STUDY ROOM
              </h4>
            </div>

            {/* 튜터 조건 맞으면 버튼 보여줘야됨 role === 1 이면 스터디 개설 0 이면 튜터 신청 */}
            {userInfo.role === 1 ? (
              <div
                className="makeGroup"
                onClick={() => {
                  movePage();
                }}
              >
                <AiOutlineUsergroupAdd size={30} />
                <h3>STUDY 개설</h3>
              </div>
            ) : (
              <>
                {tutor === 0 ? (
                  <div
                    className="makeGroup"
                    onClick={() => {
                      setTutor(1);
                    }}
                  >
                    <IoSchoolOutline size={30} />
                    <h3>튜터 신청</h3>
                  </div>
                ) : (
                  <div
                    className="makeGroup"
                    onClick={() => {
                      setTutor(0);
                    }}
                  >
                    <h3>돌아가기</h3>
                    <HiArrowUturnLeft size={25} />
                  </div>
                )}
              </>
            )}
          </div>

          {tutor === 0 ? (
            <div className="group-bottom">
              <div className="group-left">
                <div className="group-search">
                  <SearchBar />
                </div>

                <div className="allGroups">
                  <div className="l-top">
                    <p style={{ color: "red" }}>순위</p>
                    <p>스터디룸</p>
                    <p>멤버 수</p>
                    <p>
                      <TbCrown size={25} color="orange" />
                    </p>
                    <p>STUDY pt</p>
                  </div>

                  <Suspense fallback={<Spinner />}>
                    <GetGroups resource={fetchData(API.ROOM)} />
                  </Suspense>
                </div>
              </div>

              {/* 왼족 : 전체 그룹, 오른쪽 : 내 그룹*/}

              <div className="group-right">
                <div className="r-top">
                  <h2>My Study</h2>
                </div>

                <div className="myGroups">
                  <div className="myGroupsTop">
                    <p>순위</p>
                    <p>스터디룸</p>
                    <p>멤버 수</p>
                    <p>
                      <TbCrown size={25} color="orange" />
                    </p>
                    <p>STUDY pt</p>
                  </div>

                  {userInfo.id === "" ? (
                    <p style={{ textAlign: "center", padding: "10px 0" }}>
                      로그인 필요 서비스입니다.
                    </p>
                  ) : (
                    <Suspense fallback={<Spinner />}>
                      <GetMyGroups
                        resource={fetchData(API.ROOMMYROOM + userInfo.id)}
                      />
                    </Suspense>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <Tutor />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

const SearchBar = ({ search }) => {
  const onSearchHandler = (e) => {
    var info = document.getElementById("SV").value;
    search(info);
  };

  return (
    <div className="searchBar">
      <input type="text" placeholder="스터디룸 이름 검색" id="SV" />
      <GoSearch
        size={23}
        color="rgb(98, 148, 255)"
        id="goSearch"
        onClick={() => onSearchHandler()}
      />
    </div>
  );
};

const GetGroups = ({ resource }) => {
  const GroupList = resource.read();
  const maxPage = Math.ceil(GroupList.length / 6);
  const [page, setPage] = useState(1);
  const handlePage = (event) => {
    if (
      event.target.innerHTML ===
      '<path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>'
    ) {
      setPage(page - 1);
    } else if (
      event.target.innerHTML ===
      '<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>'
    ) {
      setPage(page + 1);
    } else {
      setPage(parseInt(event.target.outerText));
    }
  };

  return (
    <>
      {GroupList.slice(5 * (page - 1), 5 * (page - 1) + 5).map((e) => {
        return <AllGroupBox info={e} key={e.id} />;
      })}
      <div className="leftBottom" style={{ marginTop: "20px" }}>
        <Pagination
          count={maxPage}
          variant="outlined"
          shape="rounded"
          defaultPage={1}
          onChange={(e) => handlePage(e)}
        />
      </div>
    </>
  );
};

const GetMyGroups = ({ resource }) => {
  const GroupList = resource.read();
  const maxPage = Math.ceil(GroupList.length / 10);
  const [page, setPage] = useState(1);
  const handlePage = (event) => {
    if (
      event.target.innerHTML ===
      '<path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>'
    ) {
      setPage(page - 1);
    } else if (
      event.target.innerHTML ===
      '<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>'
    ) {
      setPage(page + 1);
    } else {
      setPage(parseInt(event.target.outerText));
    }
  };

  return (
    <>
      {GroupList.slice(10 * (page - 1), 10 * (page - 1) + 10).map((e) => {
        return <GroupBox info={e} key={e.id} />;
      })}
      <div className="leftBottom" style={{ marginTop: "20px" }}>
        <Pagination
          count={maxPage}
          variant="outlined"
          shape="rounded"
          defaultPage={1}
          onChange={(e) => handlePage(e)}
        />
      </div>
    </>
  );
};
