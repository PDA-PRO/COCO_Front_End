import React from "react";
import "./GroupInfo.css";
import { Header } from "../Home/Header";
import { Footer } from "../Home/Footer";
import { Suspense } from "react";
import Spinner from "react-bootstrap/esm/Spinner";
import fetchData from "../../api/fetchTask";

export const GroupInfo = () => {
  const path = window.location.pathname.split("/");
  const numPath = parseInt(path.at(-1));

  console.log(numPath);

  return (
    <>
      <Header />
      <div className="groupInfo">
        <div className="gi">
          <Suspense fallback={<Spinner />}>
            <GiHeader
              resource={fetchData(`http://127.0.0.1:8000/group/${numPath}/`)}
            />
          </Suspense>
        </div>
      </div>
      <Footer />
    </>
  );
};

const GiHeader = ({ resource }) => {
  const GroupInfo = resource.read();

  console.log(GroupInfo);
  return (
    <div className="gi-head">
      <div>
        <img src="\image\group.png" height="73px" />
        <h2>그룹 명</h2>
      </div>

      <div>
        <p>전체 그룹 랭킹 : 3위</p>
        <p>현재 그룹원 수 : 7명</p>
        <p>그룹 장 : id님</p>
      </div>
    </div>
  );
};
