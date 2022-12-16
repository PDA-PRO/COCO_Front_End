import React, { useState } from "react";
import "./Home.css";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { HiUserCircle } from "react-icons/hi";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import Modal from "react-bootstrap/Modal";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.loginState);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const movdPage = (n) => {
    switch (n) {
      case 1:
        navigate("/");
        break;
      case 2:
        navigate("/problems");
        break;
      case 3:
        navigate("/board");
        break;
      case 4:
        navigate("/status");
        break;
      case 5:
        navigate("/login");
        break;
    }
  };
  console.log(userInfo);

  const logoutHandler = () => {
    dispatch({ type: "loginSlice/logout" });
    navigate("/");
    // window.location.href = "/";
  };

  return (
    <div className="navbar">
      <div className="leftDiv">
        <div className="titleLogo" onClick={() => movdPage(1)}>
          <img src="/image/logo.png" alt="" />
          <h2>COCO</h2>
        </div>
        <div className="menus">
          <h3 onClick={() => movdPage(2)}>문제</h3>
          <h3 onClick={() => movdPage(3)}>커뮤니티</h3>
          <h3 onClick={() => movdPage(4)}>채점상황</h3>
        </div>
      </div>

      <div>
        {userInfo.id === "" ? (
          <h3 onClick={() => movdPage(5)}>LOGIN</h3>
        ) : (
          <>
            <div
              onClick={handleShow}
              style={{ cursor: "pointer" }}
              className="login"
            >
              <HiUserCircle size={40} color={"#00FF00"} />
              <h3>{userInfo.id}</h3>
            </div>

            <Modal show={show} onHide={handleClose}>
              <Modal.Body>로그아웃 하시겠습니까?</Modal.Body>
              <Modal.Footer className="logoutModal">
                <AiOutlineCloseCircle onClick={handleClose} size={30} />
                <AiOutlineCheckCircle
                  onClick={() => {
                    handleClose();
                    logoutHandler();
                  }}
                  size={30}
                />
              </Modal.Footer>
            </Modal>
          </>
        )}
      </div>
    </div>
  );
};
