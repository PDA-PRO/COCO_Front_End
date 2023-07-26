import "../Manage.css";
import React from "react";
import { useState, useMemo, useRef, useEffect, Suspense } from "react";
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
import Spinner from "react-bootstrap/esm/Spinner";
import fetchData from "../../../api/fetchTask";

Quill.register("modules/imageResize", ImageResize);

export const TaskModify = () => {
  var path = window.location.pathname;
  path = path.split("/");
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <TaskModifyPage
          resource={fetchData(`http://localhost:8000/task/${path.at(-1)}/`)}
        />
      </Suspense>
    </>
  );
};

export const TaskModifyPage = ({ resource }) => {
  var taskData = resource.read();
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

  const [testCase, setTestCase] = useState(null); // 테스트 케이스 State !필수
  const [TCCheck, setTCCheck] = useState([false, ""]);

  const quillRef = useRef(); // quill editor에 접근하기 위한 ref
  const userInfo = useAppSelector((state) => state.loginState); //로컬스토리지에 저장된 유저 정보 접근

  var defaultValue = [];

  useEffect(() => {
    titleRef.current.value = taskData.title;
    diffRef.current.value = taskData.diff;
    timeRef.current.value = taskData.timeLimit;
    memRef.current.value = taskData.memLimit;
    inputDescRef.current.value = taskData.inDesc;
    inputEx1Ref.current.value = taskData.inputEx1;
    inputEx2Ref.current.value = taskData.inputEx2;
    outputDescRef.current.value = taskData.outDesc;
    outputEx1Ref.current.value = taskData.outputEx1;
    outputEx2Ref.current.value = taskData.outputEx2;
    for (let i = 0; i < taskData.category.length; i++) {
      defaultValue.push({
        value: taskData.category[i],
        label: taskData.category[i],
      });
    }
    // 테스트 케이스 수정
    // const filedata = new File([taskData], "testcase.zip", {
    //   type: "application/x-zip-compressed",
    // });
    // setTestCase(filedata);
    // fileMeta(taskData);
  }, []);

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
      console.log(quillRef.current.value);
      console.log(editor.getText());
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
      !TCCheck[0] ||
      categoryRef.current.getValue().length == 0
    ) {
      return alert("정보 입력 부족");
    } else {
      const formData = new FormData();
      //File 추가
      formData.append("testCase", testCase);

      //quill editor에 의해 생성된 메인 설명의 html을 form-data에 삽입
      formData.append("description", quillRef.current.value);

      axios
        .put("http://127.0.0.1:8000/task/", formData, {
          headers: {
            "Content-Type": `multipart/form-data; `,
            Authorization: "Bearer " + userInfo.access_token,
          },
          params: {
            task_id: taskData.id,
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
          if (response.data.result === 1) {
            alert(`${titleRef.current.value} 업데이트 성공`);
          } else {
            alert("ERROR - SERVER COMMUNICATION FAILED");
          }
        });
    }
  };

  const fileMeta = (zipfile) => {
    const zip = new JSZip();
    console.log(zipfile);
    if (zipfile) {
      zip.loadAsync(zipfile).then((zip) => {
        let inputContent = [];
        let outputContent = [];
        try {
          zip.forEach((relativePath, zipEntry) => {
            let data = zipEntry.name.split("/");
            if (data[0].toLowerCase() == "input") {
              inputContent.push(data[1]);
            } else if (data[0].toLowerCase() == "output") {
              outputContent.push(data[1]);
            } else {
              throw new Error("잘못된 디렉토리 형식");
            }
          });
        } catch (error) {
          setTCCheck([false, "디렉터리 형식이 올바르지 않습니다."]);
          return;
        }

        if (inputContent.length != outputContent.length) {
          setTCCheck([false, "입력값과 출력값의 개수가 다릅니다."]);
          return;
        } else {
          inputContent.sort();
          outputContent.sort();
          for (let index = 0; index < inputContent.length; index++) {
            if (inputContent[index] != outputContent[index]) {
              setTCCheck([false, "입력값과 출력값의 이름, 형식이 다릅니다."]);
              return;
            }
          }
          setTCCheck([true, inputContent.join(" | ")]);
          setTestCase(zipfile);
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
            ref={titleRef}
            placeholder="문제 제목을 입력해주세요. (문제 제목은 40자 이내)"
          />
        </InputGroup>
        <div className="m-upload-context">
          <div className="m-desc">
            <ReactQuill
              theme="snow"
              modules={quill_module}
              ref={quillRef}
              defaultValue={taskData.mainDesc}
              placeholder={"문제의 메인 설명 입력"}
              style={{ minHeight: "550px" }}
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
              <Form.Control ref={timeRef} />
              <InputGroup.Text>SEC</InputGroup.Text>
            </InputGroup>
            {/* 문제에 대한 시간제한 선정 */}
            {/* 문제에 대한 메모리 제한 선정 */}
            <InputGroup id="m-memLimit">
              <InputGroup.Text>Memory Limit</InputGroup.Text>
              <Form.Control ref={memRef} />
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
                ref={inputEx1Ref}
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
                ref={inputEx2Ref}
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
                placeholder="출력 예시"
                ref={outputEx1Ref}
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
                ref={outputEx2Ref}
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
              <CheckCategory
                defaultValue={defaultValue}
                categoryRef={categoryRef}
                userInfo={userInfo}
              />
            </div>

            {/* 문제 풀이 가능 언어 선택 */}

            {/* 입출력 테스트 케이스 zip파일 */}

            <Form.Group controlId="formFileMultiple" className="m-testCase">
              <Form.Label>
                <BsFileEarmarkZip size={20} style={{ marginRight: "15px" }} />
                문제에 대한 Test Case (.zip)
              </Form.Label>
              <Form.Control
                type="file"
                fi
                onChange={(e) => {
                  fileMeta(e.target.files[0]);
                }}
              />
              <Form.Label>{TCCheck[1]}</Form.Label>
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

const CheckCategory = ({ userInfo, categoryRef, defaultValue }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/task/category").then((value) => {
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
        "http://localhost:8000/task/category",
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
      defaultValue={defaultValue}
    />
  );
};
