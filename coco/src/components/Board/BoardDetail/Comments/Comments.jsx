import React, { useState } from "react";
import "../BD.css";
import { BsFillHeartFill, BsTrash } from "react-icons/bs";
import { useAppSelector } from "../../../../app/store";
import { useEffect } from "react";
import { API } from "api/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "api/axiosWithPathParameter";

export const Comments = ({ commentData }) => {
  //commentData: id, context, write_time, likes, user_id, board_id
  const [isMe, setIsMe] = useState(false);
  const userInfo = useAppSelector((state) => state.loginState);
  const [like, setLike] = useState(commentData.is_liked);
  const [likeNum, setLikeNum] = useState(commentData.likes);
  const queryClient = useQueryClient();
  const deleteCommentHandler = useMutation(
    () =>
      axiosInstance.delete(API.COMMENT, {
        headers: { Authorization: "Bearer " + userInfo.access_token },
        urlParams: {
          board_id: commentData.board_id,
          comment_id: commentData.id,
        },
      }),
    {
      onSuccess: () => {
        // 요청이 성공한 경우
        queryClient.setQueryData(
          ["commentList", commentData.board_id],
          (oldData) => {
            let newData = { ...oldData };
            newData.data = newData.data.filter(
              (comment) => comment.id !== commentData.id
            );
            return newData;
          }
        );
      },
    }
  );

  //삭제할 수 있는 유저인지 상태 업데이트
  useEffect(() => {
    if (commentData.user_id === userInfo.id || userInfo.ismanage === true) {
      setIsMe(true);
    }
  }, []);

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
    axiosInstance
      .patch(
        API.COMMENTLIKE,
        {},
        {
          headers: { Authorization: "Bearer " + userInfo.access_token },
          params: {
            like_type: like,
          },
          urlParams: {
            board_id: commentData.board_id,
            comment_id: commentData.id,
          },
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
        alert("인증실패");
      });
  };

  return (
    <div className="commentContext">
      <div className="commentHead">
        <div className="un">
          <h2 className="cUserID">{commentData.user_id}</h2>
          <p>{timeForToday(commentData.write_time)}</p>
        </div>
        {userInfo.id === "" ? (
          <></>
        ) : (
          <div
            className="un2"
            onClick={onLikesHandler}
            style={{ color: like === true ? "red" : "gray" }}
          >
            <BsFillHeartFill size={20} />
            <p>{likeNum}</p>
          </div>
        )}
      </div>
      <div className="commentBody">
        <p id="commentCon">{commentData.context}</p>
        {isMe ? (
          <BsTrash
            size={18}
            color="red"
            style={{ cursor: "pointer" }}
            onClick={deleteCommentHandler.mutate}
          />
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};
