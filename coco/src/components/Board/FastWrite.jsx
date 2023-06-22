import React, { useState } from "react";
import {
  BsFillLightningFill,
  BsFillExclamationTriangleFill,
} from "react-icons/bs";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useAppSelector } from "../../app/store";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";

export const FastWrite = () => {
  const [title, setTitle] = useState("");
  const [context, setContext] = useState("");
  const userInfo = useAppSelector((state) => state.loginState);
  const Large = useMediaQuery({ minWidth: 1250 });
  const navigate = useNavigate();

  const onTitleHandler = (e) => {
    setTitle(e.currentTarget.value);
  };

  const onContextHandler = (e) => {
    setContext(e.currentTarget.value);
  };

  const submitConfirm = () => {
    if (title == "" || context == "") {
      return alert("완전히 입력해주세요.");
    } else {
      axios
        .post(
          "http://127.0.0.1:8000/write_board/",
          {
            user_id: userInfo.id,
            title: title,
            context: context,
            category: 3,
            group_id: 0,
          },
          {
            headers: { Authorization: "Bearer " + userInfo.access_token },
          }
        )
        .then(function (response) {
          if (response.data.code === 1) {
            alert(`${title} 업로드 성공`);
            window.location.replace("/board");
          } else {
            alert("ERROR - SERVER COMMUNICATION FAILED");
          }
        })
        .catch(() => {
          alert("인증실패");
        });
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (userInfo.id === "" && userInfo.pw === "") {
      const check = window.confirm(
        "로그인이 필요한 서비스입니다\n로그인 하시겠습니까"
      );
      if (check === true) {
        navigate("/login");
      }
    } else {
      submitConfirm();
    }
  }

  return (
    <div className="FastWrite">
      <div className="FWHead">
        <BsFillLightningFill size={24} color="#40AFFF" />
        <h2>빠른 글쓰기</h2>
      </div>

      <Form.Control
        as="textarea"
        id="txtTitle"
        style={{ height: "40px" }}
        placeholder={
          Large ? "제목을 입력해주세요 (15자 이내)" : "제목을 입력해주세요"
        }
        onChange={onTitleHandler}
      />

      <br />

      <Form.Control
        as="textarea"
        id="txtInput"
        style={{ height: "270px" }}
        placeholder="내용을 입력해주세요."
        onChange={onContextHandler}
      />
      <Button variant="outline-primary" id="FastSubmit" onClick={onSubmit}>
        Submit
      </Button>
      <div className="FWFooter">
        <BsFillExclamationTriangleFill size={15} color="gray" />
        <p>
          {Large
            ? "빠른 글쓰기는 '자유' 로 고정됩니다."
            : "고정 카테고리 : '자유'"}
        </p>
        <BsFillExclamationTriangleFill size={15} color="gray" />
      </div>
    </div>
  );
};
