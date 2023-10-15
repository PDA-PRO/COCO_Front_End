import "../Manage.css";
import React from "react";
import { useState, useMemo, useRef, useEffect } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import {
  BsArrowDownRight,
  BsArrowUpLeft,
  BsUiChecksGrid,
  BsFileEarmarkZip,
} from "react-icons/bs";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import axios from "axios";
import { useAppSelector } from "../../../app/store";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Quill from "quill";
import ImageResize from "@looop/quill-image-resize-module-react";
import CreatableSelect from "react-select/creatable";
import JSZip from "jszip";
import { API } from "api/config";
import { SiAskubuntu } from "react-icons/si";
import Swal from "sweetalert2";
import { Suspense } from "react";

export const AITask = () => {
  const [sendAsk, setSendAsk] = useState("");
  const [json, setJson] = useState({});
  const [isAI, setIsAI] = useState(false);
  const ASKContent = useRef();
  const Ask = (e) => {
    if (e === "") {
      Swal.fire({
        icon: "error",
        title: "질문의 내용을 입력해주세요",
      });
    } else {
      setSendAsk(e);
      Swal.fire({
        icon: "question",
        title: "AI가 문제를 생성중입니다.",
        showConfirmButton: false,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          axios
            .post(API.AI + "/create-task", {
              content: e,
              is_final: false,
            })
            .then((res) => {
              if (res.data.data == true) {
                setIsAI(true);
                setJson(res.data.result);
                Swal.fire({
                  icon: "success",
                  title:
                    "AI가 답변을 생성했습니다. \n 수정해야할 부분을 수정하고 업로드하세요!",
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: "SERVER ERROR",
                  timer: 1000,
                  showConfirmButton: false,
                });
              }
            });
        },
      });
    }
  };

  return (
    <>
      <h2 className="mTi">AI TASK UPLOAD</h2>
      <div className="m-upload">
        <div className="howToUse">
          <h4>Before You Use</h4>
          <p>1. 생성하고자 하는 문제에 대해 AI에게 요청</p>
          <p>2. AI가 생성한 문제를 관리자가 확인 후, 업로드</p>
          <p>3. 문제의 난이도, 카테고리는 문제 업로드하는 관리자가 직접 선정</p>
          <p>
            4. AI에게 요청하는 질문의 형식을 주어진대로 맞춰서 입력해야 답변
            결과의 품질이 상승합니다.
          </p>
        </div>

        <div className="AskToAI">
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
              placeholder="ex) 문제에 입출력예시, 테스트 케이스(최소 20개), 메모리제한, 시간제한이 있는 조건문 알고리즘 문제 만들어줘"
              as="textarea"
              style={{ minHeight: "120px" }}
            />
          </InputGroup>

          <div className="askbtn" title="질문하기">
            <SiAskubuntu
              size={50}
              id="btn-ask"
              title="질문하기"
              onClick={() => Ask(ASKContent.current.value)}
            />
          </div>
          {isAI === true ? (
            <TaskReturn reAsk={Ask} askContent={sendAsk} json={json} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

const TaskReturn = ({ reAsk, askContent, json }) => {
  const userInfo = useAppSelector((state) => state.loginState); //로컬스토리지에 저장된 유저 정보 접근
  const titleRef = useRef();

  const diffRef = useRef();
  const timeRef = useRef();
  const memRef = useRef();

  const inputDescRef = useRef();
  const inputEx1Ref = useRef();
  const inputEx2Ref = useRef();

  const outputDescRef = useRef();
  const outputEx1Ref = useRef();
  const outputEx2Ref = useRef();

  const categoryRef = useRef();

  const quillRef = useRef(); // quill editor에 접근하기 위한 ref

  console.log(json);

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
              type: 3,
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

  function extractSecondsFromString(str) {
    // 숫자가 아닌 문자는 모두 제거하고, 나머지를 정수로 변환
    const seconds = parseInt(str.replace(/\D/g, ""), 10);

    return isNaN(seconds) ? 0 : seconds;
  }

  // --------------------------- Submit 버튼으로 post ---------------------
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (
      titleRef.current.value == "" ||
      diffRef.current.value == "" ||
      timeRef.current.value == "" ||
      memRef.current.value == "" ||
      inputDescRef.current.value == "" ||
      inputEx1Ref.current.value == "" ||
      outputDescRef.current.value == "" ||
      outputEx1Ref.current.value == "" ||
      quillRef.current.value == "" ||
      categoryRef.current.getValue().length == 0
    ) {
      return Swal.fire({
        icon: "error",
        title: "정보 입력이 완전하지 않습니다.",
      });
    } else {
      const formData = new FormData();
      //File 추가

      //quill editor에 의해 생성된 메인 설명의 html을 form-data에 삽입
      formData.append("description", quillRef.current.value);

      axios
        .post(API.AI+"/upload-task", formData, {
          // headers: {
          //   "Content-Type": `multipart/form-data; `,
          //   Authorization: "Bearer " + userInfo.access_token,
          // },
          params: {
              title: titleRef.current.value,
              inputDescription: inputDescRef.current.value,
              inputEx1: inputEx1Ref.current.value,
              inputEx2: inputEx2Ref.current.value,
              outputDescription: outputDescRef.current.value,
              outputEx1: outputEx1Ref.current.value,
              outputEx2: outputEx2Ref.current.value,
              diff: diffRef.current.value,
              timeLimit: timeRef.current.value,
              memLimit: memRef.current.value,
              category: categoryRef.current
                .getValue()
                .map((e) => e.value)
                .join(","),
          },
        })
        .then(function (response) {
          if (response.data.code === 1) {
            Swal.fire({
              icon: "success",
              title: `${titleRef.current.value} 업로드 성공`,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: `ERROR - SERVER COMMUNICATION FAILED`,
            });
          }
        });
    }
  };

  return (
    <div className="m-upload-AI">
      <InputGroup className="m-title">
        <InputGroup.Text id="inputGroup-sizing-default">Title</InputGroup.Text>
        <Form.Control ref={titleRef} defaultValue={json.problem.title} />
      </InputGroup>
      <div className="m-upload-context">
        <div className="m-desc">
          <ReactQuill
            theme="snow"
            modules={quill_module}
            ref={quillRef}
            style={{ minHeight: "550px" }}
            defaultValue={json.problem.description}
          />
          {/* 문제에 대한 난이도 선정 */}
          <div className="m-diff">
            <FloatingLabel controlId="floatingSelect" label="난이도">
              <Form.Select ref={diffRef} aria-label="F">
                <option>문제에 대한 난이도 선택</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Form.Select>
            </FloatingLabel>
          </div>
          {/* 문제에 대한 난이도 선정 */}
          {/* 문제에 대한 시간제한 선정 */}
          <InputGroup id="m-timeLimit">
            <InputGroup.Text>Time Limit</InputGroup.Text>
            <Form.Control
              ref={timeRef}
              defaultValue={extractSecondsFromString(json.constraints.time)}
            />
            <InputGroup.Text>SEC</InputGroup.Text>
          </InputGroup>
          {/* 문제에 대한 시간제한 선정 */}
          {/* 문제에 대한 메모리 제한 선정 */}
          <InputGroup id="m-memLimit">
            <InputGroup.Text>Memory Limit</InputGroup.Text>
            <Form.Control
              ref={memRef}
              defaultValue={extractSecondsFromString(json.constraints.memory)}
            />
            <InputGroup.Text>MB</InputGroup.Text>
          </InputGroup>
          {/* 문제에 대한 메모리 제한 선정 */}
        </div>

        <div className="m-inOut">
          {/* 문제 입력에 대한 설명 */}
          <InputGroup className="m-input">
            <InputGroup.Text id="inputGroup-sizing-default">
              <BsArrowDownRight size={30} />
            </InputGroup.Text>
            <Form.Control
              ref={inputDescRef}
              as="textarea"
              defaultValue={json.problem.input.description}
              style={{ minHeight: "120px" }}
            />
          </InputGroup>

          <FloatingLabel
            controlId="floatingTextarea"
            label="입력 예시 01"
            id="m-input-one"
          >
            <Form.Control
              as="textarea"
              ref={inputEx1Ref}
              defaultValue={json.problem.examples[0].input}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingTextarea"
            label="입력 예시 02"
            id="m-input-two"
          >
            <Form.Control
              as="textarea"
              ref={inputEx2Ref}
              defaultValue={json.problem.examples[1].input}
            />
          </FloatingLabel>

          {/* 문제 입력에 대한 설명 */}

          {/* 문제 출력에 대한 설명 */}

          <InputGroup className="m-output" style={{ marginTop: "62px" }}>
            <InputGroup.Text id="inputGroup-sizing-default">
              <BsArrowUpLeft size={30} />
            </InputGroup.Text>
            <Form.Control
              as="textarea"
              defaultValue={json.problem.output.description}
              style={{ minHeight: "120px" }}
              ref={outputDescRef}
            />
          </InputGroup>

          <FloatingLabel
            controlId="floatingTextarea"
            label="출력 예시 01"
            id="m-output-one"
          >
            <Form.Control
              as="textarea"
              ref={outputEx1Ref}
              defaultValue={json.problem.examples[0].output}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingTextarea"
            label="출력 예시 02"
            id="m-output-two"
          >
            <Form.Control
              as="textarea"
              ref={outputEx2Ref}
              defaultValue={json.problem.examples[1].output}
            />
          </FloatingLabel>

          {/* 문제 출력에 대한 설명 */}

          {/* 문제 풀이 가능 언어 선택 */}
          <div className="m-choLen">
            <p style={{ margin: "0 !important" }}>
              <span>
                <BsUiChecksGrid size={20} style={{ marginRight: "20px" }} />
              </span>
              카테고리
            </p>
            <CheckCategory categoryRef={categoryRef} userInfo={userInfo} />
          </div>

          {/* 문제 풀이 가능 언어 선택 */}
        </div>
      </div>

      <div className="btnDiv">
        <Button
          variant="outline-primary"
          id="m-request_btn"
          onClick={() => reAsk(askContent)}
        >
          다시 요청하기
        </Button>

        <Button
          variant="outline-secondary"
          id="m-submit_btn-AI"
          onClick={onSubmitHandler}
        >
          SUBMIT
        </Button>
      </div>
    </div>
  );
};

const CheckCategory = ({ userInfo, categoryRef }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    axios.get(API.CATEGORY).then((value) => {
      var option = [];
      for (let i = 0; i < value.data.length; i++) {
        option.push({ value: value.data[i], label: value.data[i] });
      }
      setIsLoading(false);
      return setOptions(option);
    });
  }, []);

  const handleCreate = (inputValue) => {
    setIsLoading(true);
    axios
      .post(
        API.CATEGORY,
        {},
        {
          headers: {
            "Content-Type": `multipart/form-data; `,
            Authorization: "Bearer " + userInfo.access_token,
          },
          params: {
            category: inputValue,
          },
        }
      )
      .then((value) => {
        setOptions([...options, { value: inputValue, label: inputValue }]);
        setIsLoading(false);
      });
  };

  return (
    <CreatableSelect
      ref={categoryRef}
      isClearable
      isDisabled={isLoading}
      isLoading={isLoading}
      isMulti
      onCreateOption={handleCreate}
      options={options}
    />
  );
};
