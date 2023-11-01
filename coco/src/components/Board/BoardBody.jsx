import React, { Suspense, useState } from "react";
import "./Board.css";
import { Guel } from "./Guel";
import Spinner from "react-bootstrap/Spinner";
import { FastWrite } from "./FastWrite";
import { API } from "api/config";
import { useQuery } from "@tanstack/react-query";
import { AIqa } from "./AIqa";
import axios from "axios";
import { PiWarningLight } from "react-icons/pi";

export const BoardBody = () => {
  const [guide, setGuide] = useState(false);
  return (
    <div className="bB">
      <div id="guideLine" onClick={() => setGuide(!guide)}>
        <PiWarningLight size={18} color="gray" />
        <p>커뮤니티 가이드라인</p>
      </div>
      {guide === true ? (
        <div id="guidelineContent">
          <p>
            다음과 같이 커뮤니티를 이용 시 게시글이 강제 삭제 될 수 있습니다.
          </p>
          <ol>
            <li>
              게시판에 문제의 매우 중요한 스포일러를 올리는 경우
              <br />- 9999문제의 정답을 올리는 것과 같은 글을 의미합니다.
            </li>
            <li>
              사이트 이용자에게 매우 큰 혼란을 줄 수 있는 글을 올리는 경우
              <br />- "[긴급공지] 서비스 종료"와 같은 글을 의미합니다.
            </li>
            <li>
              홍보를 위해 게시판을 이용하는 경우
              <br />- “카페를 새로 개업했어요. 자주 놀러오세요~”와 같은 글을
              의미합니다.
            </li>
            <li>
              타 유저를 존중하지 않는 글을 올리는 경우
              <br />- “비전공자들은 쓸데없이 코딩을 왜 배움?”와 같은 글을
              의미합니다.
            </li>
          </ol>
          <hr />
        </div>
      ) : (
        <></>
      )}

      <div className="boardBody">
        <div className="Bone">
          <GetList />
        </div>
        <div className="fwAndQa" id="modalParent">
          <AIqa />
          <FastWrite />
        </div>
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
