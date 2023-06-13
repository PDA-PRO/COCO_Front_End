import "../Manage.css";
import React, { useState, Suspense } from "react";
import Button from "react-bootstrap/Button";
import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  ContentState,
} from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftjsToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import axios from "axios";
import { useAppSelector } from "../../../app/store";
import Spinner from "react-bootstrap/esm/Spinner";
import fetchData from "../../../api/fetchTask";

export const Notice = () => {
  return (
    <>
      <h2 className="mTi">NOTICE</h2>
      <div className="m-upload">
        <Suspense fallback={<Spinner />}>
          <GetNotice
            resource={fetchData("http://127.0.0.1:8000/manage/notice")}
          />
        </Suspense>
      </div>
    </>
  );
};

const GetNotice = ({ resource }) => {
  const notice = resource.read();
  const initPlaceholder = <div dangerouslySetInnerHTML={{ __html: notice }} />;
  const userInfo = useAppSelector((state) => state.loginState);
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(
      ContentState.createFromBlockArray(htmlToDraft(notice).contentBlocks)
    )
  );
  const [htmlString, setHtmlString] = useState("");

  const updateTextDescription = async (state) => {
    await setEditorState(state);
    const html = draftjsToHtml(convertToRaw(editorState.getCurrentContent()));
    setHtmlString(html);
  };

  const uploadCallback = (imagefile) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          "http://localhost:8000/image/upload-temp",
          {
            file: imagefile, // 파일
          },
          {
            headers: {
              "Content-Type": `multipart/form-data; `,
              Authorization: "Bearer " + userInfo.access_token,
            },
            params: {
              type: 1,
            },
          }
        )
        .then((res) => {
          resolve(res);
        })
        .catch(reject);
    })
      .then((res) => {
        return { data: { link: res.data } };
      })
      .catch(() => {
        return { data: { link: "이미지 업로드 실패" } };
      });
  };

  const onSubmitHandler = () => {
    axios
      .post("http://127.0.0.1:8000/manage/notice/", {
        entity: convertToRaw(editorState.getCurrentContent()).entityMap,
        html: htmlString,
      })
      .then(function (res) {
        console.log("response: ", res);
      })
      .catch(() => {
        alert("인증실패");
      });
  };

  return (
    <>
      <Editor
        placeholder={"내용을 작성해주세요."}
        editorState={editorState}
        onEditorStateChange={updateTextDescription}
        toolbar={{
          options: [
            "inline",
            "blockType",
            "fontSize",
            "fontFamily",
            "list",
            "textAlign",
            "colorPicker",
            "link",
            "emoji",
            "image",
            "remove",
            "history",
          ],
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
          image: {
            uploadCallback: uploadCallback,
            previewImage: true,
          },
          fontFamily: {
            options: [
              "GmarketSansMedium",
              "Pretendard-Regular",
              "Impact",
              "Open Sans",
              "Roboto",
              "Tahoma",
              "Times New Roman",
              "Verdana",
            ],
          },
        }}
        localization={{ locale: "ko" }}
        editorStyle={{
          height: "480px",
          width: "100%",
          border: "3px solid lightgray",
          padding: "20px",
          fontFamily: "Pretendard-Regular",
        }}
      />
      <div className="notice_result">
        <div dangerouslySetInnerHTML={{ __html: htmlString }} />
      </div>
      <Button
        variant="outline-secondary"
        id="m-submit_btn"
        onClick={onSubmitHandler}
      >
        SUBMIT
      </Button>
    </>
  );
};
