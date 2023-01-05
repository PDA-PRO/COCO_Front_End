import React from "react";
import "./MyPage.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { useEffect } from "react";
import { IoMdSchool } from "react-icons/io";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { IoMailOutline } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";

export const FirstBox = () => {
  const [isPic, setIsPic] = useState(false);
  const [fileImage, setFileImage] = useState("");
  const saveFileImage = (e) => {
    setFileImage(URL.createObjectURL(e.target.files[0]));
  };

  // 파일 삭제
  const deleteFileImage = () => {
    setIsPic(false);
    URL.revokeObjectURL(fileImage);
    setFileImage("/image/user.png");
  };

  useEffect(() => {
    console.log(isPic);
  }, [isPic]);
  return (
    <div className="mp-infoBox">
      <div className="picBox">
        <>
          {isPic ? (
            <img alt="sample" src={fileImage} className="userImg" />
          ) : (
            <img alt="sample" src="/image/user.png" className="userImg" />
          )}
        </>

        <div className="picSelect">
          <label htmlFor="imgUpload" onClick={() => setIsPic(true)}>
            프로필 사진 변경
          </label>
          <input
            id="imgUpload"
            name="imgUpload"
            type="file"
            accept="image/*"
            onChange={saveFileImage}
            style={{
              display: "none",
            }}
          />

          <label onClick={() => deleteFileImage()}>기본 이미지로 설정</label>
        </div>
      </div>

      <div className="levelField">
        <div className="ip1">
          <IoMdSchool size={33} />
          <p>학생</p>
        </div>

        <h3>Level 3</h3>
        <p>다음 레벨까지 100pts</p>
      </div>

      <div className="txtInputBox">
        <h3>
          <span>
            <IoMailOutline
              size={23}
              color="green"
              style={{ marginRight: "10px" }}
            />
          </span>
          이메일 변경
        </h3>
        <InputGroup className="mb-3">
          <Form.Control placeholder="user-Email" />
          <Button variant="outline-success" id="button-addon2">
            변경
          </Button>
        </InputGroup>

        <h3 style={{ marginTop: "12px" }}>
          <span>
            <RiLockPasswordLine
              size={22}
              color="green"
              style={{ marginRight: "10px" }}
            />
          </span>
          비밀번호 변경
        </h3>

        <InputGroup className="mb-3">
          <Form.Control placeholder="현재 비밀번호" type="password" />
        </InputGroup>

        <InputGroup className="mb-3">
          <Form.Control placeholder="새 비밀번호 입력" type="password" />
        </InputGroup>

        <InputGroup className="mb-3">
          <Form.Control placeholder="새 비밀번호 확인" type="password" />
        </InputGroup>

        <Button variant="outline-success" id="pwBtn">
          change
        </Button>
      </div>
    </div>
  );
};
