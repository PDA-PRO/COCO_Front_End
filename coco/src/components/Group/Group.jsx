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

export const Group = () => {
  const navigate = useNavigate();
  const reload = () => {
    navigate(0);
  };

  return (
    <>
      <Header />
      <div className="group">
        <div className="group-Body">
          <div className="groupTop">
            <img
              src="/image/sm.png"
              height="80px"
              alt=""
              onClick={() => reload()}
              style={{ cursor: "pointer" }}
            />
            <h4 onClick={() => reload()} style={{ cursor: "pointer" }}>
              COCO GROUP
            </h4>
          </div>

          <div className="group-bottom">
            <div className="group-left">
              <div className="group-search">
                <SearchBar />
              </div>
            </div>
            <div className="group-right">
              <div className="r-top">
                <h2>My Groups</h2>
              </div>

              <div className="myGroups">
                <div className="myGroupsTop">
                  <p>No</p>
                  <p>그룹 명</p>
                  <p>구성원 수</p>
                </div>

                <Suspense fallback={<Spinner />}>
                  <GetMyGroups
                    resource={fetchData("http://127.0.0.1:8000/tasklist")}
                  />
                </Suspense>
              </div>
            </div>
          </div>
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
    console.log(info);
  };

  return (
    <div className="searchBar">
      <input type="text" placeholder="그룹명 검색" id="SV" />
      <GoSearch
        size={23}
        color="rgb(98, 148, 255)"
        id="goSearch"
        onClick={() => onSearchHandler()}
      />
    </div>
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
      {GroupList.slice(20 * (page - 1), 20 * (page - 1) + 20).map((e) => {
        return <GroupBox info={e} key={e.id} />;
      })}
      <div className="leftBottom">
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
