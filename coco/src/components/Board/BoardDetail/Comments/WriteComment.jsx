import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import axios from "axios";
import { useAppSelector } from "../../../../app/store";
import { useNavigate } from "react-router-dom";

export const WriteComment = ({ commentShoot }) => {
  const userInfo = useAppSelector((state) => state.loginState);
  const [context, setContext] = useState("");
  const navigate = useNavigate();
  const onContextHandler = (e) => {
    setContext(e.currentTarget.value);
  };

  const cancelSubmit = () => {
    commentShoot(2);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("shoot");
    if (context == "") {
      return alert("내용을 입력해주세요.");
    } else {
      var path = window.location.pathname;
      path = path.split("/");
      axios
        .post(
          "http://127.0.0.1:8000/comment",
          {
            user_id: userInfo.id,
            context: context,
            board_id: path.at(-1),
          },
          {
            headers: { Authorization: "Bearer " + userInfo.access_token },
          }
        )
        .then(function (response) {
          if (response.data.code === 1) {
            alert(`댓글 작성 완료`);
            navigate(0);
          } else {
            alert("ERROR - SERVER COMMUNICATION FAILED");
          }
        })
        .catch(() => {
          alert("인증실패");
        });
    }
  };
  return (
    <div className="writeComment">
      <Form.Control
        as="textarea"
        id="commentArea"
        style={{ height: "100px" }}
        placeholder="댓글을 입력해주세요. 무분별한 욕설 및 비방은 삭제조치 될 수 있습니다."
        onChange={onContextHandler}
      />

      <div className="btns">
        <Button
          variant="outline-danger"
          id="commentCancel"
          onClick={() => {
            cancelSubmit();
          }}
        >
          Cancel
        </Button>

        <Button variant="outline-info" id="commentSubmit" onClick={onSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
};
