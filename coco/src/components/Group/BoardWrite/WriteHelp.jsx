import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WriteGuel.css";
import Button from "react-bootstrap/Button";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftjsToHtml from "draftjs-to-html";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";
import { useAppSelector } from "../../../app/store";
import { API } from "api/config";
import Swal from "sweetalert2";
const axios = require("axios")

export const WriteHelp = ({ title, room_id }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [htmlString, setHtmlString] = useState("");
  const [code, setCode] = useState(""); //작성한 코드
  const userInfo = useAppSelector((state) => state.loginState);
  const navigate = useNavigate();

  const updateTextDescription = async (state) => {
    await setEditorState(state);
    const html = draftjsToHtml(convertToRaw(editorState.getCurrentContent()));
    setHtmlString(html);
  };

  const uploadCallback = () => {
    console.log("이미지 업로드");
  };

  const onSubmitHandler = () => {
    if (title === "" || htmlString === "") {
      return Swal.fire({ icon: "warning", title: "완전히 입력해주세요" });
    } else {
      axios
        .post(
          API.ROOMQUESTION,
          {
            room_id: room_id,
            title: title,
            question: htmlString,
            code: code,
          },
          {
            headers: { Authorization: "Bearer " + userInfo.access_token },
          }
        )
        .then(function (response) {
          if (response.data.code) {
            Swal.fire({ icon: "success", title: `${title} 업로드 성공` }).then(
              (res) => {
                if (res.isConfirmed) {
                  navigate(`/room/${room_id}`);
                }
              }
            );
          } else {
            Swal.fire({
              icon: "error",
              title: "ERROR - SERVER COMMUNICATION FAILED",
            });
          }
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "ERROR - SERVER IDENTIFICATION FAILED",
          });
        });
    }
  };

  return (
    <div className="freeWrite">
      <div className="helpWrite">
        <div>
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
              image: { uploadCallback: uploadCallback },
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
              border: "2px solid lightgray",

              padding: "15px",
              fontFamily: "Pretendard-Regular",
            }}
          />
        </div>
        <div style={{ border: "2px solid lightgray" }}>
          <CodeMirror
            width="30vw"
            value="print('hello')"
            extensions={[python(), cpp()]}
            onChange={(value) => {
              setCode(value);
            }}
          />
        </div>
      </div>

      <Button variant="outline-info" id="submitFree" onClick={onSubmitHandler}>
        Submit
      </Button>
    </div>
  );
};
