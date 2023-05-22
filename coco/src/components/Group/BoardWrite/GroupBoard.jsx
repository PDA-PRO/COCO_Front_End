import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./WriteGuel.css";
import { Header } from "../../Home/Header";
import { Footer } from "../../Home/Footer";
import { GoPencil } from "react-icons/go";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { WriteFree } from "./WriteFree";
import { WriteHelp } from "./WriteHelp";

export const GroupBoard = () => {
  const { state } = useLocation();
  const [title, setTitle] = useState("");
  const [cate, setCate] = useState(3);

  const onTitleHandler = (e) => {
    setTitle(e.currentTarget.value);
  };

  const onCategoryHandler = (e) => {
    console.log(e.currentTarget.value);
    setCate(e.currentTarget.value);
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
              </Form.Select>
            </FloatingLabel>
          </div>

          <div className="wG_two">
            {cate === 3 ? <WriteFree group_id={state} title={title}/> : <WriteHelp group_id={state} title={title}/>}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
