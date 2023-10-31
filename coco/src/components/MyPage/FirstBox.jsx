import React, { Suspense, useState, useRef } from "react";
import "./MyPage.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { IoMailOutline } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";
import { useAppSelector, useAppDispatch } from "../../app/store";
import { API } from "api/config";
import fetchData from "../../api/fetchTask";
import Spinner from "react-bootstrap/Spinner";
import Swal from "sweetalert2";
import axios from "axios";
import { Notfound } from "../Notfound.jsx";

export const FirstBox = (props) => {
  const userInfo = useAppSelector((state) => state.loginState);
  const dispatch = useAppDispatch();
  const path = decodeURI(window.location.pathname).split("/");

  var me = userInfo.id;
  var now = path.at(-1);

  const refEmail = useRef(null);
  const refNowPW = useRef(null);
  const refNewPW = useRef(null);
  const refconfirmNewPW = useRef(null);
  const [fileImage, setFileImage] = useState(userInfo.imagetoken);

  const level = props.level;

  const saveFileImage = (e) => {
    axios
      .post(
        API.IMAGEUPLOAD,
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
        Swal.fire({ icon: "success", title: "프로필 사진이 변경되었습니다." });
        setFileImage(new_imgaetoken);
      })
      .catch(function (res) {
        Swal.fire({ icon: "error", title: "프로필 사진 변경에 실패했습니다." });
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
      .delete(API.IMAGEDELETE, {
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
        Swal.fire({ icon: "success", title: "기본 이미지로 변경되었습니다." });
      })
      .catch(function (res) {
        console.log(res);
      });
  };

  const changeEmail = () => {
    let email = refEmail.current.value;
    if (email === null || email == "") {
      Swal.fire({ icon: "error", title: "온전한 이메일을 입력해주세요" });
    } else {
      axios
        .patch(
          API.USER,
          { email: email },
          {
            headers: { Authorization: "Bearer " + userInfo.access_token },
          }
        )
        .then(function (response) {
          if (response.data.code === 1) {
            Swal.fire({ icon: "success", title: "이메일이 변경되었습니다." });
          } else {
            Swal.fire({
              icon: "error",
              title: "ERROR - SERVER COMMUNICATION FAILED",
            });
          }
        })
        .catch(function (res) {
          if (res.data.status === 401) {
            Swal.fire({
              icon: "error",
              title: "ERROR - SERVER COMMUNICATION FAILED",
            });
          }
        });
    }
  };

  const changePW = () => {
    let inputNow = refNowPW.current.value;
    let inputNew = refNewPW.current.value;
    let confirmNew = refconfirmNewPW.current.value;
    if (inputNew === null || inputNow === null || confirmNew === null) {
      Swal.fire({ icon: "error", title: "입력이 완전하지 않습니다." });
    } else {
      if (inputNew != confirmNew) {
        Swal.fire({
          icon: "error",
          title: "변경하려는 비밀번호가 일치하지 않습니다.",
        });
      } else {
        axios
          .patch(
            API.USER,
            { pw: inputNew, cur_pw: inputNow },
            {
              headers: { Authorization: "Bearer " + userInfo.access_token },
            }
          )
          .then(function (response) {
            if (response.data.code === 1) {
              Swal.fire({
                icon: "success",
                title: "비밀번호가 변경되었습니다.",
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "ERROR - SERVER COMMUNICATION FAILED",
              });
            }
          })
          .catch(function (res) {
            Swal.fire({
              icon: "error",
              title: "ERROR - SERVER COMMUNICATION FAILED",
            });
          });
      }
    }
  };

  return (
    <>
      {me === now ? (
        <div className="mp-infoBox">
          <div className="picBox">
            <>
              <img
                onError={onErrorImg}
                src={
                  API.IMAGEDOWNLOAD +
                  "4/" +
                  userInfo.id +
                  ".jpg?time=" +
                  fileImage
                }
                className="userImg"
              />
            </>

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

              <label onClick={() => deleteFileImage()}>
                기본 이미지로 설정
              </label>
            </div>
          </div>

          <div className="levelField">
            <h3>Level {level.level}</h3>
            <p>다음 레벨까지 {level.points}pts</p>
          </div>

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
              <Form.Control
                placeholder={`${props.props.email}`}
                ref={refEmail}
              />
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
        </div>
      ) : (
        <div className="notme">
          <div className="picBox">
            <>
              <img
                onError={onErrorImg}
                src={API.IMAGEDOWNLOAD + "4/" + now + ".jpg?time=" + fileImage}
                className="userImg"
              />
            </>

            <p>{now}</p>
          </div>

          <div className="levelShow">
            <h3>Level {level.level}</h3>
            <p>다음 레벨까지 {level.points}pts</p>
          </div>
        </div>
      )}
    </>
  );
};
