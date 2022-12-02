import React, { Suspense } from "react";
import "./Board.css";
import { Guel } from "./Guel";
import Spinner from "react-bootstrap/Spinner";
import fetchData from "../../api/fetchTask";

export const BoardBody = () => {
  return (
    <div className="boardBody">
      <Suspense fallback={<Spinner />}>
        <GetList resource={fetchData("http://127.0.0.1:8000/board")} />
      </Suspense>
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
