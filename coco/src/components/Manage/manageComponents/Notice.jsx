import "../Manage.css";
import React, { useState, useMemo, useRef, Suspense } from "react";
import Button from "react-bootstrap/Button";
import { useAppSelector } from "../../../app/store";
import Spinner from "react-bootstrap/esm/Spinner";
import fetchData from "../../../api/fetchTask";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { API } from "api/config";
import Swal from "sweetalert2";
import axios from "axios";

export const Notice = () => {
  return (
    <>
      <h2 className="mTi">NOTICE</h2>
      <div className="m-upload">
        <Suspense fallback={<Spinner />}>
          <GetNotice resource={fetchData(API.NOTICE)} />
        </Suspense>
      </div>
    </>
  );
};

const GetNotice = ({ resource }) => {
  const notice = resource.read();
  const [quillValue, setquillValue] = useState(notice); // 메인 설명 html State !필수
  const quillRef = useRef(); // quill editor에 접근하기 위한 ref
  const userInfo = useAppSelector((state) => state.loginState); //로컬스토리지에 저장된 유저 정보 접근

  // --------------------------- quill editor 관련 함수 ----------------------
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
          API.IMAGE,
          {
            file: file, // 파일
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
    axios
      .put(
        API.NOTICE,
        {
          content: quillValue,
        },
        {
          headers: { Authorization: "Bearer " + userInfo.access_token },
        }
      )
      .then(function (res) {
        Swal.fire({ icon: "success", title: "공지 업데이트를 성공했습니다." });
      })
      .catch((res) => {
        Swal.fire({
          icon: "error",
          title: "Server Error - Identification Failed",
        });
      });
  };

  return (
    <>
      <ReactQuill
        theme="snow"
        value={quillValue}
        modules={quill_module}
        onChange={setquillValue}
        ref={quillRef}
        placeholder={"문제의 메인 설명 입력"}
        style={{ height: "480px", marginBottom: "50px" }}
      />
      <div className="notice_result">
        <div dangerouslySetInnerHTML={{ __html: quillValue }} />
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
