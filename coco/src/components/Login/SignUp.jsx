import React from "react";
import "./SignUp.css";
import { Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { FaRegUserCircle, FaRegUser } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

axios.defaults.withCredentials = true;

export const SignUp = () => {
  const navigateToLogin = () => {
    window.location.replace("/login");
  };

  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [email, setEmail] = useState("");
  const [checkId, setCheckId] = useState(false); //id 중복 체크
  const [confirm, setConfirm] = useState([true, true, true]); //[이메일, PW, PW확인] 필드의 유효성 값

  const changeConfirm = (idx, value) => {
    let confirmCopy = [...confirm];
    confirmCopy[idx] = value;
    setConfirm(confirmCopy);
  };

  const onNameHandler = (e) => {
    setName(e.currentTarget.value);
  };

  const onIDHandler = (e) => {
    if (id !== e.currentTarget.value) {
      setId(e.currentTarget.value);
      setCheckId(false);
    }
  };

  const checkIDs = (e) => {
    if (id === "") {
      return alert("아이디를 입력하세요");
    } else {
      axios
        .post("http://127.0.0.1:8000/checkids", {
          id: id,
        })
        .then(function (response) {
          if (response.data.code === 1) {
            setCheckId(true);
            return alert(`사용할 수 있는 아이디입니다.`);
          } else {
            setCheckId(false);
            return alert("사용할 수 없는 아이디입니다.");
          }
        });
    }
  };

  const onEmailHandler = (e) => {
    //이메일 유효성 검사
    let regExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (regExp.test(e.currentTarget.value)) {
      setEmail(e.currentTarget.value);
      changeConfirm(0, true);
    } else {
      changeConfirm(0, false);
    }
  };

  const onPWHandler = (e) => {
    let regExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
    if (regExp.test(e.currentTarget.value)) {
      setPw(e.currentTarget.value);
      changeConfirm(1, true);
    } else {
      changeConfirm(1, false);
    }
  };

  const onPWCheckHandler = (e) => {
    if (pw === e.currentTarget.value && confirm[1]) {
      changeConfirm(2, true);
    } else {
      changeConfirm(2, false);
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (name === "" || id === "" || pw === "" || email === "") {
      return alert("필수정보를 입력해주세요");
    } else {
      if (!confirm[0]) {
        return alert("이메일 형식이 올바르지 않습니다.");
      } else if (!confirm[1]) {
        return alert("비밀번호 형식이 올바르지 않습니다.");
      } else if (!confirm[2]) {
        return alert("비밀번호가 일치하지 않습니다.");
      } else {
        axios
          .post("http://127.0.0.1:8000/signup", {
            name: name,
            id: id,
            pw: pw,
            email: email,
            role: 0,
          })
          .then(function (response) {
            if (response.data.code === 1) {
              alert(`${id}님 환영합니다. 로그인을 해주세요`);
              navigateToLogin();
            } else {
              alert("다시 진행해주세요");
            }
          });
      }
    }
  };

  return (
    <form className="loginForm">
      <div className="loginBox" style={{ marginBottom: "20px" }}>
        <FaRegUser size="25" />
        <input placeholder={"이름을 입력하세요"} onBlur={onNameHandler} />
      </div>
      <div className="loginBox" style={{ marginBottom: "20px" }}>
        <FaRegUserCircle size="25" />
        <div className="checkID">
          <input placeholder={"아이디를 입력하세요"} onBlur={onIDHandler} />
          <span onClick={checkIDs} title={"ID 중복 확인"}>
            <IoMdCheckmarkCircleOutline
              size={"25"}
              color={checkId === true ? "#00ff00" : "gray"}
            />
          </span>
        </div>
      </div>
      <div className="loginBox" style={{ marginBottom: "20px" }}>
        <FiMail size="25" />
        <input
          placeholder={"이메일을 입력하세요"}
          onBlur={onEmailHandler}
          style={
            confirm[0]
              ? { backgroundColor: "rgb(236, 236, 236)" }
              : { backgroundColor: "rgb(255 211 211)" }
          }
        />
      </div>
      <div className="loginBox" style={{ marginBottom: "20px" }}>
        <RiLockPasswordLine size="25" />
        <input
          placeholder={"영문자, 숫자, 특수문자 포함 최소 8~15자"}
          type={"password"}
          autoComplete={"false"}
          onBlur={onPWHandler}
          style={
            confirm[1]
              ? { backgroundColor: "rgb(236, 236, 236)" }
              : { backgroundColor: "rgb(255 211 211)" }
          }
        />
      </div>
      <div className="loginBox" style={{ marginBottom: "20px" }}>
        <RiLockPasswordLine size="25" />
        <input
          placeholder={"비밀번호를 확인해주세요"}
          type={"password"}
          autoComplete={"false"}
          onBlur={onPWCheckHandler}
          style={
            confirm[2]
              ? { backgroundColor: "rgb(236, 236, 236)" }
              : { backgroundColor: "rgb(255 211 211)" }
          }
        />
      </div>
      <div className="loginBox loginConfirm">
        <Button
          variant="outline-secondary"
          onClick={onSubmitHandler}
          style={{ marginBottom: "0px", marginTop: "20px" }}
        >
          가입하기
        </Button>
      </div>
    </form>
  );
};
