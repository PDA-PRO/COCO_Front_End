import React, { useState } from "react";
import "./WriteGuel.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftjsToHtml from "draftjs-to-html";
import axios from "axios";
import { useAppSelector } from "../../../app/store";

export const Free = ({ title }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [htmlString, setHtmlString] = useState("");
  const userInfo = useAppSelector((state) => state.loginState);

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
              type: 2,
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

  const onSubmit = () => {
    console.log(title);
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
  };
  return (
    <div className="freeWrite">
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
          image: { uploadCallback: uploadCallback, previewImage: true },
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
      <Button variant="outline-info" id="submitFree" onClick={onSubmit}>
        Submit
      </Button>
    </div>
  );
};
