import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useAppSelector } from "../../../../app/store";
import { API } from "api/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "api/axiosWithPathParameter";

export const WriteComment = ({ commentShoot }) => {
  const userInfo = useAppSelector((state) => state.loginState);
  const [context, setContext] = useState("");
  const board_id = window.location.pathname.split("/").at(-1);
  const queryClient = useQueryClient();

  const addCommentHandler = useMutation(
    () =>
      axiosInstance.post(
        API.COMMENT,
        {
          context: context,
        },
        {
          headers: { Authorization: "Bearer " + userInfo.access_token },
          urlParams: {
            board_id: board_id,
          },
        }
      ),
    {
      onSuccess: (res) => {
        // 요청이 성공한 경우
        commentShoot(2);
        queryClient.setQueryData(
          ["commentList", Number.parseInt(board_id)],
          (oldData) => {
            let newData = { ...oldData };
            newData.data = [res.data, ...newData.data];
            return newData;
          }
        );
      },
    }
  );
  const onContextHandler = (e) => {
    setContext(e.currentTarget.value);
  };

  const cancelSubmit = () => {
    commentShoot(2);
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

        <Button
          variant="outline-info"
          id="commentSubmit"
          onClick={addCommentHandler.mutate}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};
