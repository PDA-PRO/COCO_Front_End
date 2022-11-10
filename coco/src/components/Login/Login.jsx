import React from "react";
import "./SignUp.css";
import { FaRegUserCircle } from "react-icons/fa";
import { CgPassword } from "react-icons/cg";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {login, logout} from "../../app/loginSlice"

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector(state =>state.loginState.id);

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
            dispatch({type: "loginSlice/login", id: id, pw:pw})
            console.log(userId);
            // navigateToHome();
          } else {
            alert("아이디 또는 비밀번호가 일치하지 않습니다");
          }
        });
    }
  };

  return (
    <div className="loginForm">
      <h3>Sign In</h3>
      <div className="signUpContainer">
        <div className="signUpBox">
          <FaRegUserCircle size="24" />
          <input
            placeholder={"아이디를 입력하세요"}
            id="IdInput"
            onChange={onIDHandler}
          />
        </div>
        <div className="signUpBox">
          <CgPassword size="24" />
          <input
            placeholder={"비밀번호를 입력하세요"}
            type={"password"}
            onChange={onPWHandler}
          />
        </div>
        <div className="signUpConfirm">
          <Button
            className="signUpConfirmBtn"
            variant="outline-secondary"
            onClick={onSubmitHandler}
          >
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
};
