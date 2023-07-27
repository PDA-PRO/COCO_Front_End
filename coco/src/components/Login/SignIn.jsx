import React, { useRef } from "react";
import { FaRegUserCircle, FaRegUser } from "react-icons/fa";
import { CgPassword } from "react-icons/cg";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store";
import Modal from "react-bootstrap/Modal";
import { FiMail } from "react-icons/fi";
import { HiOutlineIdentification } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import qs from "qs";
import jwtdecode from "../../app/jwtdecode";
import Form from "react-bootstrap/Form";

export const SignIn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
  };

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [idmodalShow, setIdModalShow] = useState(false);
  const [emailmodalShow, setEmailModalShow] = useState(false);
  const [autologin, setautologin] = useState(false);

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
          "http://127.0.0.1:8000/login?autologin=" + autologin,
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
            let jwt_name = jwtdecode(response.data.access_token).name;
            let jwt_exp = jwtdecode(response.data.access_token).user_exp;
            let jwt_level = jwtdecode(response.data.access_token).level;
            dispatch({
              type: "loginSlice/login",
              access_token: response.data.access_token,
              token_type: response.data.token_type,
              id: jwt_id,
              name: jwt_name,
              role: jwt_role,
              exp: jwt_exp,
              level: jwt_level,
              imagetoken: new Date().getTime(),
            });
            navigateToHome();
          }
        })
        .catch(() => alert("아이디 또는 비밀번호가 일치하지 않습니다"));
    }
  };

  return (
    <>
      <div className="loginForm">
        <div className="loginBox" style={{ marginBottom: "30px" }}>
          <FaRegUserCircle size="24" />
          <input placeholder={"ID"} onChange={onIDHandler} />
        </div>
        <form
          className="loginBox"
          style={{ marginBottom: "10px" }}
          onSubmit={onSubmitHandler}
        >
          <CgPassword size="24" />
          <input
            placeholder={"PASSWORD"}
            type={"password"}
            autoComplete={"false"}
            onChange={onPWHandler}
          />
        </form>
        <div className="loginBox loginAuto">
          <Form.Check
            type="checkBox"
            id="custom-switch"
            // label="자동 로그인"
            onClick={() => {
              setautologin(!autologin);
            }}
          />
          <p>자동 로그인</p>
        </div>
        <div className="loginBox loginConfirm">
          <Button
            className="signUpConfirmBtn"
            variant="outline-secondary"
            onClick={onSubmitHandler}
          >
            로그인
          </Button>
        </div>

        <div className="loginBox loginOptions">
          <span
            style={{ marginRight: "10px", cursor: "pointer" }}
            onClick={() => {
              setIdModalShow(true);
            }}
          >
            아이디 찾기
          </span>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              setEmailModalShow(true);
            }}
          >
            비밀번호 재설정
          </span>
        </div>
      </div>

      <FindIdModal
        show={idmodalShow}
        onHide={() => {
          setIdModalShow(false);
        }}
      />
      <FindEmailModal
        show={emailmodalShow}
        onHide={() => {
          setEmailModalShow(false);
        }}
      />
    </>
  );
};

const FindIdModal = (props) => {
  const nameRef = useRef();
  const emailRef = useRef();
  const [id, setId] = useState("");

  const idHandler = () => {
    axios
      .get("http://127.0.0.1:8000/findid", {
        params: {
          name: nameRef.current.value,
          email: emailRef.current.value,
        },
      })
      .then((res) => {
        if (res.data.code == 0) {
          setId("일치하는 사용자 정보가 없습니다");
        } else {
          setId(`아이디는 ${res.data.code} 입니다`);
        }
      })
      .catch(() => {
        setId(`이메일 형식이 틀립니다.`);
      });
  };
  return (
    <Modal
      onShow={() => setId("")}
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          아이디 찾기
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="loginBox">
          <FaRegUser size="25" />
          <input ref={nameRef} placeholder={"이름을 입력하세요"} />
        </div>
        <div className="loginBox">
          <FiMail size="25" />
          <input ref={emailRef} placeholder={"이메일을 입력하세요"} />
        </div>
        {id ? (
          <div className="loginBox">
            <HiOutlineIdentification size="25" />
            <input style={{ color: "black" }} disabled value={id} />
          </div>
        ) : (
          <></>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={idHandler}>확인하기</Button>
      </Modal.Footer>
    </Modal>
  );
};

const FindEmailModal = (props) => {
  const idRef = useRef();
  const pwRef = useRef();
  const pw2Ref = useRef();
  const [result, setResult] = useState("");

  const Handler = () => {
    if (pwRef.current.value == pw2Ref.current.value) {
      axios
        .patch(
          "http://127.0.0.1:8000/pw/",
          {},
          {
            params: {
              pw: pwRef.current.value,
              id: idRef.current.value,
            },
          }
        )
        .then((res) => {
          setResult("비밀번호를 재설정했습니다.");
        })
        .catch(({ response }) => {
          console.log(response);
          if (response.status == 404) {
            setResult("존재하는 id가 아닙니다.");
          } else if (response.status == 422) {
            setResult(
              "비밀번호는 영어, 숫자, 특수기호를 포함하고 8-15 길이여야합니다."
            );
          }
        });
    } else {
      setResult("비밀번호가 일치하지 않습니다.");
    }
  };
  return (
    <Modal
      onShow={() => setResult("")}
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          비밀번호 재설정
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="loginBox">
          <FaRegUser size="25" />
          <input ref={idRef} placeholder={"id를 입력하세요"} />
        </div>
        <div className="loginBox">
          <FiMail size="25" />
          <input
            type="password"
            ref={pwRef}
            placeholder={"새로운 비밀번호를 입력하세요"}
          />
        </div>
        <div className="loginBox">
          <FiMail size="25" />
          <input
            type="password"
            ref={pw2Ref}
            placeholder={"비밀번호를 재입력하세요"}
          />
        </div>
        {result ? (
          <div className="loginBox">
            <HiOutlineIdentification size="25" />
            <input style={{ color: "black" }} disabled value={result} />
          </div>
        ) : (
          <></>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={Handler}>확인하기</Button>
      </Modal.Footer>
    </Modal>
  );
};
