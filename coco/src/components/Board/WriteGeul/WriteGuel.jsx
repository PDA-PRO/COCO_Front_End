import React from "react";
import "./WriteGuel.css";
import { Header } from "../../Home/Header";
import { Footer } from "../../Home/Footer";
import { GoPencil } from "react-icons/go";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useState } from "react";
import { Free } from "./Free";
import { Help } from "./Help";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

export const WriteGeul = () => {
  const navigate = useNavigate();

  const movePage = () => {
    navigate("/board");
  };
  const [title, setTitle] = useState("");
  const [cate, setCate] = useState(1);
  const [context, setContext] = useState("");
  const userInfo = useSelector((state) => state.loginState);

  const onTitleHandler = (e) => {
    setTitle(e.currentTarget.value);
  };

  const onCategoryHandler = (e) => {
    setCate(e.currentTarget.value);
  };

  const onContextHandler = (e) => {
    setContext(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("shoot");
    if (title == "" || context == "") {
      return alert("완전히 입력해주세요.");
    } else {
      axios
        .post("http://127.0.0.1:8000/fastWrite/", {
          user_id: userInfo.id,
          title: title,
          //category: cate,
          context: context,
        })
        .then(function (response) {
          if (response.data.code === 1) {
            alert(`게시글 업로드 성공`);
            movePage();
          } else {
            alert("ERROR - SERVER COMMUNICATION FAILED");
          }
        });
    }
  };

  return (
    <>
      <Header />
      <div className="writeGuel">
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
              <option>Category</option>
              <option value="2">HELP</option>
              <option value="3">자유</option>
            </Form.Select>
          </FloatingLabel>
        </div>

        <div className="wG_two">
          {cate == 2 ? (
            <Help />
          ) : (
            <Free onContextHandler={onContextHandler} onSubmit={onSubmit} />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
