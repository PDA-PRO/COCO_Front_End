import React, { Suspense } from "react";
import { Header } from "../Home/Header";
import { Footer } from "../Home/Footer";
import "./StatusList.css";
import { StatusListBox } from "./StatusListBox";
import Spinner from "react-bootstrap/Spinner";
import fetchData from "../../api/fetchTask";

export const StatusList = ({ user_id }) => {
  return (
    <div>
      <Header />
      <div className="statusListContainer">
        <div className="statusListBox">
          <div>제출 번호</div>
          <div>아이디</div>
          <div>문제</div>
          <div>문제</div>
          <div>결과</div>
          <div>제출시간</div>
        </div>
        <Suspense fallback={<Spinner />}>
          <Getsubmits resource={fetchData(`http://127.0.0.1:8000/status`)} />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
};

const Getsubmits = ({ resource }) => {
  const problemList = resource.read();
  return (
    <>
      {problemList.map((e) => {
        return <StatusListBox info={e} key={e.user_id} />;
      })}
    </>
  );
};
