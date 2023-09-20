import React, { Suspense } from "react";
import "./Board.css";
import { Guel } from "./Guel";
import Spinner from "react-bootstrap/Spinner";
import fetchData from "../../api/fetchTask";
import { FastWrite } from "./FastWrite";
import { API } from "api/config";

export const BoardBody = () => {
  return (
    <div className="boardBody">
      <div className="Bone">
        <Suspense fallback={<Spinner />}>
          <GetList resource={fetchData(API.BOARD)} />
        </Suspense>
      </div>

      <FastWrite />
    </div>
  );
};

const GetList = ({ resource }) => {
  const BoardList = resource.read();
  return (
    <>
      {BoardList.boardlist.map((e) => {
        return <Guel props={e} key={e.id} />;
      })}
    </>
  );
};
