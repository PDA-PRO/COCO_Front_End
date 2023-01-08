import React from "react";
import { FaRegUserCircle, FaRegUser } from "react-icons/fa";
import { CgPassword } from "react-icons/cg";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store";
import Modal from "react-bootstrap/Modal";
import { FiMail } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import qs from "qs";
import jwtdecode from "../../app/jwtdecode";

export const SignIn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
  };

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [modalShow, setModalShow] = React.useState(false);
  const [find, setFind] = useState(0);

  const onIDHandler = (e) => {
    setId(e.currentTarget.value);
  };

  const onPWHandler = (e) => {
    setPw(e.currentTarget.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (id === "" || pw === "") {
      return alert("아이디 또는 비밀번호를 입력해주세요");
    } else {
      axios
        .post(
          "http://127.0.0.1:8000/login",
          qs.stringify({
            grant_type: "",
            username: id,
            password: pw,
            scope: "",
            client_id: "",
            client_secret: "",
          })
        )
        .then(function (response) {
          if (response.status == 200) {
            alert(`${id}님 안녕하세요`);
            let jwt_role = jwtdecode(response.data.access_token).role;
            let jwt_id = jwtdecode(response.data.access_token).sub;
            dispatch({
              type: "loginSlice/login",
              access_token: response.data.access_token,
              token_type: response.data.token_type,
              id: jwt_id,
              role: jwt_role,
            });
            navigateToHome();
          } else {
            alert("아이디 또는 비밀번호가 일치하지 않습니다");
          }
        });
    }
  };

  return (
    <>
      <div className="loginForm">
        <div className="loginBox">
          <FaRegUserCircle size="24" />
          <input placeholder={"아이디를 입력하세요"} onChange={onIDHandler} />
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
          <span
            style={{ marginRight: "10px", cursor: "pointer" }}
            onClick={() => {
              setModalShow(true);
              setFind(1);
            }}
          >
            아이디 찾기
          </span>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              setModalShow(true);
              setFind(2);
            }}
          >
            비밀번호 찾기
          </span>
        </div>
      </div>

      <FindInfoModal
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          setFind(0);
        }}
        num={find}
      />
    </>
  );
};

function FindInfoModal(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");

  const onNameHandler = (e) => {
    setName(e.currentTarget.value);
  };

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  const onIDHandler = (e) => {
    setId(e.currentTarget.value);
  };

  const onSubmitHandler = () => {
    if (props.num === 1) {
      if (name !== "" && email !== "") {
        axios
          .post("http://127.0.0.1:8000/findid", {
            name: name,
            email: email,
          })
          .then((res) => {
            if (res.data.code == 0) {
              return alert(`일치하는 사용자 정보가 없습니다`);
            } else {
              return alert(`아이디는 ${res.data.code} 입니다`);
            }
          });
      } else {
        return;
      }
    } else if (props.num === 2) {
      if (name !== "" && email !== "" && id !== "") {
        axios
          .post("http://127.0.0.1:8000/findpw", {
            name: name,
            id: id,
            email: email,
          })
          .then((res) => {
            if (res.data.code == 0) {
              return alert(`일치하는 사용자 정보가 없습니다`);
            } else {
              return alert(`비밀번호는 ${res.data.code} 입니다`);
            }
          });
      } else {
        return;
      }
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.num === 1
            ? "아이디 찾기"
            : props.num === 2
            ? "비밀번호 찾기"
            : ""}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.num === 1 ? (
          <></>
        ) : (
          <div className="loginBox">
            <FaRegUserCircle size="25" />
            <input placeholder={"아이디을 입력하세요"} onChange={onIDHandler} />
          </div>
        )}
        <div className="loginBox">
          <FaRegUser size="25" />
          <input placeholder={"이름을 입력하세요"} onChange={onNameHandler} />
        </div>
        <div className="loginBox">
          <FiMail size="25" />
          <input
            placeholder={"이메일을 입력하세요"}
            onChange={onEmailHandler}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            props.onHide();
            onSubmitHandler();
          }}
        >
          확인하기
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
