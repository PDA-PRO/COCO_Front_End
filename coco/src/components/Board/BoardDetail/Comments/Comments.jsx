import React, { useState } from "react";
import "../BD.css";
import { BsFillHeartFill, BsTrash } from "react-icons/bs";
import { useAppSelector } from "../../../../app/store";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "api/config";

export const Comments = (props) => {
  //props: id, context, write_time, likes, user_id, board_id
  console.log(props);
  const [isMe, setIsMe] = useState(false);
  const userInfo = useAppSelector((state) => state.loginState);
  const [like, setLike] = useState(props.props.is_liked);
  const navigate = useNavigate();
  const [likeNum, setLikeNum] = useState(props.props.likes);

  useEffect(() => {
    if (props.props.user_id === userInfo.id || userInfo.ismanage === true) {
      setIsMe(true);
    }
  }, [isMe]);

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
      setLike(true);
    } else {
      setLikeNum(likeNum - 1);
      setLike(false);
    }
    axios
      .patch(
        API.COMMENTLIKE,
        {
          user_id: userInfo.id,
          board_id: props.props.board_id,
          comment_id: props.props.id,
          type: like,
        },
        {
          headers: { Authorization: "Bearer " + userInfo.access_token },
        }
      )
      .then(() => {
        // window.location.replace("/board");
      })
      .catch(() => {
        alert("인증실패");
      });
  };

  const onDeleteHandler = () => {
    axios
      .delete(API.COMMENT, {
        headers: { Authorization: "Bearer " + userInfo.access_token },
        params: {
          board_id: props.props.board_id,
          comment_id: props.props.id,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.code === 1) {
          alert("해당 댓글이 삭제되었습니다");
        } else {
          alert("삭제에 실패하였습니다");
        }
        var path = window.location.pathname;
        path = path.split("/");
        navigate(`/board/${path.at(-1)}`);
        //window.location.href = `/board/${path.at(-1)}`;
      })
      .catch(() => {
        alert("인증실패");
      });
  };

  return (
    <div className="commentContext">
      <div className="commentHead">
        <div className="un">
          <h2 className="cUserID">{props.props.user_id}</h2>
          <p>{timeForToday(props.props.write_time)}</p>
        </div>
        <div
          className="un2"
          onClick={onLikesHandler}
          style={{ color: like === true ? "red" : "gray" }}
        >
          <BsFillHeartFill size={23} />
          <p>{likeNum}</p>
        </div>
      </div>
      <div className="commentBody">
        <p id="commentCon">{props.props.context}</p>
        {isMe ? (
          <BsTrash
            size={20}
            color="red"
            style={{ cursor: "pointer" }}
            onClick={onDeleteHandler}
          />
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};
