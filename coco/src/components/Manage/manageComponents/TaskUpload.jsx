import "../Manage.css";
import React from "react";
import { useState } from "react";
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
import { json, useNavigate } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useAppSelector } from "../../../app/store";

export const TaskUpload = () => {
  const navigate = useNavigate();
  const moveHome = () => {
    navigate("/");
  };
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

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const userInfo = useAppSelector((state) => state.loginState);

  const updateTextDescription = async (state) => {
    await setEditorState(state);
  };

  const uploadCallback = (imagefile) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          "http://localhost:8000/image/upload-temp",
          {
            file: imagefile, // 파일
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
          resolve(res);
        })
        .catch(reject);
    })
      .then((res) => {
        return { data: { link: res.data } };
      })
      .catch(() => {
        return { data: { link: "이미지 업로드 실패" } };
      });
  };

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
  // --------------------------- POST 보낼 값 State 화 ----------------------

  // --------------------------- 파일 업로드에 관한 코드 ---------------------

  // --------------------------- 파일 업로드에 관한 코드 ---------------------

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

      //객체를 Json타입으로 파싱하여 Blob객테 생성, type에 json 타입 지정
      formData.append(
        "description",
        JSON.stringify(convertToRaw(editorState.getCurrentContent()))
      );

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
            moveHome();
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
            <Editor
              placeholder={"내용을 작성해주세요."}
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
                image: { uploadCallback: uploadCallback, previewImage: true },
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
                minHeight: "550px",
                width: "100%",
                border: "3px solid lightgray",
                padding: "20px",
                fontFamily: "Pretendard-Regular",
              }}
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

            {/* 문제 입력에 대한 설명 */}

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
