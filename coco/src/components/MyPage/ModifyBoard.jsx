import React, { Suspense, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../Home/Footer";
import { Header } from "../Home/Header";
import fetchData from "../../api/fetchTask";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import { GoPencil } from "react-icons/go";
import Form from "react-bootstrap/Form";
import { useAppSelector } from "../../app/store";
import Swal from "sweetalert2";
import { API } from "api/config";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";
import axios from "axios";

export const ModifyBoard = () => {
  const path = decodeURI(window.location.pathname).split("/");
  return (
    <>
      <Header />
      <Suspense fallback={<Spinner />}>
        <GetBoardDetail
          resource={fetchData(API.BOARD + path.at(-1))}
          key={path.at(-1)}
        />
      </Suspense>
      <Footer />
    </>
  );
};

const GetBoardDetail = ({ resource, key }) => {
  const detail = resource.read();
  return (
    <>
      <div className="modify_board">
        <div className="modify_head">
          <GoPencil size={30} />
          <h2>글쓰기</h2>
        </div>
        {/* {detail.cateogry == 2 ? (
          <Update
            boardId={detail.id}
            title={detail.title}
            contents={detail.context}
            cateogry={2}
          />
        ) : (
          <Update
            boardId={detail.id}
            title={detail.title}
            contents={detail.context}
            category={detail.category}
          />
        )} */}
        <Update
          boardId={detail.id}
          title={detail.title}
          contents={detail.context}
          category={detail.category}
          helpCode={detail.code}
        />
      </div>
    </>
  );
};

const Update = ({ boardId, title, contents, category, helpCode }) => {
  console.log(boardId, title, contents, category, helpCode);
  const [code, setCode] = useState(helpCode); //작성한 코드
  const [quillValue, setquillValue] = useState(contents); // 메인 설명 html State !필수
  const quillRef = useRef(); // quill editor에 접근하기 위한 ref
  const userInfo = useAppSelector((state) => state.loginState); //로컬스토리지에 저장된 유저 정보 접근
  const navigate = useNavigate();
  const [newTitle, setNewTitle] = useState(`${title}`); // 제목

  const onTitleHandler = (e) => {
    setNewTitle(e.currentTarget.value);
  };

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
    if (newTitle === "" || quillValue === "") {
      return Swal.fire({ icon: "error", title: "완전히 입력해주세요." });
    } else {
      axios
        .put(
          API.BOARD + "update-board",
          {
            board_id: boardId,
            title: newTitle,
            context: quillValue,
            category: category,
            code: code,
          },
          {
            headers: { Authorization: "Bearer " + userInfo.access_token },
          }
        )
        .then(function (response) {
          Swal.fire({
            icon: "success",
            title: `${title} 업로드 성공`,
            showConfirmButton: false,
            timer: 1000,
          });
          setTimeout(() => navigate(`/board/${response.data.id}`), 1000);
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "Server Error - Identification Failed",
          });
        });
    }
  };

  return (
    <>
      <div className="modify_title">
        <Form.Control
          as="textarea"
          style={{ height: "40px" }}
          placeholder={newTitle}
          onChange={onTitleHandler}
        />
      </div>

      <div className="modify_content">
        <ReactQuill
          style={{ height: "480px" }}
          theme="snow"
          value={quillValue}
          modules={quill_module}
          onChange={setquillValue}
          ref={quillRef}
          placeholder={"내용을 작성해주세요"}
        />
        {category === 2 ? (
          <div className="helpCode">
            <CodeMirror
              value={code}
              extensions={[python(), cpp()]}
              onChange={(value) => {
                setCode(value);
              }}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
      <Button
        variant="outline-secondary"
        id="m-submit_btn"
        onClick={onSubmitHandler}
        className="modify_board_btn"
      >
        SUBMIT
      </Button>
    </>
  );
};
