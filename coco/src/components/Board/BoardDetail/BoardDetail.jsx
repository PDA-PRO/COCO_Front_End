import React from "react";
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
import { Comments } from "./Comments/Comments";
import { WriteComment } from "./Comments/WriteComment";
import { useState } from "react";
import { useAppSelector } from "../../../app/store";
import { useEffect } from "react";
import { BsTrash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../Loader/Loader";
import CodeMirror from "@uiw/react-codemirror";
import { API } from "api/config";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import axios from "axios";
import { Notfound } from "../../Notfound";

export const BoardDetail = () => {
  return (
    <>
      <Header />
      <GetBoardDetail />
      <Footer />
    </>
  );
};

const GetBoardDetail = () => {
  const userInfo = useAppSelector((state) => state.loginState);
  const board_id = window.location.pathname.split("/").at(-1);
  const navigate = useNavigate();
  const [write, setWrite] = useState(false);
  const [like, setLike] = useState(false);
  const [likeNum, setLikeNum] = useState(0);
  const [isMe, setIsMe] = useState(false);

  //게시글 상세 정보 및 댓글 리스트 요청
  const { isFetching, data: boardData } = useQuery(
    ["boardlist", board_id],
    () =>
      axios.get(API.BOARD + board_id, {
        params: { user_id: userInfo.id },
      })
  );

  const { isFetching: commentFetching, data: commentList } = useQuery(
    ["commentList", Number.parseInt(board_id)],
    () =>
      axios.get(API.COMMENT, {
        params: { user_id: userInfo.id, board_id: board_id },
      })
  );

  //게시글 상세 정보 조회 성공시 필요한 상태 변환
  useEffect(() => {
    if (boardData !== undefined) {
      if (!isFetching) {
        if (
          boardData.data.user_id === userInfo.id ||
          userInfo.ismanage === true
        ) {
          setIsMe(true);
        }
        setLike(boardData.data.is_board_liked);
        setLikeNum(boardData.data.likes);
      }
    }
  }, [isFetching]);

  //상세 정보 조회 중 로딩화면 출력
  if (isFetching) {
    return <Loader />;
  }

  if (boardData === undefined) {
    return <Notfound />;
  }

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
    const convertTime = timeValue.getTime() + 9 * 60 * 60 * 1000;

    const betweenTime = Math.floor((today.getTime() - convertTime) / 1000 / 60);
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
    axios
      .patch(
        API.BAORDLIKE,
        {
          board_id: boardData.data.id,
          type: like,
        },
        {
          headers: { Authorization: "Bearer " + userInfo.access_token },
        }
      )
      .then(() => {
        if (!like) {
          setLikeNum(likeNum + 1);
          setLike(true);
        } else {
          setLikeNum(likeNum - 1);
          setLike(false);
        }
      })
      .catch(() => {
        Swal.fire({ icon: "error", title: "인증실패" });
      });
  };

  const onDeleteHandler = () => {
    Swal.fire({ icon: "info", title: "정말 삭제하시겠습니까?" }).then((res) => {
      if (res.isConfirmed) {
        axios
          .delete(
            API.BOARD,

            {
              headers: { Authorization: "Bearer " + userInfo.access_token },
              params: {
                board_id: boardData.data.id,
              },
            }
          )
          .then((res) => {
            if (res.data.code === 1) {
              navigate(`/board`);
            }
          })
          .catch(() => {
            Swal.fire({ icon: "error", title: "인증실패" });
          });
      }
    });
  };

  const CodeHere = () => {
    function makeNoLine(arr) {
      if (arr.length == 0) {
        return "";
      } else {
        var dataArray = arr.split("\n");

        var numberedData = dataArray
          .map((item, index) => {
            return `${index + 1}@${item}`;
          })
          .join("\n");

        const strings = numberedData.split("\n").map((str) => {
          const [num, val] = str.split("@");
          return (
            <div className="codeLine">
              <n className="codeNum">{num}.</n>
              <n className="codeTxt">{val}</n>
            </div>
          );
        });
        return strings;
      }
    }

    const code = boardData.data.code;
    return (
      <div className="BDCode">
        <div className="BD_showCode">
          <pre className="R-Code">{makeNoLine(code)}</pre>
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
            <h2>{boardData.data.title}</h2>
            <div className="BD_idAndTime">
              <h3>작성자 : {boardData.data.user_id}</h3>
              <h3>{timeForToday(boardData.data.time)}</h3>
            </div>
          </div>

          <div className="BDsubTitle">
            <div id="bun1">
              <div className="BDun">
                <BsFillEyeFill size={23} color="gray" />
                <p>{boardData.data.views}</p>
              </div>

              <div className="BDun">
                <BsFillChatSquareDotsFill size={20} color="gray" />
                <p>{boardData.data.comments}</p>
              </div>

              {isMe ? (
                <p id="del_Guel" onClick={onDeleteHandler}>
                  <BsTrash
                    size={20}
                    color="red"
                    style={{ cursor: "pointer" }}
                  />
                </p>
              ) : (
                <p></p>
              )}
            </div>

            <div id="bun2">
              {userInfo.id === "" ? (
                <></>
              ) : (
                <div
                  className="BDun"
                  onClick={onLikesHandler}
                  style={{ color: like === true ? "red" : "gray" }}
                >
                  <BsFillHeartFill size={23} />
                  <p>{likeNum}</p>
                </div>
              )}
            </div>
          </div>

          {boardData.data.category === 2 ? (
            <div className="BDContent-help">
              <div className="BDTxt">
                <div
                  dangerouslySetInnerHTML={{
                    __html: boardData.data.context,
                  }}
                />
              </div>

              <CodeHere />
            </div>
          ) : (
            <div className="BDContent">
              <div className="BDTxt">
                <div
                  dangerouslySetInnerHTML={{
                    __html: boardData.data.context,
                  }}
                />
              </div>
            </div>
          )}

          <div className="comments">
            <div className="cHead">
              <div className="cUn1">
                <VscCommentDiscussion size={25} color="#6BE52E" />
                <h2>댓글</h2>
              </div>
              <div
                className="cWrite"
                onClick={() => {
                  if (userInfo.id === "") {
                    Swal.fire({
                      icon: "warning",
                      title:
                        "로그인이 필요한 서비스입니다\n로그인 하시겠습니까",
                    }).then((res) => {
                      if (res.isConfirmed) {
                        navigate("/login");
                      }
                    });
                  } else {
                    commentShoot(1);
                  }
                }}
              >
                <SlPencil size={18} />
                <p style={{ fontSize: "1em" }}>댓글 작성</p>
              </div>
            </div>

            {boardData !== undefined ? (
              <div className="cBody">
                {write ? (
                  <WriteComment commentShoot={commentShoot} />
                ) : (
                  <div id="closeState"></div>
                )}
                {commentFetching ? (
                  <Loader />
                ) : (
                  commentList.data.map((commentData) => {
                    return (
                      <Comments
                        commentData={commentData}
                        key={commentData.id}
                      />
                    );
                  })
                )}
              </div>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
