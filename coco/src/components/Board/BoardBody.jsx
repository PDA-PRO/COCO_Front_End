import React, { Suspense } from "react";
import "./Board.css";
import { Guel } from "./Guel";
import Spinner from "react-bootstrap/Spinner";
import fetchData from "../../api/fetchTask";
import { FastWrite } from "./FastWrite";

export const BoardBody = () => {
  return (
    <div className="boardBody">
      <div className="Bone">
        <Suspense fallback={<Spinner />}>
          <GetList resource={fetchData("http://127.0.0.1:8000/board")} />
        </Suspense>
      </div>

      <div className="Btwo">
        <FastWrite />
      </div>
    </div>
  );
};

const GetList = ({ resource }) => {
  const BoardList = resource.read();
  console.log(BoardList[0].title);

  return (
    <>
      {BoardList.map((e) => {
        return <Guel props={e} key={e.id} />;
      })}
    </>
  );
};
