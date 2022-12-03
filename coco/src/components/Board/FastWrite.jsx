import React from "react";
import {
  BsFillLightningFill,
  BsFillExclamationTriangleFill,
} from "react-icons/bs";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const FastWrite = () => {
  return (
    <div className="FastWrite">
      <div className="FWHead">
        <BsFillLightningFill size={24} color="#40AFFF" />
        <h2>빠른 글쓰기</h2>
      </div>
      <Form.Control
        as="textarea"
        id="txtInput"
        style={{ height: "330px" }}
        placeholder="Write your Idea!"
      />
      <Button variant="outline-primary" id="FastSubmit">
        Submit
      </Button>
      <div className="FWFooter">
        <BsFillExclamationTriangleFill size={15} color="gray" />
        <p>빠른 글쓰기는 '자유' 로 고정됩니다.</p>
        <BsFillExclamationTriangleFill size={15} color="gray" />
      </div>
    </div>
  );
};
