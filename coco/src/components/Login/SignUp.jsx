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
  const [confirm, setConfirm] = useState("");

  const [checkId, setCheckId] = useState(false);

  const onNameHandler = (e) => {
    setName(e.currentTarget.value);
  };

  const onIDHandler = (e) => {
    setId(e.currentTarget.value);
  };

  const checkIDs = (e) => {
    if (id === "") {
      return alert("아이디를 입력하세요");
    } else {
      console.log(id);
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
    setEmail(e.currentTarget.value);
  };

  const onPWHandler = (e) => {
    setPw(e.currentTarget.value);
  };

  const onConfirmHandler = (e) => {
    setConfirm(e.currentTarget.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("submit");
    if (name === "" || id === "" || pw === "" || email === "") {
      return alert("필수정보를 입력해주세요");
    } else {
      if (pw !== confirm) {
        return alert("비밀번호가 일치하지 않습니다");
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
              alert(`${id}님 환영합니다`);
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
        <input placeholder={"이름을 입력하세요"} onChange={onNameHandler} />
      </div>
      <div className="loginBox" style={{ marginBottom: "20px" }}>
        <FaRegUserCircle size="25" />
        <div className="checkID">
          <input placeholder={"아이디를 입력하세요"} onChange={onIDHandler} />
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
        <input placeholder={"이메일을 입력하세요"} onChange={onEmailHandler} />
      </div>
      <div className="loginBox" style={{ marginBottom: "20px" }}>
        <RiLockPasswordLine size="25" />
        <input
          placeholder={"영문자, 숫자, 특수문자 포함 최소 8~20자"}
          type={"password"}
          autoComplete={"false"}
          onChange={onPWHandler}
        />
      </div>
      <div className="loginBox" style={{ marginBottom: "20px" }}>
        <RiLockPasswordLine size="25" />
        <input
          placeholder={"비밀번호를 확인해주세요"}
          type={"password"}
          autoComplete={"false"}
          onChange={onConfirmHandler}
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
