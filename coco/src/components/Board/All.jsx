import React, { Suspense } from "react";
import { useState } from "react";
import "./Board.css";
import { BoardBox } from "./BoardBox";
import Spinner from "react-bootstrap/Spinner";
import fetchData from "../../api/fetchTask";

export const All = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <GetList />
    </Suspense>
  );
};

const resource = fetchData("http://127.0.0.1:8000/board");

const GetList = () => {
  const BoardList = resource.read();

  return (
    <>
      {BoardList.map((e) => {
        return <BoardBox props={e} key={e.id} />;
      })}
    </>
  );
};
