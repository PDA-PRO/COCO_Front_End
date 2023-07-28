import React from "react";
import "./MyPage.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { useRef } from "react";
import { IoMdSchool } from "react-icons/io";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { IoMailOutline } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRunning } from "react-icons/fa";
import axios from "axios";
import { useAppSelector, useAppDispatch } from "../../app/store";

export const FirstBox = (props) => {
  const userInfo = useAppSelector((state) => state.loginState);
  const dispatch = useAppDispatch();
  const path = window.location.pathname.split("/");

  var me = userInfo.id;
  var now = path.at(-1);

  const refEmail = useRef(null);
  const refNowPW = useRef(null);
  const refNewPW = useRef(null);
  const refconfirmNewPW = useRef(null);
  const [fileImage, setFileImage] = useState(userInfo.imagetoken);
  const saveFileImage = (e) => {
    axios
      .post(
        "http://localhost:8000/image/upload-temp",
        {
          file: e.target.files[0],
        },
        {
          headers: {
            "Content-Type": `multipart/form-data; `,
            Authorization: "Bearer " + userInfo.access_token,
          },
          params: {
            type: 4,
          },
        }
      )
      .then(function (response) {
        var new_imgaetoken = new Date().getTime();
        dispatch({
          type: "loginSlice/changimage",
          imagetoken: new_imgaetoken,
        });
        console.log("이미지 변경", response);
        setFileImage(new_imgaetoken);
      })
      .catch(function (res) {
        console.log(res);
      });
  };

  //img태그의 이미지 불러오기 오류시에 기본이미지로 대체
  const onErrorImg = (e) => {
    e.target.src = "/image/user.png";
  };

  // 파일 삭제
  const deleteFileImage = () => {
    axios
      .delete("http://localhost:8000/image/delete-image", {
        headers: {
          Authorization: "Bearer " + userInfo.access_token,
        },
      })
      .then(function () {
        var new_imgaetoken = new Date().getTime();
        dispatch({
          type: "loginSlice/changimage",
          imagetoken: new_imgaetoken,
        });
        setFileImage(new_imgaetoken);
        alert("이미지 삭제 성공");
      })
      .catch(function (res) {
        console.log(res);
      });
  };

  const changeEmail = () => {
    let email = refEmail.current.value;
    if (email === null || email == "") {
      alert("온전한 이메일을 입력해주세요.");
    } else {
      axios
        .post(
          "http://127.0.0.1:8000/changeEmail/",
          {
            user_id: props.props.id,
            new_info: email,
          },
          {
            headers: { Authorization: "Bearer " + userInfo.access_token },
          }
        )
        .then(function (response) {
          if (response.data === 1) {
            alert("이메일이 변경되었습니다.");
          } else {
            alert("ERROR - SERVER COMMUNICATION FAILED");
          }
        })
        .catch(function (res) {
          if (res.data.status === 401) {
            alert("401 ERROR");
          }
        });
    }
  };

  const changePW = () => {
    let inputNow = refNowPW.current.value;
    let inputNew = refNewPW.current.value;
    let confirmNew = refconfirmNewPW.current.value;
    if (inputNew === null || inputNow === null || confirmNew === null) {
      alert("완전히 입력해주세요");
    } else {
      if (inputNew != confirmNew) {
        alert("변경하려는 비밀번호 확인이 틀렸습니다.");
      } else {
        axios
          .post(
            "http://127.0.0.1:8000/changePW/",
            {
              user_id: props.props.id,
              new_info: inputNew,
            },
            {
              headers: { Authorization: "Bearer " + userInfo.access_token },
            }
          )
          .then(function (response) {
            if (response.data === 1) {
              alert("비밀번호가 변경되었습니다.");
            } else {
              alert("ERROR - SERVER COMMUNICATION FAILED");
            }
          });
      }
    }
  };

  return (
    <div className="mp-infoBox">
      <div className="picBox">
        <>
          <img
            onError={onErrorImg}
            src={
              "http://localhost:8000/image/download/4/" +
              userInfo.id +
              ".jpg?time=" +
              fileImage
            }
            className="userImg"
          />
        </>
        {me === now ? (
          <div className="picSelect">
            <label htmlFor="imgUpload">프로필 사진 변경</label>
            <input
              id="imgUpload"
              name="imgUpload"
              type="file"
              accept="image/*"
              onChange={saveFileImage}
              style={{
                display: "none",
              }}
            />

            <label onClick={() => deleteFileImage()}>기본 이미지로 설정</label>
          </div>
        ) : (
          <>
            <h2 style={{ paddingTop: 10, paddingLeft: 0 }}>{now}</h2>
          </>
        )}
      </div>

      <div className="levelField">
        <h3>Level 3</h3>
        <p>다음 레벨까지 100pts</p>
      </div>

      {me === now ? (
        <div className="txtInputBox">
          <h3>
            <span>
              <IoMailOutline
                size={23}
                color="green"
                style={{ marginRight: "10px" }}
              />
            </span>
            이메일 변경
          </h3>
          <InputGroup className="mb-3">
            <Form.Control placeholder={`${props.props.email}`} ref={refEmail} />
            <Button
              variant="outline-success"
              id="button-addon2"
              onClick={() => changeEmail()}
            >
              변경
            </Button>
          </InputGroup>

          <h3 style={{ marginTop: "12px" }}>
            <span>
              <RiLockPasswordLine
                size={22}
                color="green"
                style={{ marginRight: "10px" }}
              />
            </span>
            비밀번호 변경
          </h3>

          <InputGroup className="mb-3">
            <Form.Control
              placeholder="현재 비밀번호"
              type="password"
              ref={refNowPW}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <Form.Control
              placeholder="새 비밀번호 입력"
              type="password"
              ref={refNewPW}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <Form.Control
              placeholder="새 비밀번호 확인"
              type="password"
              ref={refconfirmNewPW}
            />
          </InputGroup>

          <Button
            variant="outline-success"
            id="pwBtn"
            onClick={() => changePW()}
          >
            change
          </Button>
        </div>
      ) : (
        <>
          <p> </p>
        </>
      )}
    </div>
  );
};
