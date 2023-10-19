import React, { Suspense, useState } from "react";
import { Footer } from "../Home/Footer";
import { Header } from "../Home/Header";
import fetchData from "../../api/fetchTask";
import Spinner from "react-bootstrap/Spinner";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftjsToHtml from "draftjs-to-html";
import Button from "react-bootstrap/Button";
import { GoPencil } from "react-icons/go";
import Form from "react-bootstrap/Form";
import { useAppSelector } from "../../app/store";
import Swal from "sweetalert2";
import { API } from "api/config";
const axios = require("axios")

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

const GetBoardDetail = ({ resource }) => {
  const detail = resource.read();
  return (
    <>
      <div className="modify_board">
        <div className="modify_head">
          <GoPencil size={30} />
          <h2>글쓰기</h2>
        </div>
        {detail.cateogry == 2 ? (
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
        )}
      </div>
    </>
  );
};

const Update = ({ boardId, title, contents, category }) => {
  console.log(category);
  const [newTitle, setNewTitle] = useState(`${title}`); // 제목
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [htmlString, setHtmlString] = useState(""); //바뀔 내용(html로 저장)
  const userInfo = useAppSelector((state) => state.loginState);

  //수정할 글
  const before = <div dangerouslySetInnerHTML={{ __html: contents }} />;

  const onTitleHandler = (e) => {
    setNewTitle(e.currentTarget.value);
  };

  const updateTextDescription = async (state) => {
    await setEditorState(state);
    const html = draftjsToHtml(convertToRaw(editorState.getCurrentContent()));
    setHtmlString(html);
  };

  const uploadCallback = () => {
    console.log("이미지 업로드");
  };

  const onSubmitHandler = () => {
    console.log(category);
    if (newTitle === "" || htmlString === "<p></p>" || htmlString === "") {
      return Swal.fire({
        icon: "error",
        title: "입력이 완전하지 않습니다.",
      });
    } else {
      axios
        .post(
          API.BOARD,
          {
            board_id: boardId,
            user_id: userInfo.id,
            title: newTitle,
            context: htmlString,
            category: category,
          },
          {
            headers: { Authorization: "Bearer " + userInfo.access_token },
          }
        )
        .then(function (response) {
          if (response.data.code === 1) {
            Swal.fire({
              icon: "success",
              title: `${newTitle}가 수정되어 업로드되었습니다.`,
            });

            window.location.replace(`/mypage/${userInfo.id}`);
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
            title: "ERROR - SERVER COMMUNICATION FAILED",
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
        <Editor
          placeholder={before}
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
            border: "3px solid lightgray",
            padding: "20px",
            fontFamily: "Pretendard-Regular",
          }}
        />
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
