import React, { Suspense, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../Home/Footer";
import { Header } from "../Home/Header";
import fetchData from "../../api/fetchTask";
import Spinner from "react-bootstrap/Spinner";
// import { Editor } from "react-draft-wysiwyg";
// import { EditorState, convertToRaw } from "draft-js";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import draftjsToHtml from "draftjs-to-html";
import Button from "react-bootstrap/Button";
import { GoPencil } from "react-icons/go";
import Form from "react-bootstrap/Form";
import { useAppSelector } from "../../app/store";
import Swal from "sweetalert2";
import { API } from "api/config";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Quill from "quill";
import ImageResize from "@looop/quill-image-resize-module-react";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";
import axios from "axios";

Quill.register("modules/imageResize", ImageResize);

export const ModifyBoard = () => {
  var path = window.location.pathname;
  path = path.split("/");
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
            oldTitle={detail.title}
            contents={detail.context}
            category={detail.category}
            helpCode={detail.code}
          />
      </div>
    </>
  );
};

const Update = ({ boardId, title, contents, category, helpCode }) => {
  // console.log(boardId, title, contents, category, helpCode)
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
          API.BOARD+'update-board',
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
//   const [newTitle, setNewTitle] = useState(`${title}`); // 제목

// const Update = ({ boardId, title, contents, category }) => {
//   console.log(category);
//   const [newTitle, setNewTitle] = useState(`${title}`); // 제목
//   const [editorState, setEditorState] = useState(EditorState.createEmpty());
//   const [htmlString, setHtmlString] = useState(""); //바뀔 내용(html로 저장)
//   const userInfo = useAppSelector((state) => state.loginState);

//   //수정할 글
//   const before = <div dangerouslySetInnerHTML={{ __html: contents }} />;

//   const onTitleHandler = (e) => {
//     setNewTitle(e.currentTarget.value);
//   };

//   const updateTextDescription = async (state) => {
//     await setEditorState(state);
//     const html = draftjsToHtml(convertToRaw(editorState.getCurrentContent()));
//     setHtmlString(html);
//   };

//   const uploadCallback = () => {
//     console.log("이미지 업로드");
//   };

//   const onSubmitHandler = () => {
//     console.log(category);
//     if (newTitle === "" || htmlString === "<p></p>" || htmlString === "") {
//       return Swal.fire({
//         icon: "error",
//         title: "입력이 완전하지 않습니다.",
//       });
//     } else {
//       axios
//         .post(
//           API.BOARD,
//           {
//             board_id: boardId,
//             user_id: userInfo.id,
//             title: newTitle,
//             context: htmlString,
//             category: category,
//           },
//           {
//             headers: { Authorization: "Bearer " + userInfo.access_token },
//           }
//         )
//         .then(function (response) {
//           if (response.data.code === 1) {
//             Swal.fire({
//               icon: "success",
//               title: `${newTitle}가 수정되어 업로드되었습니다.`,
//             });

//             window.location.replace(`/mypage/${userInfo.id}`);
//           } else {
//             Swal.fire({
//               icon: "error",
//               title: "ERROR - SERVER COMMUNICATION FAILED",
//             });
//           }
//         })
//         .catch(() => {
//           Swal.fire({
//             icon: "error",
//             title: "ERROR - SERVER COMMUNICATION FAILED",
//           });
//         });
//     }
//   };
//   return (
//     <>
//       <div className="modify_title">
//         <Form.Control
//           as="textarea"
//           style={{ height: "40px" }}
//           placeholder={newTitle}
//           onChange={onTitleHandler}
//         />
//       </div>

//       <div className="modify_content">
//         <Editor
//           placeholder={before}
//           editorState={editorState}
//           onEditorStateChange={updateTextDescription}
//           toolbar={{
//             options: [
//               "inline",
//               "blockType",
//               "fontSize",
//               "fontFamily",
//               "list",
//               "textAlign",
//               "colorPicker",
//               "link",
//               "emoji",
//               "image",
//               "remove",
//               "history",
//             ],
//             inline: { inDropdown: true },
//             list: { inDropdown: true },
//             textAlign: { inDropdown: true },
//             link: { inDropdown: true },
//             history: { inDropdown: true },
//             image: { uploadCallback: uploadCallback },
//             fontFamily: {
//               options: [
//                 "GmarketSansMedium",
//                 "Pretendard-Regular",
//                 "Impact",
//                 "Open Sans",
//                 "Roboto",
//                 "Tahoma",
//                 "Times New Roman",
//                 "Verdana",
//               ],
//             },
//           }}
//           localization={{ locale: "ko" }}
//           editorStyle={{
//             height: "480px",
//             width: "100%",
//             border: "3px solid lightgray",
//             padding: "20px",
//             fontFamily: "Pretendard-Regular",
//           }}
//         />
//       </div>
//       <Button
//         variant="outline-secondary"
//         id="m-submit_btn"
//         onClick={onSubmitHandler}
//         className="modify_board_btn"
//       >
//         SUBMIT
//       </Button>
//     </>
//   );
// };
