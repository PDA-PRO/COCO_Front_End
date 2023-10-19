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
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";

export const AITask = () => {
  const [template, setTemplate] = useState(
    "입출력 예시, 메모리 제한, 시간 제한이 있는 파이썬 알고리즘를 문제 만들어줘"
  );
  const changePrompt = (e) => {
    var string =
      "입출력 예시, 메모리 제한, 시간 제한이 있는 ";
    switch (parseInt(e)) {
      case 1:
        return string + "반복문 알고리즘 문제를 만들어줘";
      case 2:
        return string + "조건문 알고리즘 문제를 만들어줘";
      case 3:
        return string + "수학 알고리즘 문제를 만들어줘";

      case 4:
        return string + "입출력 알고리즘 문제를 만들어줘";

      case 5:
        return string + "배열 및 리스트 알고리즘 문제를 만들어줘";

      case 6:
        return string + "정렬 알고리즘 문제를 만들어줘";

      case 7:
        return string + "스택 혹은 큐 알고리즘 문제를 만들어줘";

      case 8:
        return string + "그래프(BFS 혹은 DFS) 알고리즘 문제를 만들어줘";

      case 9:
        return string + "그리디 알고리즘 문제 만들어줘";

      case 10:
        return string + "DP 알고리즘 문제를 만들어줘";

      case 11:
        return string + "직접 입력해주세요.";
    }
  };

  const [sendAsk, setSendAsk] = useState("");
  const [json, setJson] = useState({});
  const [isAI, setIsAI] = useState(false);
  const [codeCheck, setCodeCheck] = useState(false);
  const ASKContent = useRef();
  const Ask = (e) => {
    // setJson({});
    if (e === "") {
      Swal.fire({
        icon: "error",
        title: "질문의 내용을 입력해주세요",
      });
    } else {
      setSendAsk(e);
      const formData = new FormData();
      formData.append("description", '<p>tmp</p>');
      Swal.fire({
        icon: "question",
        title: "AI가 문제를 생성중입니다.",
        showConfirmButton: false,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          axios
          .post("http://localhost:8000/ai-task/main", 
            {
              content: e,
              form_data: '<p>tmp</p>',
              is_final: false,
            },
          )
          .then((res) => {
            if (res.data.data == true) {
              console.log(res.data)
              setIsAI(true);
              setJson({ ...res.data.result });
              Swal.fire({
                icon: "success",
                title:
                  "AI가 답변을 생성했습니다. \n 수정해야할 부분을 수정하고 업로드하세요!",
              });
            } else {
   
            }
            })
            .catch(() => {
              Swal.fire({
                icon: "error",
                title:
                  "문제 생성 AI를 사용할 수 없습니다.\nAI 플러그인을 확인하세요.",
                timer: 1000,
                showConfirmButton: false,
              });
            });
        },
      });
    }
  };

  const handleRadioChange = (event) => {
    setTemplate(changePrompt(event.target.value));
  };

  const handleCheckChange = (e) => {
    setCodeCheck(!codeCheck);
  };

  console.log(template);

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

        <hr />

        <div className="template">
          <p>Template : AI 생성 빠르게 요청하기</p>

          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              문제 유형 선택
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={handleRadioChange}
            >
              <FormControlLabel value="1" control={<Radio />} label="반복문" />
              <FormControlLabel value="2" control={<Radio />} label="조건문" />
              <FormControlLabel value="3" control={<Radio />} label="수학" />
              <FormControlLabel value="4" control={<Radio />} label="입출력" />
              <FormControlLabel
                value="5"
                control={<Radio />}
                label="배열 및 리스트"
              />
              <FormControlLabel value="6" control={<Radio />} label="정렬" />
              <FormControlLabel
                value="7"
                control={<Radio />}
                label="스택 및 큐"
              />
              <FormControlLabel
                value="8"
                control={<Radio />}
                label="그래프(BFS, DFS)"
              />
              <FormControlLabel value="9" control={<Radio />} label="그리디" />
              <FormControlLabel value="10" control={<Radio />} label="DP" />
              <FormControlLabel value="11" control={<Radio />} label="etc" />
            </RadioGroup>
          </FormControl>

          <FormGroup>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Answer 예제 코드 확인
            </FormLabel>
            <FormControlLabel
              control={<Checkbox />}
              onChange={handleCheckChange}
              label="Python3 코드 보기"
              style={{ width: "fit-content" }}
            />
          </FormGroup>

          <p id="caution">
            ※ 주의 사항 : 입출력 예시, 시간 제한, 메모리 제한은 필수적으로
            AI에게 요청해야 합니다. ※
          </p>
        </div>
        <hr />
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
              // placeholder="ex) 문제에 입출력예시, 테스트 케이스(최소 20개), 메모리제한, 시간제한이 있는 조건문 알고리즘 문제 만들어줘"
              as="textarea"
              style={{ minHeight: "100px" }}
              defaultValue={
                codeCheck === true
                  ? template + " Python으로 예제 정답 코드도 같이 만들어줘"
                  : template
              }
              key={
                codeCheck === true
                  ? template + " Python으로 예제 정답 코드도 같이 만들어줘"
                  : template
              }
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

  function extractSecondsFromString(str) {
    // 숫자가 아닌 문자는 모두 제거하고, 나머지를 정수로 변환
    const seconds = parseInt(str.replace(/\D/g, ""), 10);
    return isNaN(seconds) ? 0 : seconds;
  }

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
      .post("http://localhost:8000/ai-task/main", {
          form_data: quillRef.current.value, 
          task_data: {
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
          is_final: true
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
        <Form.Control
          ref={titleRef}
          defaultValue={json.problem.title}
          key={json.problem.title}
        />
      </InputGroup>
      <div className="m-upload-context">
        <div className="m-desc">
          <ReactQuill
            theme="snow"
            modules={quill_module}
            ref={quillRef}
            style={{ minHeight: "550px" }}
            defaultValue={json.problem.description}
            key={json.problem.description}
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
              key={extractSecondsFromString(json.constraints.time)}
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
              key={extractSecondsFromString(json.constraints.memory)}
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
              key={json.problem.input.description}
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
              key={json.problem.examples[0].input}
              style={{ minHeight: "100px" }}
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
              key={json.problem.examples[1].input}
              style={{ minHeight: "100px" }}
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
              key={json.problem.output.description}
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
              key={json.problem.examples[0].output}
              style={{ minHeight: "100px" }}
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
              key={json.problem.examples[1].output}
              style={{ minHeight: "100px" }}
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