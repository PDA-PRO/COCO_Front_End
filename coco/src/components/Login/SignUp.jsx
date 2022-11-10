import React from "react";
import "./SignUp.css";
//import "./Home.css";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { CgPassword } from "react-icons/cg";

axios.defaults.withCredentials = true;

export const SignUp = () => {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login");
  };

  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [confirm, setConfirm] = useState("");

  const [student, setStudent] = useState(false);
  const [teacher, setTeacher] = useState(false);

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
            return alert(`사용할 수 있는 아이디입니다.`);
          } else {
            return alert("사용할 수 없는 아이디입니다.");
          }
        });
    }
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
    if (name == "" || id == "" || pw == "") {
      return alert("필수정보를 입력해주세요");
    } else {
      if (pw != confirm) {
        return alert("비밀번호가 일치하지 않습니다");
      } else if (student == false && teacher == false) {
        return alert("유형을 선택해주세요");
      } else {
        axios
          .post("http://127.0.0.1:8000/signup", {
            name: name,
            id: id,
            pw: pw,
            type: student == true ? 1 : 2,
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

  const radioHandler1 = (e) => {
    setStudent(!student);
    setTeacher(false);
  };
  const radioHandler2 = (e) => {
    setTeacher(!teacher);
    setStudent(false);
  };

  return (
    <div className="signUpForm">
      <div className="signUpLeft">회원가입 문구</div>
      <div className="signUpRight">
        <h3>Sign Up</h3>
        <div className="signUpContainer">
          <div className="signUpBox">
            <FaRegUserCircle size="24" />
            <input
              placeholder={"이름을 입력하세요"}
              id="IdInput"
              onChange={onNameHandler}
            />
          </div>
          <div className="signUpBox signUpID">
            <FaRegUser size="24"/>
            <input
              placeholder={"아이디를 입력하세요"}
              onChange={onIDHandler}
            />
            <button onClick={checkIDs}>중복확인</button>
          </div>
          <div className="signUpBox">
            <CgPassword size="24" />
            <input
              placeholder={"영문자, 숫자, 특수문자 포함 최소 8~20자"}
              type={"password"}
              onChange={onPWHandler}
            />
          </div>
          <div className="signUpBox">
            <RiLockPasswordLine size="24" />
            <input
              placeholder={"비밀번호를 확인해주세요"}
              type={"password"}
              onChange={onConfirmHandler}
            />
          </div>
          <div className="siguUpBox signUpTypes">
            <div className="signUpType">
              <label>학생</label>
              <input
                type={"radio"}
                onChange={radioHandler1}
                checked={student}
              />
            </div>
            <div className="signUpType">
              <label>선생님</label>
              <input
                type={"radio"}
                onChange={radioHandler2}
                checked={teacher}
              />
            </div>
          </div>
          <div className="signUpConfirm">
            <Button
              className="signUpConfirmBtn"
              variant="outline-secondary"
              onClick={onSubmitHandler}
            >
              가입하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
