import React from "react";
import { useState, useMemo, useRef, useEffect } from "react";
import { useAppSelector } from "../../app/store";
import { AiOutlineClose } from "react-icons/ai";
import Swal from "sweetalert2";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import CodeMirror from "@uiw/react-codemirror";
import axios from "axios";
import { API } from "api/config";

import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";
import { FiArrowUpRight } from "react-icons/fi";
// import Modal from "@mui/material/Modal";

// Modal 여기있는데 Mui Modal로 변경

export const AIqa = () => {
  const [isShowingModal, toggleModal] = useModal();

  return (
    <>
      <div className="aiQA" onClick={toggleModal}>
        <img src="./image/chat.png" />
        <p>AI에게 질문하기</p>
      </div>

      <Modal show={isShowingModal} onCloseButtonClick={toggleModal} />
    </>
  );
};

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    setIsShowing(!isShowing);
  }

  return [isShowing, toggle];
};

const Modal = ({ show, onCloseButtonClick }) => {
  const userInfo = useAppSelector((state) => state.loginState);
  const ASKContent = useRef();
  const [code, setCode] = useState(""); //작성한 코드

  const [answer, setAnswer] = useState(false);
  const [answerContent, setAnswerContent] = useState("");
  const [answerCode, setAnswerCode] = useState("");

  function makeNoLine(arr) {
    if (arr.length == 0) {
      return "";
    } else {
      var dataArray = arr.split("\n");

      var numberedData = dataArray
        .map((item, index) => {
          return `${index + 1}@${item}`;
        })
        .join("\n");

      const strings = numberedData.split("\n").map((str) => {
        const [num, val] = str.split("@");
        return (
          <div className="codeLine">
            <n className="codeNum">{num}.</n>
            <n className="codeTxt">{val}</n>
          </div>
        );
      });
      return strings;
    }
  }

  const QforAI = (content, code, id) => {
    Swal.fire({
      icon: "question",
      title: content + `<pre class="swalCode">${code}</pre>` + "\n",

      showCancelButton: true,
      confirmButtonText: "TRY",
      footer: "시간이 다소 소요될 수 있습니다.",
    }).then((result) => {
      if (result.isConfirmed) {
        //여기에 axios 호출
        Swal.fire({
          icon: "info",
          title: "AI가 답변을 생성하고 있습니다.",
          showConfirmButton: false,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            axios
              .post(
                "http://localhost:8000/",
                {
                  content: content,
                  code: code,
                  id: id, // 작성자 id, 동시에 여러명 사용 시 구분 지을 필요
                },
                {
                  headers: {
                    Authorization: "Bearer " + userInfo.access_token,
                  },
                }
              )
              .then((res) => {
                if (res.data === true) {
                  Swal.fire({
                    icon: "success",
                    title: "AI로부터 답변이 등록되었습니다.",
                    timer: 1000,
                    showConfirmButton: false,
                  }).then((res) => {
                    setAnswer(true);
                    setAnswerContent(res.content);
                    setAnswerCode(res.code);
                  });
                }
              })
              .catch(() => {
                Swal.fire({
                  icon: "error",
                  title: "답변 생성 ai를 사용할 수 없습니다.",
                });
              });
          },
        });
      }
    });
  };

  if (!show) {
    return null;
  } else {
    return (
      <div className="modal-wrapper">
        <div className="modal">
          <div className="modalTop">
            <h2>AI에게 질문하기</h2>
            <p onClick={onCloseButtonClick} style={{ cursor: "pointer" }}>
              <AiOutlineClose size={25} title="닫기" color="red" />
            </p>
          </div>

          <InputGroup className="m-input">
            <InputGroup.Text
              id="inputGroup-sizing-default"
              style={{ backgroundColor: "transparent" }}
            >
              {/* <BsArrowDownRight size={30} /> */}
              <img src="/image/chatbot.png" width="30px"></img>
            </InputGroup.Text>
            <Form.Control
              ref={ASKContent}
              placeholder="질문을 입력해주세요"
              as="textarea"
              style={{ minHeight: "100px" }}
              // defaultValue={
              //   codeCheck === true
              //     ? template + " Python으로 예제 정답 코드도 같이 만들어줘"
              //     : template
              // }
              // key={
              //   codeCheck === true
              //     ? template + " Python으로 예제 정답 코드도 같이 만들어줘"
              //     : template
              // }
            />
          </InputGroup>

          <CodeMirror
            value="print('hello')"
            extensions={[python(), cpp()]}
            onChange={(value) => {
              setCode(value);
            }}
            maxHeight="250px"
          />

          <div
            className="qTo"
            onClick={() => QforAI(ASKContent.current.value, code, userInfo.id)}
          >
            <p>질문하기</p>
            <FiArrowUpRight color="navy" size={25} />
          </div>
          {answer === true ? (
            <>
              <hr />{" "}
              <div className="Aianswer">
                <h4>답변 내용</h4>
                <div
                  className="AianswerContent"
                  dangerouslySetInnerHTML={{
                    __html: answerContent,
                  }}
                ></div>
                {answerCode.length !== 0 ? (
                  <>
                    <h4>CODE</h4>
                    <pre className="R-Code">{makeNoLine(`print("hello")`)}</pre>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  }
};

// const ModalGPT = ({ isOpen, onSubmit, onCancel }) => {
//   const bg = {
//     overlay: {
//       background: "rgba(80,80,80,0.3)",
//     },
//   };

//   const ASKContent = useRef();

//   return (
//     <ReactModal isOpen={isOpen} style={bg} shouldCloseOnOverlayClick={false}>
//       <div className="modalTop">
//         <h2>AI Q&amp;A</h2>
//         <p onClick={() => onCancel()} style={{ cursor: "pointer" }}>
//           <AiOutlineClose size={30} />
//         </p>
//       </div>
//       <div className="modalBody"></div>
//       <div className="modalBottom">
//         <p onClick={() => onSubmit()}>질문하기</p>
//       </div>
//     </ReactModal>
//   );
// };
