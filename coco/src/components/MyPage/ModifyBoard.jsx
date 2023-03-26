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
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useAppSelector } from "../../app/store";

export const ModifyBoard = () => {
  var path = window.location.pathname;
  path = path.split("/");
  return (
    <>
      <Header />
      <Suspense fallback={<Spinner />}>
        <GetBoardDetail
          resource={fetchData(`http://127.0.0.1:8000/board/${path.at(-1)}`)}
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
          <Update boardId = {detail.id} title={detail.title} contents={detail.context} cateogry={2} />
        ) : (
          <Update
          boardId = {detail.id} 
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
      return alert("완전히 입력해주세요.");
    } else {
      axios
        .post(
          "http://127.0.0.1:8000/update_board/",
          {
            board_id: boardId,
            user_id: userInfo.id,
            title: newTitle,
            context: htmlString,
            category: category
          },
          {
            headers: { Authorization: "Bearer " + userInfo.access_token },
          }
        )
        .then(function (response) {
          if (response.data.code === 1) {
            alert(`${newTitle} 업로드 성공`);
            window.location.replace(`/mypage/${userInfo.id}`);
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