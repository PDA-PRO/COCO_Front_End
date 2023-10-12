import "../Manage.css";
import React from "react";
import { useState, useMemo, useRef, useEffect } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import {
  BsArrowDownRight,
  BsArrowUpLeft,
  BsUiChecksGrid,
  BsFileEarmarkZip,
} from "react-icons/bs";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import axios from "axios";
import { useAppSelector } from "../../../app/store";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Quill from "quill";
import ImageResize from "@looop/quill-image-resize-module-react";
import CreatableSelect from "react-select/creatable";
import JSZip from "jszip";
import { API } from "api/config";
import { SiAskubuntu } from "react-icons/si";
import Swal from "sweetalert2";

export const AITask = () => {
  const ASKContent = useRef();
  const Ask = (e) => {
    if (e === "") {
      Swal.fire({
        icon: "error",
        title: "질문의 내용을 입력해주세요",
      });
    } else {
      axios
        .post("", {
          content: e,
        })
        .then((res) => {
          if (res.data == true) {
            Swal.fire({
              icon: "success",
              title:
                "AI가 답변을 생성했습니다. \n 수정해야할 부분을 수정하고 업로드하세요!",
              timer: 2000,
              showConfirmButton: false,
            });
          }
        });
    }
  };

  return (
    <>
      <h2 className="mTi">AI TASK UPLOAD</h2>
      <div className="m-upload">
        <div className="howToUse">
          <h4>Before You Use</h4>
          <p>1. 생성하고자 하는 문제에 대해 AI에게 요청</p>
          <p>2. AI가 생성한 문제를 관리자가 확인 후, 업로드</p>
          <p>3. 문제의 난이도, 카테고리는 문제 업로드하는 관리자가 직접 선정</p>
          <p>
            4. AI에게 요청하는 질문의 형식을 주어진대로 맞춰서 입력해야 답변
            결과의 품질이 상승합니다.
          </p>
        </div>

        <div className="AskToAI">
          <InputGroup className="m-input">
            <InputGroup.Text
              id="inputGroup-sizing-default"
              style={{ backgroundColor: "transparent" }}
            >
              {/* <BsArrowDownRight size={30} /> */}
              <img src="/image/chatbot.png" width="30px"></img>
            </InputGroup.Text>
            <Form.Control
              ref={ASKContent}
              placeholder="ex) 문제에 입출력예시, 테스트 케이스(최소 20개), 메모리제한, 시간제한이 있는 조건문 알고리즘 문제 만들어줘"
              as="textarea"
              style={{ minHeight: "120px" }}
            />
          </InputGroup>

          <div className="askbtn" title="질문하기">
            <SiAskubuntu
              size={50}
              id="btn-ask"
              title="질문하기"
              onClick={() => Ask(ASKContent.current.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
};
