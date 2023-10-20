import React from "react";
import { useState, useMemo, useRef, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Swal from "sweetalert2";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import CodeMirror from "@uiw/react-codemirror";
import axios from "axios";
import { API } from "api/config";

// Modal 여기있는데 Mui Modal로 변경

export const AIqa = () => {
  var [Open, setIsOpen] = useState(false);

  // ReactModal.setAppElement(document.getElementById("modalParent"));

  const handleSubmit = () => {
    setIsOpen(false);
  };

  const handleCancel = () => setIsOpen(false);

  console.log(Open);

  return (
    <div className="aiQA" onClick={() => setIsOpen(!Open)}>
      <img src="./image/chat.png" />
      <p>AI에게 질문하기</p>
      {/* <ModalGPT isOpen={Open} onSubmit={handleSubmit} onCancel={handleCancel} /> */}
    </div>
  );
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
//       <div className="modalBody">
//         <InputGroup className="m-input">
//           <InputGroup.Text
//             id="inputGroup-sizing-default"
//             style={{ backgroundColor: "transparent" }}
//           >
//             {/* <BsArrowDownRight size={30} /> */}
//             <img src="/image/chatbot.png" width="30px"></img>
//           </InputGroup.Text>
//           <Form.Control
//             ref={ASKContent}
//             // placeholder="ex) 문제에 입출력예시, 테스트 케이스(최소 20개), 메모리제한, 시간제한이 있는 조건문 알고리즘 문제 만들어줘"
//             as="textarea"
//             style={{ minHeight: "100px" }}
//             // defaultValue={
//             //   codeCheck === true
//             //     ? template + " Python으로 예제 정답 코드도 같이 만들어줘"
//             //     : template
//             // }
//             // key={
//             //   codeCheck === true
//             //     ? template + " Python으로 예제 정답 코드도 같이 만들어줘"
//             //     : template
//             // }
//           />
//         </InputGroup>
//       </div>
//       <div className="modalBottom">
//         <p onClick={() => onSubmit()}>질문하기</p>
//       </div>
//     </ReactModal>
//   );
// };
