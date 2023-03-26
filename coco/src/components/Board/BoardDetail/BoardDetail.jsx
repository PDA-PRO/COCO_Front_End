import React, { Suspense } from "react";
import { Header } from "../../Home/Header";
import { Footer } from "../../Home/Footer";
import "./BD.css";
import {
  BsCode,
  BsCodeSlash,
  BsFillEyeFill,
  BsFillChatSquareDotsFill,
  BsFillHeartFill,
} from "react-icons/bs";
import { SlPencil } from "react-icons/sl";
import { VscCommentDiscussion } from "react-icons/vsc";

import fetchData from "../../../api/fetchTask";
import { Comments } from "./Comments/Comments";
import { WriteComment } from "./Comments/WriteComment";
import { useState } from "react";
import { useAppSelector } from "../../../app/store";
import axios from "axios";
import { useEffect } from "react";
import { BsTrash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../Loader/Loader";
import CodeMirror from "@uiw/react-codemirror";

export const BoardDetail = () => {
  var path = window.location.pathname;
  path = path.split("/");

  return (
    <>
      <Header />
      <Suspense fallback={<Loader />}>
        <GetBoardDetail
          resource={fetchData(
            `http://127.0.0.1:8000/board/${path.at(-1)}/`
          )}

          key={path.at(-1)}
        />
      </Suspense>
      <Footer />
    </>
  );
};

const GetBoardDetail = ({ resource }) => {
  const detail = resource.read(); //api fetch 결과
  const userInfo = useAppSelector((state) => state.loginState);
  const navigate = useNavigate();
  const [write, setWrite] = useState(false);
  const [like, setLike] = useState(false);

  const [likeNum, setLikeNum] = useState(detail.likes);
  var numLike = detail.likes;
  const [isMe, setIsMe] = useState(false);


  const likedBoard = () => {
    for(let i=0;i<detail.is_board_liked.length;i++){
      if(detail.is_board_liked[i] === userInfo.id){
        setLike(true);
        break;
      }
    }
  }

  useEffect(() => {
    if (detail.user_id === userInfo.id || userInfo.ismanage === true) {
      setIsMe(true);
    }

    likedBoard();

  }, [isMe]);

  const commentShoot = (e) => {
    if (e == 1) {
      setWrite(true);
    } else {
      setWrite(false);
    }
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

  const onLikesHandler = () => {
    if (!like) {
      setLikeNum(likeNum + 1);
      numLike += 1;
      setLike(true);
    } else {
      setLikeNum(likeNum - 1);
      numLike -= 1;
      setLike(false)

    }
    axios
      .post(
        "http://127.0.0.1:8000/board_likes/",
        {
          user_id: userInfo.id,
          board_id: detail.id,
          likes: numLike,
          type: like,
        },
        {
          headers: { Authorization: "Bearer " + userInfo.access_token },
        }
      )
      .catch(() => {
        alert("인증실패");
      });
  };

  const onDeleteHandler = () => {
    axios
      .post(
        "http://127.0.0.1:8000/delete_content/",
        {
          board_id: detail.id,
          user_id: userInfo.id,
        },
        {
          headers: { Authorization: "Bearer " + userInfo.access_token },
        }
      )
      .then((res) => {
        if (res.data.code === 1) {
          alert("게시글이 삭제되었습니다");
          navigate(`/board`);
        }
      })
      .catch(() => {
        alert("인증실패");
      });
  };

  const CodeHere = () => {
    const code = detail.code;
    return (
      <div className="BDCode">
        <div className="BD_codeTop">
          <BsCode size={33} />
          <h2>CODE HERE</h2>
          <BsCodeSlash size={33} />
        </div>

        <div className="BD_showCode">
          <CodeMirror width="100%" value={code} readOnly={true} />
        </div>
        <p></p>
      </div>
    );
  };

  return (
    <>
      <div className="boardDetail">
        <div className="BDBody">
          <div className="BDtitle">
            <h2>{detail.title}</h2>
            <div className="BD_idAndTime">
              <h3>작성자 : {detail.user_id}</h3>
              <h3>{timeForToday(detail.time)}</h3>
            </div>
          </div>

          <div className="BDsubTitle">
            <div id="bun1">
              <div className="BDun">
                <BsFillEyeFill size={25} color="gray" />
                <p>{detail.views}</p>
              </div>

              <div className="BDun">
                <BsFillChatSquareDotsFill size={20} color="gray" />
                <p>{detail.comments}</p>
              </div>

              {isMe ? (
                <p id="del_Guel" onClick={onDeleteHandler}>
                  <BsTrash
                    size={25}
                    color="red"
                    style={{ cursor: "pointer" }}
                  />
                </p>
              ) : (
                <p></p>
              )}
            </div>

            <div id="bun2">
              <div
                className="BDun"
                onClick={onLikesHandler}
                style={{ color: like === true ? "red" : "gray" }}
              >
                <BsFillHeartFill size={23} />
                <p>{likeNum}</p>
              </div>
            </div>
          </div>

          <div className="BDContent">
            <div className="BDTxt">
              <div dangerouslySetInnerHTML={{ __html: detail.context }} />
            </div>

            {detail.category === 2 ? <CodeHere /> : <></>}
          </div>
          <div className="comments">
            <div className="cHead">
              <div className="cUn1">
                <VscCommentDiscussion size={35} color="#6BE52E" />
                <h2>댓글</h2>
              </div>

              <div
                className="cWrite"
                onClick={() => {
                  commentShoot(1);
                }}
              >
                <SlPencil size={20} />
                <p>댓글 작성</p>
              </div>
            </div>

            <div className="cBody">
              {write ? (
                <WriteComment commentShoot={commentShoot} />
              ) : (
                <div id="closeState"></div>
              )}

              {detail.comments_datail.map((e) => {
                return (
                  <Comments
                    props={e}
                    key={e.id}
                    is_liked={detail.is_comment_liked}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
