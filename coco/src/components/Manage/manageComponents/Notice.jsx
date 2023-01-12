import "../Manage.css";
import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

import styled from "styled-components";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftjsToHtml from "draftjs-to-html";
import axios from "axios";
import { useAppSelector } from "../../../app/store";

const Container = styled.div`
  width: 100%;
`;


// const Viewer = styled.div`
//   height: 400px;
//   padding: 20px;
//   margin-top: 20px;
//   border: 2px solid gray;
// `;


export const Notice = () => {
  const userInfo = useAppSelector((state) => state.loginState);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [htmlString, setHtmlString] = useState("");

  const updateTextDescription = async (state) => {
    await setEditorState(state);
    const html = draftjsToHtml(convertToRaw(editorState.getCurrentContent()));
    setHtmlString(html);
  };

  const uploadCallback = () => {
    console.log("이미지 업로드");
  };

  const onSubmitHandler = () => {
    console.log(htmlString);
    axios
    .post(
      "http://127.0.0.1:8000/manage/notice/",
      {
        data: htmlString
      },
      {
        headers: { Authorization: "Bearer " + userInfo.access_token },
        params: {
          data: htmlString
        },
      }
    )
    .then(function (res) {
      console.log('response: ', res);
    })
    .catch(() => {
      alert("인증실패");
    });
  }

  return (
    <>
      <h2 className="mTi">NOTICE</h2>
      <div className="m-upload">
        {/* <InputGroup style={{ height: "550px" }}>
          <InputGroup.Text>수정</InputGroup.Text>
          <Form.Control as="textarea" placeholder="1." />
        </InputGroup> */}
        <Editor
          placeholder="게시글을 작성해주세요"
          editorState={editorState}
          onEditorStateChange={updateTextDescription}
          toolbar={{
            image: { uploadCallback: uploadCallback },
          }}
          localization={{ locale: "ko" }}
          editorStyle={{
            height: "300px",
            width: "100%",
            border: "3px solid lightgray",
            padding: "20px",
          }}
        />
      <div className="notice_result">
        <div dangerouslySetInnerHTML={{ __html: htmlString }} />
      </div>
        <Button variant="outline-secondary" id="m-submit_btn" onClick={onSubmitHandler}>
          SUBMIT
        </Button>
      </div>
    </>
  );
};


