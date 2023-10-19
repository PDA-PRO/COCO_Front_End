import React, { Suspense } from "react";
import "./Board.css";
import { Guel } from "./Guel";
import Spinner from "react-bootstrap/Spinner";
import { FastWrite } from "./FastWrite";
import { API } from "api/config";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { AIqa } from "./AIqa";

export const BoardBody = () => {
  return (
    <div className="boardBody">
      <div className="Bone">
        <GetList />
      </div>
      <div className="fwAndQa" id="modalParent">
        <AIqa />
        <FastWrite />
      </div>
    </div>
  );
};

const GetList = () => {
  const { isFetching, data: boardList } = useQuery(["boardlist"], () =>
    axios.get(API.BOARD)
  );
  if (isFetching) {
    return <Spinner />;
  }
  return (
    <>
      {boardList.data.boardlist.map((e) => {
        return <Guel props={e} key={e.id} />;
      })}
    </>
  );
};
