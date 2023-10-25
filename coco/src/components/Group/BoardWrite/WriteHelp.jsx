import React, { useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./WriteGuel.css";
import Button from "react-bootstrap/Button";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";
import { useAppSelector } from "../../../app/store";
import { API } from "api/config";
import Swal from "sweetalert2";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Quill from "quill";
import ImageResize from "@looop/quill-image-resize-module-react";

Quill.register("modules/imageResize", ImageResize);

export const WriteHelp = ({ title, room_id }) => {
  const [code, setCode] = useState(""); //작성한 코드
  const userInfo = useAppSelector((state) => state.loginState);
  const navigate = useNavigate();
  const [quillValue, setquillValue] = useState(""); // 메인 설명 html State !필수
  const quillRef = useRef(); // quill editor에 접근하기 위한 ref


  const imageHandler = () => {
    // 1. 이미지를 저장할 input type=file DOM을 만든다.
    const input = document.createElement("input");

    // 속성 써주기
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click(); // 에디터 이미지버튼을 클릭하면 이 input이 클릭된다.
    // input이 클릭되면 파일 선택창이 나타난다.

    // input에 변화가 생긴다면 = 이미지를 선택
    input.addEventListener("change", async () => {
      const file = input.files[0];
      const editor = quillRef.current.getEditor(); // 에디터 객체 가져오기
      //현재 에디터 커서 위치값을 가져온다
      const range = editor.getSelection();
      axios
        .post(
          API.IMAGEUPLOAD,
          {
            file: file, // 파일
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
          const IMG_URL = res.data;
          // 가져온 위치에 이미지를 삽입한다
          editor.insertEmbed(range.index, "image", IMG_URL);
          //커서를 한칸 뒤로 이동
          editor.setSelection(range.index + 1);
        })
        .catch(() => {
          //오류시에 안내 메시지를 삽입
          editor.insertText(range.index, "이미지 업로드에 실패했습니다", {
            color: "#ff0000",
            bold: true,
          });
        });
    });
  };
  //userMemo를 써야 오류가 안난다.
  const quill_module = useMemo(() => {
    return {
      toolbar: {
        container: [
          [
            { size: ["small", false, "large", "huge"] },
            { header: [1, 2, 3, 4, 5, 6, false] },
          ], // custom dropdown
          ["bold", "underline", "link", "image"], // toggled buttons

          [{ list: "ordered" }, { list: "bullet" }],
          [{ script: "super" }], // superscript

          [{ color: [] }], // dropdown with defaults from theme
          [{ align: [] }],

          ["clean"],
        ],
        handlers: {
          // 이미지 처리는 imageHandler로 처리
          image: imageHandler,
        },
      },
      imageResize: {
        modules: ["Resize", "DisplaySize"],
      },
    };
  }, []);

  const onSubmitHandler = () => {
    if (title === "" || quillValue === "") {
      return Swal.fire({ icon: "warning", title: "완전히 입력해주세요" });
    } else {
      axios
        .post(
          API.ROOMQUESTION,
          {
            room_id: room_id,
            title: title,
            question: quillValue,
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
        <div className="helpContent">
          <ReactQuill
            theme="snow"
            value={quillValue}
            modules={quill_module}
            onChange={setquillValue}
            ref={quillRef}
            placeholder={"내용을 작성해주세요"}
          />
        </div>
        <div className="helpCode">
          <CodeMirror
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
