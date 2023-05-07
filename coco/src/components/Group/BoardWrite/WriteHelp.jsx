import React, { useState } from "react";
import "./WriteGuel.css";
import Button from "react-bootstrap/Button";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftjsToHtml from "draftjs-to-html";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";
import axios from "axios";
import { useAppSelector } from "../../../app/store";

export const WriteHelp = ({ title, group_id }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [htmlString, setHtmlString] = useState("");
  const [code, setCode] = useState(""); //작성한 코드
  const userInfo = useAppSelector((state) => state.loginState);

  const updateTextDescription = async (state) => {
    await setEditorState(state);
    const html = draftjsToHtml(convertToRaw(editorState.getCurrentContent()));
    setHtmlString(html);
  };

  const uploadCallback = () => {
    console.log("이미지 업로드");
  };

  const onSubmitHandler = () => {
    console.log(code);
    console.log(htmlString);
    if (title === "" || htmlString === "") {
      return alert("완전히 입력해주세요");
    } else {
      axios
        .post(
          "http://127.0.0.1:8000/write_board/",
          {
            user_id: userInfo.id,
            title: title,
            context: htmlString,
            category: 2,
            code: code,
            group_id: group_id
          },
          {
            headers: { Authorization: "Bearer " + userInfo.access_token },
          }
        )
        .then(function (response) {
          if (response.data.code === 1) {
            alert(`${title} 업로드 성공`);
            window.location.replace(`/group/board/${group_id}`);
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