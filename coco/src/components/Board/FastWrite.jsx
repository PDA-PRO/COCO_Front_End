import React, { useState } from "react";
import {
  BsFillLightningFill,
  BsFillExclamationTriangleFill,
} from "react-icons/bs";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useSelector } from "react-redux";

export const FastWrite = () => {
  const [title, setTitle] = useState("");
  const [context, setContext] = useState("");
  const userInfo = useSelector((state) => state.loginState);

  const onTitleHandler = (e) => {
    setTitle(e.currentTarget.value);
  };

  const onContextHandler = (e) => {
    setContext(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("shoot");
    if (title == "" || context == "") {
      return alert("완전히 입력해주세요.");
    } else {
      console.log(userInfo.id);
      axios
        .post("http://127.0.0.1:8000/fastWrite/", {
          user_id: userInfo.id,
          title: title,
          context: context,
        })
        .then(function (response) {
          if (response.data.code === 1) {
            alert(`${title} 업로드 성공`);
            // window.location.replace("/board");
          } else {
            alert("ERROR - SERVER COMMUNICATION FAILED");
          }
        });
    }
  };

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
        placeholder="제목을 입력해주세요 (15자 이내)"
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
        <p>빠른 글쓰기는 '자유' 로 고정됩니다.</p>
        <BsFillExclamationTriangleFill size={15} color="gray" />
      </div>
    </div>
  );
};
