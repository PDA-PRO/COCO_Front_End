import React from "react";
import "./WriteGuel.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const Free = ({ onContextHandler, onSubmit }) => {
  return (
    <div className="freeWrite">
      <Form.Control
        as="textarea"
        id="free_txtInput"
        style={{ height: "480px" }}
        placeholder="내용을 입력해주세요."
        onChange={onContextHandler}
      />

      <Button variant="outline-info" id="submitFree" onClick={onSubmit}>
        Submit
      </Button>
    </div>
  );
};
