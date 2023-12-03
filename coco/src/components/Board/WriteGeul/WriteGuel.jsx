import React from "react";
import "./WriteGuel.css";
import { Header } from "../../Home/Header";
import { Footer } from "../../Home/Footer";
import { GoPencil } from "react-icons/go";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { Free } from "./Free";
import { Help } from "./Help";
import { useAppSelector } from "../../../app/store";

export const WriteGeul = () => {
  const userInfo = useAppSelector((state) => state.loginState);
  const [title, setTitle] = useState("");
  const [cate, setCate] = useState(3);

  const onTitleHandler = (e) => {
    setTitle(e.currentTarget.value);
  };

  const onCategoryHandler = (e) => {
    setCate(e.currentTarget.value);
  };

  const writeBoard = () => {
    if (cate == 2) {
      return <Help title={title} />;
    } else {
      return <Free title={title} cate={cate} />;
    }
  };

  return (
    <>
      <Header />
      <div className="writeGuel">
        <div className="WGBody">
          <div className="wG_Head">
            <GoPencil size={30} />
            <h2>글쓰기</h2>
          </div>
          <div className="wG_one">
            <Form.Control
              as="textarea"
              id="wG_Title"
              style={{ height: "58px" }}
              placeholder="제목을 입력해주세요"
              onChange={onTitleHandler}
            />

            <FloatingLabel
              id="selectCate"
              controlId="floatingSelect"
              label="게시글 카테고리 선택"
            >
              <Form.Select aria-label="F" onChange={onCategoryHandler}>
                <option value="3">자유</option>
                <option value="2">HELP</option>
                {userInfo.role == 1 ? <option value="1">공지</option> : <></>}
              </Form.Select>
            </FloatingLabel>
          </div>

          <div className="wG_two">{writeBoard()}</div>
        </div>
      </div>

      <Footer />
    </>
  );
};
