import React, { useState } from "react";
import "./Home.css";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { HiUserCircle } from "react-icons/hi";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import Modal from "react-bootstrap/Modal";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.loginState);

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
        break;
      case 4:
        navigate("/login");
        break;
    }
  };

  const logoutHandler = () => {
    dispatch({ type: "loginSlice/logout" });
    navigate("/");
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
          <h3 onClick={() => movdPage(3)}>게시판</h3>
        </div>
      </div>

      <div className="login">
        {userInfo.id === "" ? (
          <h3 onClick={() => movdPage(4)}>LOGIN</h3>
        ) : (
          <>
            <div onClick={handleShow} style={{ cursor: "pointer" }}>
              <HiUserCircle size={40} color={"#00FF00"} />
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
