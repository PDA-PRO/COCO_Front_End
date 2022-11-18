import React from "react";
import "./Manage.css";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { BsArrowDownRight, BsArrowUpLeft } from "react-icons/bs";
import Button from "react-bootstrap/Button";

export const Manage = () => {
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
          <InputGroup className="m-des">
            <InputGroup.Text>Des.</InputGroup.Text>
            <Form.Control
              style={{ minHeight: "500px" }}
              placeholder="문제에 대한 Description 입력"
            />
          </InputGroup>
          <div className="m-inOut">
            <InputGroup className="m-input">
              <InputGroup.Text id="inputGroup-sizing-default">
                <BsArrowDownRight size={30} />
              </InputGroup.Text>
              <Form.Control
                placeholder="문제 입력에 대한 설명 입력."
                style={{ minHeight: "120px" }}
              />
            </InputGroup>

            <InputGroup className="m-output">
              <InputGroup.Text id="inputGroup-sizing-default">
                <BsArrowUpLeft size={30} />
              </InputGroup.Text>
              <Form.Control
                placeholder="문제 출력에 대한 설명 입력."
                style={{ minHeight: "120px" }}
              />
            </InputGroup>
          </div>
        </div>

        <Button variant="outline-secondary" id="m-submit_btn">
          SUBMIT
        </Button>
      </div>
    </div>
  );
};
