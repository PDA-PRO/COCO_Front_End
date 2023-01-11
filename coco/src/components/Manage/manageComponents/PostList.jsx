import "../Manage.css";

import React, { Suspense, useRef, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import fetchData from "../../../api/fetchTask";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import {
  BsFillEyeFill,
  BsChatSquareTextFill,
  BsHeart,
  BsHeartFill,
  BsFillLightbulbFill,
  BsMegaphoneFill,
  BsQuestionLg,
  BsTrash,
} from "react-icons/bs";

export const PostList = () => {
  return (
    <>
      <h2 className="mTi">POST LIST</h2>
      <div>
        <Suspense fallback={<Spinner />}>
          <BoardList resource={fetchData(`http://127.0.0.1:8000/boardlist`)} />
        </Suspense>
      </div>
    </>
  );
};

const BoardList = ({ resource }) => {
  const problemList = resource.read();
  const [tasks, settasks] = useState(problemList);

  return (
    <div className="m-upload">
      <div className="postTop">
        <h3>카테고리</h3>
        <h3>제목</h3>
        <h3>작성자</h3>
        <h3>작성일</h3>
        <h3>댓글</h3>
        <h3>조회수</h3>
        <h3>좋아요</h3>
      </div>
      {tasks.map((e) => {
        return <ListPost info={e} settasks={settasks}></ListPost>;
      })}
    </div>
  );
};

const ListPost = ({ info, settasks }) => {
  const navigate = useNavigate();
  const moveDetail = (e) => {
    navigate(`/board/${e}`);
  };

  const cateIcon = (e) => {
    switch (e) {
      case 1:
        return (
          <h4>
            <span>
              <BsMegaphoneFill
                size={18}
                color="#00ff00"
                style={{ marginRight: "10px" }}
              />
            </span>
            공지
          </h4>
        );
      case 2:
        return (
          <h4>
            <span>
              <BsQuestionLg
                size={18}
                color="rgb(255, 200, 101)"
                style={{ marginRight: "10px" }}
              />
            </span>
            HELP
          </h4>
        );
      case 3:
        return (
          <h4>
            <span>
              <BsFillLightbulbFill
                size={18}
                color="rgb(111, 101, 255)"
                style={{ marginRight: "10px" }}
              />
            </span>
            자유
          </h4>
        );
    }
  };

  const loadlist = (e) => {
    axios
      .get("http://127.0.0.1:8000/deleteBoard/" + info.id)
      .then(function (response) {
        axios.get("http://127.0.0.1:8000/boardlist").then(function (response) {
          console.log(response.data);
          settasks(response.data);
        });
        // 성공 핸들링
      });
  };

  function timeForToday(value) {
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor(
      (today.getTime() - timeValue.getTime()) / 1000 / 60
    );
    if (betweenTime < 1) return "방금전";
    if (betweenTime < 60) {
      return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
      return `${betweenTimeDay}일전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년전`;
  }

  return (
    <div className="postList">
      <h4>
        <span>{cateIcon(info.category)}</span>
      </h4>
      <h4 onClick={() => moveDetail(info.id)}>{info.title}</h4>
      <h4>{info.user_id}</h4>
      <h4>{timeForToday(info.time)}</h4>
      <h4>
        <span>
          <BsChatSquareTextFill
            color="rgb(112, 112, 112)"
            size={16}
            style={{ marginRight: "10px" }}
          />
        </span>
        {info.comments}
      </h4>
      <h4>
        <span>
          <BsFillEyeFill
            color="rgb(112, 112, 112)"
            size={20}
            style={{ marginRight: "10px" }}
          />
        </span>
        {info.views}
      </h4>
      <h4>
        <span>
          <BsHeartFill size={18} color="red" style={{ marginRight: "10px" }} />
        </span>
        {info.likes}
      </h4>
      <BsTrash
        cursor="pointer"
        size={20}
        color="red"
        onClick={loadlist}
        style={{ justifySelf: "center" }}
      />
    </div>
  );
};
