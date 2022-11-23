import React, { Component } from "react";
import "./Manage.css";
import { useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import {
  BsArrowDownRight,
  BsArrowUpLeft,
  BsPlus,
  BsImages,
  BsUiChecksGrid,
} from "react-icons/bs";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";

export const Manage = () => {
  // --------------------------- 파일 업로드에 관한 코드 ---------------------
  const [image, setImage] = React.useState("");
  const imageRef = React.useRef(null);

  function useDisplayImage() {
    const [result, setResult] = React.useState("");

    function uploader(e) {
      const imageFile = e.target.files[0];

      const reader = new FileReader();
      reader.addEventListener("load", (e) => {
        setResult(e.target.result);
      });

      reader.readAsDataURL(imageFile);
    }

    return { result, uploader };
  }

  const { result, uploader } = useDisplayImage();

  // --------------------------- 파일 업로드에 관한 코드 ---------------------

  // --------------------------- 입출력 예시 버튼으로 통한 증가 ---------------------

  // --------------------------- 입출력 예시 버튼으로 통한 증가 ---------------------
  return (
    <div className="manage">
      <div className="m-head">
        <h2 id="m-title">Manager Page</h2>
        <h2 id="m-Logo">COCO</h2>
      </div>
      <div className="m-upload">
        <InputGroup className="m-title">
          <InputGroup.Text id="inputGroup-sizing-default">
            Title
          </InputGroup.Text>
          <Form.Control placeholder="문제 제목을 입력해주세요." />
        </InputGroup>
        <div className="m-upload-context">
          <div className="m-desc">
            {/* 문제 디스크립션 */}
            <InputGroup className="m-des">
              <InputGroup.Text>Des.</InputGroup.Text>
              <Form.Control
                as="textarea"
                style={{ minHeight: "550px" }}
                placeholder="문제에 대한 Description 입력"
              />
            </InputGroup>
            {/* 문제 디스크립션 */}

            {/* 문제에 대한 사진 추가 */}
            <Form.Group controlId="formFileMultiple" className="m-des-img">
              <Form.Label>
                <BsImages size={20} style={{ marginRight: "15px" }} />
                문제 설명에 추가할 사진 선택
              </Form.Label>
              <Form.Control
                type="file"
                multiple
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  uploader(e);
                }}
              />
            </Form.Group>
            {result && (
              <img
                ref={imageRef}
                src={result}
                style={({ maxWidth: "100%" }, { minWidth: "100%" })}
              />
            )}

            {/* 문제에 대한 사진 추가 */}

            {/* 문제에 대한 난이도 선정 */}
            <div className="m-diff">
              <FloatingLabel controlId="floatingSelect" label="난이도">
                <Form.Select aria-label="F">
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
              <Form.Control />
              <InputGroup.Text>SEC</InputGroup.Text>
            </InputGroup>
            {/* 문제에 대한 시간제한 선정 */}

            {/* 문제에 대한 메모리 제한 선정 */}
            <InputGroup id="m-memLimit">
              <InputGroup.Text>Memory Limit</InputGroup.Text>
              <Form.Control />
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
              <Form.Control as="textarea" placeholder="입력 예시" />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingTextarea"
              label="입력 예시 02"
              id="m-input-two"
            >
              <Form.Control as="textarea" placeholder="입력 예시" />
            </FloatingLabel>

            <Form.Group controlId="formFileMultiple" id="m-input-three">
              <Form.Label>
                <BsImages size={20} style={{ marginRight: "15px" }} />
                입력 예시에 추가할 사진 선택
              </Form.Label>
              <Form.Control
                type="file"
                multiple
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  uploader(e);
                }}
              />
            </Form.Group>
            {result && (
              <img ref={imageRef} src={result} style={{ maxWidth: "100%" }} />
            )}

            {/* 문제 입력에 대한 설명 */}

            {/* 문제 출력에 대한 설명 */}

            <InputGroup className="m-output" style={{ marginTop: "55px" }}>
              <InputGroup.Text id="inputGroup-sizing-default">
                <BsArrowUpLeft size={30} />
              </InputGroup.Text>
              <Form.Control
                placeholder="문제 출력에 대한 설명 입력."
                as="textarea"
                style={{ minHeight: "120px" }}
              />
            </InputGroup>

            <FloatingLabel
              controlId="floatingTextarea"
              label="출력 예시 01"
              id="m-output-one"
            >
              <Form.Control as="textarea" placeholder="출력 예시" />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingTextarea"
              label="출력 예시 02"
              id="m-output-two"
            >
              <Form.Control as="textarea" placeholder="출력 예시" />
            </FloatingLabel>

            <Form.Group controlId="formFileMultiple" id="m-output-three">
              <Form.Label>
                <BsImages size={20} style={{ marginRight: "15px" }} />
                출력 예시에 추가할 사진 선택
              </Form.Label>
              <Form.Control
                type="file"
                multiple
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  uploader(e);
                }}
              />
            </Form.Group>
            {result && (
              <img ref={imageRef} src={result} style={{ maxWidth: "100%" }} />
            )}

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
                  />
                  <Form.Check inline label="C언어" type={type} id="m-lan-c" />
                </div>
              ))}
            </Form>

            {/* 문제 풀이 가능 언어 선택 */}
          </div>
        </div>

        <Button variant="outline-secondary" id="m-submit_btn">
          SUBMIT
        </Button>
      </div>
    </div>
  );
};
