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
import axiosInstance from "api/axiosWithPathParameter";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const WriteHelp = ({ title, room_id }) => {
  const [code, setCode] = useState(""); //작성한 코드
  const userInfo = useAppSelector((state) => state.loginState);
  const navigate = useNavigate();
  const [quillValue, setquillValue] = useState(""); // 메인 설명 html State !필수
  const quillRef = useRef(); // quill editor에 접근하기 위한 ref

  const quill_module = useMemo(() => {
    return {
      toolbar: {
        container: [
          [
            { size: ["small", false, "large", "huge"] },
            { header: [1, 2, 3, 4, 5, 6, false] },
          ], // custom dropdown
          ["bold", "underline", "link"], // toggled buttons

          [{ list: "ordered" }, { list: "bullet" }],
          [{ script: "super" }], // superscript

          [{ color: [] }], // dropdown with defaults from theme
          [{ align: [] }],

          ["clean"],
        ],
      },
    };
  }, []);

  const onSubmitHandler = () => {
    if (title === "" || quillValue === "") {
      return Swal.fire({ icon: "warning", title: "완전히 입력해주세요" });
    } else {
      axiosInstance
        .post(
          API.ROOMQUESTION,
          {
            title: title,
            question: quillValue,
            code: code,
          },
          {
            headers: { Authorization: "Bearer " + userInfo.access_token },
            urlParams: { room_id: room_id },
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
