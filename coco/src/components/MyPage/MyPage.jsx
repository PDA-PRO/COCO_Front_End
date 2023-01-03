import React from "react";
import { Header } from "../Home/Header";
import { Footer } from "../Home/Footer";
import "./MyPage.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { useEffect } from "react";
import { IoMdSchool } from "react-icons/io";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { SecondBox } from "./SecondBox";
import { IoInformationCircleOutline } from "react-icons/io5";
import { BsGraphUp } from "react-icons/bs";

export const MyPage = () => {
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
    <>
      <Header />
      <div className="myPage">
        <h2>
          <span>
            <IoInformationCircleOutline
              size={30}
              color="green"
              style={{ paddingBottom: "3px", marginRight: "8px" }}
            />
          </span>
          회원 정보
        </h2>
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

              <label onClick={() => deleteFileImage()}>
                기본 이미지로 설정
              </label>
            </div>
          </div>

          <div className="txtInputBox">
            <div className="ip1">
              <IoMdSchool size={33} />
              <p>학생</p>
            </div>
            <InputGroup className="mb-3">
              <Form.Control placeholder="user-Name" />
              <Button variant="outline-success" id="button-addon2">
                변경
              </Button>
            </InputGroup>
            <InputGroup className="mb-3">
              <Form.Control placeholder="user-Email" />
              <Button variant="outline-success" id="button-addon2">
                변경
              </Button>
            </InputGroup>
          </div>
        </div>
        <h2>
          <span>
            <BsGraphUp
              size={27}
              color="green"
              style={{ paddingBottom: "3px", marginRight: "13px" }}
            />
          </span>
          내 역량
        </h2>
        <SecondBox />
        <h2>내 게시글</h2>
      </div>
      <Footer />
    </>
  );
};
