import "../Manage.css";
import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

export const Notice = () => {
  return (
    <>
      <h2 className="mTi">NOTICE</h2>
      <div className="m-upload">
        <InputGroup style={{ height: "550px" }}>
          <InputGroup.Text>수정</InputGroup.Text>
          <Form.Control as="textarea" placeholder="1." />
        </InputGroup>

        <Button variant="outline-secondary" id="m-submit_btn">
          SUBMIT
        </Button>
      </div>
    </>
  );
};
