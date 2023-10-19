import React, { useState, useMemo } from "react";
import {
  BsFillLightningFill,
  BsFillExclamationTriangleFill,
} from "react-icons/bs";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useAppSelector } from "../../app/store";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { API } from "api/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import _ from "lodash";
const axios = require("axios")


export const FastWrite = () => {
  const [title, setTitle] = useState("");
  const userInfo = useAppSelector((state) => state.loginState);
  const Large = useMediaQuery({ minWidth: 1250 });
  const navigate = useNavigate();
  const [quillValue, setquillValue] = useState(""); // 메인 설명 html State !필수
  const queryClient = useQueryClient();
  const addHandler = useMutation(
    () =>
      axios.post(
        API.BOARD,
        {
          title: title,
          context: quillValue,
          category: 3,
        },
        {
          headers: { Authorization: "Bearer " + userInfo.access_token },
        }
      ),
    {
      onSuccess: (res) => {
        // 요청이 성공한 경우
        queryClient.setQueryData(
          ["boardlist"],
          (oldData) => {
            let newData = _.cloneDeep(oldData);
            newData.data.boardlist = [res.data, ...oldData.data.boardlist];
            return newData;
          },
          { exact: true }
        );
      },
    }
  );

  const onTitleHandler = (e) => {
    setTitle(e.currentTarget.value);
  };

  const quill_module = useMemo(() => {
    return {
      toolbar: { container: ["bold"] },
    };
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if (userInfo.id === "") {
      const check = window.confirm(
        "로그인이 필요한 서비스입니다\n로그인 하시겠습니까"
      );
      if (check === true) {
        navigate("/login");
      }
    } else {
      addHandler.mutate();
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
        placeholder={
          Large ? "제목을 입력해주세요 (15자 이내)" : "제목을 입력해주세요"
        }
        onChange={onTitleHandler}
      />

      <br />
      <ReactQuill
        theme="bubble"
        id="txtInput"
        onChange={setquillValue}
        modules={quill_module}
        value={quillValue}
        placeholder={"내용을 입력해주세요."}
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
