import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import {
  BsFillEyeFill,
  BsChatSquareTextFill,
  BsHeartFill,
  BsFillLightbulbFill,
  BsMegaphoneFill,
  BsQuestionLg,
  BsTrash,
} from "react-icons/bs";
import Pagination from "@mui/material/Pagination";
import { useAppSelector } from "../../../app/store";
import { API } from "api/config";
import Swal from "sweetalert2";
import "../Manage.css";
import axios from "axios";

export const PostList = () => {
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(0);
  const [postList, setPostList] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(API.BOARD, {
        params: {
          size: 10,
          page: page,
        },
      })
      .then(({ data }) => {
        setPostList(data);
        setLoading(false);
      });
  }, [reload, page]);
  return (
    <>
      <h2 className="mTi">POST LIST</h2>
      <div>
        {loading ? (
          <Spinner />
        ) : (
          <BoardList
            postList={postList}
            setPage={(value) => {
              setPage(value);
              setLoading(true);
            }}
            page={page}
            setReload={setReload}
            setLoading={setLoading}
          />
        )}
      </div>
    </>
  );
};

const BoardList = ({ postList, setPage, page, setReload, setLoading }) => {
  const userInfo = useAppSelector((state) => state.loginState);

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
      {postList.boardlist.map((e) => {
        return (
          <ListPost
            key={e.id}
            info={e}
            userinfo={userInfo}
            setReload={setReload}
            setLoading={setLoading}
          />
        );
      })}
      <div className="pageController">
        <Pagination
          count={Math.ceil(postList.total / postList.size)}
          variant="outlined"
          shape="rounded"
          page={page}
          defaultPage={1}
          onChange={(e, value) => setPage(value)}
        />
      </div>
    </div>
  );
};

const ListPost = ({ info, userinfo, setReload, setLoading }) => {
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
      .delete(API.BOARD, {
        params: { board_id: info.id },
        headers: { Authorization: "Bearer " + userinfo.access_token },
      })
      .then(function (response) {
        setReload(response.data);
        setLoading(true);
        Swal.fire({
          icon: "success",
          title: `id : ${info.id}, title : ${info.title} 게시글을 삭제했습니다.`,
          timer: 1000,
        });
      });
  };

  function timeForToday(value) {
    const today = new Date();
    const timeValue = new Date(value);
    const convertTime =  timeValue.getTime()+9 * 60 * 60 * 1000;

    const betweenTime = Math.floor(
      (today.getTime() - convertTime) / 1000 / 60
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

  console.log(info);

  return (
    <div className="postList">
      <h4>
        <span>{cateIcon(info.category)}</span>
      </h4>
      <h4
        style={{
          textOverflow: "ellipsis",
          maxWidth: "226px",
          textAlign: "center",
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
        onClick={() => moveDetail(info.id)}
      >
        {info.title}
      </h4>
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
