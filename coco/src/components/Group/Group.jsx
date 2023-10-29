import React from "react";
import "./Group.css";
import { Header } from "../Home/Header";
import { Footer } from "../Home/Footer";
import { useNavigate } from "react-router-dom";
import { GoSearch } from "react-icons/go";
import { GroupBox } from "./GroupBox";
import { Pagination } from "@mui/material";
import { useState } from "react";
import { Suspense } from "react";
import Spinner from "react-bootstrap/esm/Spinner";
import fetchData from "../../api/fetchTask";
import { useAppSelector, useAppDispatch } from "../../app/store";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { AllGroupBox } from "./AllGroupBox";
import { TbCrown } from "react-icons/tb";
import { API } from "api/config";
import { IoSchoolOutline } from "react-icons/io5";
import { Tutor } from "./Tutor/Tutor";
import { HiArrowUturnLeft } from "react-icons/hi2";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { checkToken } from "../../app/authentication";

export const Group = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.loginState);
  const [query, setQuery] = useState();
  const [tutor, setTutor] = useState(0);

  const reload = () => {
    navigate(0);
  };

  const movePage = () => {
    navigate("/makeroom");
  };
  if (!checkToken(userInfo.access_token)) {
    console.log("토큰 만료");
    dispatch({
      type: "loginSlice/logout",
    });
  }

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
            {userInfo.id === "" ? (
              <></>
            ) : userInfo.tutor === 1 ? (
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
            {/* 튜터 조건 맞으면 버튼 보여줘야됨 role === 1 이면 스터디 개설 0 이면 튜터 신청 */}
          </div>

          {tutor === 0 ? (
            <div className="group-bottom">
              <div className="group-left">
                <div className="group-search">
                  <SearchBar setQuery={setQuery} />
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
                    <GetGroups query={query} />
                  </Suspense>
                </div>
              </div>

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
                        resource={fetchData(API.ROOMMYROOM, {
                          headers: {
                            Authorization: "Bearer " + userInfo.access_token,
                          },
                        })}
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

const SearchBar = ({ setQuery }) => {
  const onSearchHandler = (e) => {
    setQuery(document.getElementById("SV").value);
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
const GetGroups = ({ query }) => {
  const [page, setPage] = useState(1);

  const { data: GroupList } = useQuery(
    ["roomlist", page, query],
    () =>
      axios.get(API.ROOM, {
        params: {
          size: 5,
          page: page,
          query: query,
        },
      }),
    { suspense: true }
  );
  return (
    <>
      {GroupList.data.room_list.map((e) => {
        return <AllGroupBox info={e} key={e.id} />;
      })}
      <div className="leftBottom" style={{ marginTop: "20px" }}>
        <Pagination
          count={Math.ceil(GroupList.data.total / GroupList.data.size)}
          variant="outlined"
          shape="rounded"
          defaultPage={1}
          page={page}
          onChange={(e, value) => setPage(value)}
        />
      </div>
    </>
  );
};

const GetMyGroups = ({ resource }) => {
  const GroupList = resource.read();

  return (
    <>
      {GroupList.map((e) => {
        return <GroupBox info={e} key={e.id} />;
      })}
    </>
  );
};
