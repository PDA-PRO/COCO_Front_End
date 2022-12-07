import React, { useState } from "react";
import "../BD.css";
import { BsFillHeartFill } from "react-icons/bs";
import { useAppSelector } from "../../../../app/store";
import axios from "axios";

export const Comments = (props) => {
  //props: id, context, write_time, likes, user_id, board_id
  const [isMe, setIsMe] = useState(false);
  const userInfo = useAppSelector((state) => state.loginState);
  const [like, setLike] = useState(false);
  const [likeNum, setLikeNum] = useState(props.props[3]);
  var numLike = props.props[3];

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
    setLike(!like);
    if (!like) {
      setLikeNum(likeNum + 1);
      numLike += 1;
    } else {
      setLikeNum(likeNum - 1);
    }
    axios
      .post("http://127.0.0.1:8000/comment_likes/", {
        comment_id: props.props[0],
        user_id: userInfo.id,
        board_id: props.props[5],
        likes: numLike,
        type: like,
      })
      .then(() => {
        // window.location.replace("/board");
      });
  };

  return (
    <div className="commentContext">
      <div className="commentHead">
        <div className="un">
          <h2 className="cUserID">{props.props[4]}</h2>
          <p>{timeForToday(props.props[2])}</p>
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
        <p id="commentCon">{props.props[1]}</p>
        {isMe ? <p id="commentDel">삭제</p> : <p></p>}
      </div>
    </div>
  );
};
