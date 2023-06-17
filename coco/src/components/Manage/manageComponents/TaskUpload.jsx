import "../Manage.css";
import React from "react";
import { useState, useMemo, useRef } from "react";
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

Quill.register("modules/imageResize", ImageResize);

export const TaskUpload = () => {
  const [title, setTitle] = useState(""); // 제목 State !필수

  const [diff, setDiff] = useState(""); // 난이도 State !필수
  const [time, setTime] = useState(""); // 시간제한 State !필수
  const [mem, setMem] = useState(""); // 메모리제한 State !필수

  const [inputDesc, setInputDesc] = useState(""); // 입력 설명 State !필수
  const [inputEx1, setInputEx1] = useState(""); // 입력 예시 State !필수
  const [inputEx2, setInputEx2] = useState("");

  const [outputDesc, setOutputDesc] = useState(""); // 출력 설명 State !필수
  const [outputEx1, setOutputEx1] = useState(""); // 출력 예시 State !필수
  const [outputEx2, setOutputEx2] = useState("");

  const [py, setPy] = useState(false); // 설정 언어 State !필수
  const [cLan, setCLan] = useState(false); // 설정 언어 State !필수
  const [testCase, setTestCase] = useState(null); // 테스트 케이스 State !필수

  const [quillValue, setquillValue] = useState(""); // 메인 설명 html State !필수
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
          "http://localhost:8000/image/upload-temp",
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

  // --------------------------- 문제 업로드에 필요한 값들의 state 업데이트 ----------------------

  const onTitleHandler = (e) => {
    setTitle(e.currentTarget.value);
  };

  const onDiffHandler = (e) => {
    setDiff(e.currentTarget.value);
  };

  const onTimeHandler = (e) => {
    setTime(e.currentTarget.value);
  };

  const onMemHandler = (e) => {
    setMem(e.currentTarget.value);
  };

  const onInputDescHandler = (e) => {
    setInputDesc(e.currentTarget.value);
  };

  const onInputEx1Handler = (e) => {
    setInputEx1(e.currentTarget.value);
  };

  const onInputEx2Handler = (e) => {
    setInputEx2(e.currentTarget.value);
  };

  const onOutputDescHandler = (e) => {
    setOutputDesc(e.currentTarget.value);
  };

  const onOutputEx1Handler = (e) => {
    setOutputEx1(e.currentTarget.value);
  };

  const onOutputEx2Handler = (e) => {
    setOutputEx2(e.currentTarget.value);
  };

  // --------------------------- Submit 버튼으로 post ---------------------
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (
      title == "" ||
      diff == "" ||
      time == "" ||
      mem == "" ||
      inputDesc == "" ||
      inputEx1 == "" ||
      outputDesc == "" ||
      outputEx1 == ""
    ) {
      return alert("정보 입력 부족");
    } else {
      console.log(testCase);
      const formData = new FormData();
      //File 추가
      formData.append("testCase", testCase);

      //quill editor에 의해 생성된 메인 설명의 html을 form-data에 삽입
      formData.append("description", quillValue);

      axios
        .post("http://127.0.0.1:8000/manage/", formData, {
          headers: {
            "Content-Type": `multipart/form-data; `,
            Authorization: "Bearer " + userInfo.access_token,
          },
          params: {
            title: title,
            diff: diff,
            timeLimit: time,
            memLimit: mem,
            inputDescription: inputDesc,
            inputEx1: inputEx1,
            inputEx2: inputEx2,
            outputDescription: outputDesc,
            outputEx1: outputEx1,
            outputEx2: outputEx2,
            python: py,
            C_Lan: cLan,
          },
        })
        .then(function (response) {
          if (response.data.result === 1) {
            alert(`${title} 업로드 성공`);
          } else {
            alert("ERROR - SERVER COMMUNICATION FAILED");
          }
        });
    }
  };
  return (
    <>
      <h2 className="mTi">TASK UPLOAD</h2>
      <div className="m-upload">
        <InputGroup className="m-title">
          <InputGroup.Text id="inputGroup-sizing-default">
            Title
          </InputGroup.Text>
          <Form.Control
            placeholder="문제 제목을 입력해주세요. (문제 제목은 40자 이내)"
            onChange={onTitleHandler}
          />
        </InputGroup>
        <div className="m-upload-context">
          <div className="m-desc">
            <ReactQuill
              theme="snow"
              value={quillValue}
              modules={quill_module}
              onChange={setquillValue}
              ref={quillRef}
              placeholder={"문제의 메인 설명 입력"}
              style={{ minHeight: "550px" }}
            />
            {/* 문제에 대한 난이도 선정 */}
            <div className="m-diff">
              <FloatingLabel controlId="floatingSelect" label="난이도">
                <Form.Select aria-label="F" onChange={onDiffHandler}>
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
              <Form.Control onChange={onTimeHandler} />
              <InputGroup.Text>SEC</InputGroup.Text>
            </InputGroup>
            {/* 문제에 대한 시간제한 선정 */}
            {/* 문제에 대한 메모리 제한 선정 */}
            <InputGroup id="m-memLimit">
              <InputGroup.Text>Memory Limit</InputGroup.Text>
              <Form.Control onChange={onMemHandler} />
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
                onChange={onInputDescHandler}
                placeholder="문제 입력에 대한 설명 입력."
                as="textarea"
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
                placeholder="입력 예시"
                onChange={onInputEx1Handler}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingTextarea"
              label="입력 예시 02"
              id="m-input-two"
            >
              <Form.Control
                as="textarea"
                placeholder="입력 예시"
                onChange={onInputEx2Handler}
              />
            </FloatingLabel>

            {/* 문제 입력에 대한 설명 */}

            {/* 문제 출력에 대한 설명 */}

            <InputGroup className="m-output" style={{ marginTop: "100px" }}>
              <InputGroup.Text id="inputGroup-sizing-default">
                <BsArrowUpLeft size={30} />
              </InputGroup.Text>
              <Form.Control
                placeholder="문제 출력에 대한 설명 입력."
                as="textarea"
                style={{ minHeight: "120px" }}
                onChange={onOutputDescHandler}
              />
            </InputGroup>

            <FloatingLabel
              controlId="floatingTextarea"
              label="출력 예시 01"
              id="m-output-one"
            >
              <Form.Control
                as="textarea"
                placeholder="출력 예시"
                onChange={onOutputEx1Handler}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingTextarea"
              label="출력 예시 02"
              id="m-output-two"
            >
              <Form.Control
                as="textarea"
                placeholder="출력 예시"
                onChange={onOutputEx2Handler}
              />
            </FloatingLabel>

            {/* 문제 출력에 대한 설명 */}

            {/* 문제 풀이 가능 언어 선택 */}
            <Form className="m-choLen">
              <p style={{ margin: "0 !important" }}>
                <span>
                  <BsUiChecksGrid size={20} style={{ marginRight: "20px" }} />
                </span>
                문제 풀이 가능 언어
              </p>
              {["checkbox"].map((type) => (
                <div key={`inline-${type}`} className="m-lan">
                  <Form.Check
                    inline
                    label="Python3"
                    type={type}
                    id="m-lan-py"
                    style={{ marginRight: "80px" }}
                    onChange={() => {
                      setPy(true);
                    }}
                  />
                  <Form.Check
                    inline
                    label="C언어"
                    type={type}
                    id="m-lan-c"
                    onChange={() => {
                      setCLan(true);
                    }}
                  />
                </div>
              ))}
            </Form>

            {/* 문제 풀이 가능 언어 선택 */}

            {/* 입출력 테스트 케이스 zip파일 */}

            <Form.Group controlId="formFileMultiple" className="m-testCase">
              <Form.Label>
                <BsFileEarmarkZip size={20} style={{ marginRight: "15px" }} />
                문제에 대한 Test Case (.zip)
              </Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => {
                  setTestCase(e.target.files[0]);
                }}
              />
            </Form.Group>

            {/* 입출력 테스트 케이스 zip파일 */}
          </div>
        </div>

        <Button
          variant="outline-secondary"
          id="m-submit_btn"
          onClick={onSubmitHandler}
        >
          SUBMIT
        </Button>
      </div>
    </>
  );
};
