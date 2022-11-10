import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { CgPassword } from "react-icons/cg";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
// import { login, logout } from "../app/loginSlice";

export const SignIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const navigateToHome = () => {
      navigate("/");
    };
  
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
  
    const onIDHandler = (e) => {
      setId(e.currentTarget.value);
    };
  
    const onPWHandler = (e) => {
      setPw(e.currentTarget.value);
    };
  
    const onSubmitHandler = (e) => {
      e.preventDefault();
      console.log("submit");
      if (id == "" || pw == "") {
        return alert("아이디 또는 비밀번호를 입력해주세요");
      } else {
        axios
          .post("http://127.0.0.1:8000/login", {
            id: id,
            pw: pw,
          })
          .then(function (response) {
            if (response.data.code === 1) {
              alert(`${id}님 안녕하세요`);
              dispatch({ type: "loginSlice/login", id: id, pw: pw });
              navigateToHome();
            } else {
              alert("아이디 또는 비밀번호가 일치하지 않습니다");
            }
          });
      }
    };

    
  return (
    <div className="loginForm">
      <div className="loginBox">
        <FaRegUserCircle size="24" />
        <input
          placeholder={"아이디를 입력하세요"}
          onChange={onIDHandler}
        />
      </div>
      <form className="loginBox">
        <CgPassword size="24" />
        <input
          placeholder={"비밀번호를 입력하세요"}
          type={"password"}
          autoComplete={"false"}
          onChange={onPWHandler}
        />
      </form>
      <div className="loginBox loginConfirm">
        <Button
          className="signUpConfirmBtn"
          variant="outline-secondary"
          onClick={onSubmitHandler}
        >
          Sign In
        </Button>
      </div>
      <div className="loginBox loginOptions">
        <div className="loginFind">
          <span style={{ marginRight: "10px" }}>아이디 찾기</span>
          <span>비밀번호 찾기</span>
        </div>
      </div>
    </div>
  );
};
