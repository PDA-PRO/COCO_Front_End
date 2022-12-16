import React, { Suspense } from "react";
import { Header } from "../Home/Header";
import { Footer } from "../Home/Footer";
import "./StatusList.css";
import { StatusListBox } from "./StatusListBox";
import Spinner from "react-bootstrap/Spinner";
import fetchData from "../../api/fetchTask";
import { useLocation } from "react-router-dom";

export const StatusList = () => {
  const location = useLocation();
  console.log(location.state);
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
          <Getsubmits
            resource={
              location.state == null
                ? fetchData(`http://127.0.0.1:8000/status`)
                : fetchData(
                    `http://127.0.0.1:8000/status?user_id=${location.state.user_id}`
                  )
            }
          />
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
