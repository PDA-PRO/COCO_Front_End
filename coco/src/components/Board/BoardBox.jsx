import React from "react";

export const BoardBox = (props) => {
  const moveDetail = (e) => {
    window.location.href = `/board/${e}`;
  };
  return (
    <div className="boardList" onClick={() => moveDetail(props.id)}>
      <div className="boardContentTitles">props.title</div>
      <div className="boardContentCategory">props.category</div>
      <div className="boardContentWriter">props.userID</div>
      <div className="boardContentComments">props.comment</div>
      <div className="boardContentTime">props.time</div>
    </div>
  );
};
