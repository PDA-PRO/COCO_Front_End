import React, { useState, useRef } from "react";
import "./Home.css";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store";
import {
  AiOutlineMenu,
  AiOutlineArrowDown,
  AiFillExclamationCircle,
} from "react-icons/ai";
import { IoIosArrowDown, IoMdLogOut } from "react-icons/io";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";
import { API } from "api/config";
import { TbMessageCircle2Filled } from "react-icons/tb";

export const Header = (props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.loginState);
  const Large = useMediaQuery({ minWidth: 950 });
  const Small = useMediaQuery({ maxWidth: 949.99999 });

  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const handleClick = () => {
    setShow(!show);
  };

  //img태그의 이미지 불러오기 오류시에 기본이미지로 대체
  const onErrorImg = (e) => {
    e.target.src = "/image/user.png";
  };

  const movdPage = (n, id) => {
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
      case 6:
        navigate(`/mypage/${id}`);
        break;
      case 7:
        navigate(`/room`);
        break;
      case 8:
        navigate(`/manage`);
        break;
      case 9:
        navigate(`/alarm`);
        break;
    }
  };

  const logoutHandler = () => {
    dispatch({ type: "loginSlice/logout" });
    navigate("/");
    // window.location.href = "/";
  };

  const openHandler = () => {
    setOpen(!open);
  };

  return (
    <div
      className="navbar"
      style={
        props.props == 1
          ? {
              backgroundColor: "rgb(199, 199, 199)",
              color: "black",
              border: "none",
            }
          : { backgroundColor: "#fff" }
      }
    >
      {Large && (
        <div className="navBody">
          <div className="leftDiv">
            <div className="titleLogo" onClick={() => movdPage(1)}>
              <img src="/image/logo.png" alt="" />

              <h2>
                <span style={{ color: "#00ff00" }}>C</span>O
                <span style={{ color: "#00ff00" }}>C</span>O
              </h2>
            </div>
            <div className="menus">
              <h3 onClick={() => movdPage(2)}>문제</h3>
              <h3 onClick={() => movdPage(3)}>커뮤니티</h3>
              <h3 onClick={() => movdPage(4)}>채점상황</h3>
              <h3 onClick={() => movdPage(7)}>스터디룸</h3>
            </div>
          </div>

          <div>
            {userInfo.id === "" ? (
              <h3 onClick={() => movdPage(5)}>LOGIN</h3>
            ) : (
              <div ref={ref} onClick={handleClick}>
                <div style={{ cursor: "pointer" }} className="login">
                  {userInfo.alarm > 0 ? (
                    <TbMessageCircle2Filled size={20} id="alarm" />
                  ) : (
                    <div />
                  )}
                  <img
                    src={
                      API.IMAGEDOWNLOAD +
                      "4/" +
                      userInfo.id +
                      ".jpg?time=" +
                      userInfo.imagetoken
                    }
                    onError={onErrorImg}
                    height="45px"
                    width="45px"
                    style={{ borderRadius: "50%" }}
                  />
                  <h3>{userInfo.id}</h3>
                </div>

                <Overlay
                  show={show}
                  target={ref}
                  placement="bottom"
                  container={ref}
                  containerPadding={20}
                >
                  <Popover id="popover-contained">
                    <Popover.Header as="h3">Profile</Popover.Header>
                    <Popover.Body>
                      <div className="bodyOverlay">
                        <img
                          src={
                            API.IMAGEDOWNLOAD +
                            "4/" +
                            userInfo.id +
                            ".jpg?time=" +
                            userInfo.imagetoken
                          }
                          onError={onErrorImg}
                          width="100px"
                          height="100px"
                          style={{ borderRadius: "50%" }}
                        />
                        <IoMdLogOut
                          size={25}
                          color="red"
                          id="toLogout"
                          title="로그아웃"
                          onClick={() => {
                            logoutHandler();
                          }}
                        />
                        <h3>{userInfo.id}</h3>
                        <div className="footerOverlay">
                          <h4
                            onClick={() => {
                              movdPage(6, userInfo.id);
                            }}
                          >
                            My Page
                          </h4>
                          <h4
                            onClick={() => {
                              movdPage(9, userInfo.id);
                            }}
                          >
                            Alarm
                          </h4>
                        </div>
                        {userInfo.role === 1 ? (
                          <h4
                            id="goManage"
                            onClick={() => {
                              movdPage(8);
                            }}
                          >
                            Manage
                          </h4>
                        ) : (
                          <></>
                        )}
                      </div>
                    </Popover.Body>
                  </Popover>
                </Overlay>
              </div>
            )}
          </div>
        </div>
      )}

      {Small && (
        <div className="elseNavBody">
          <div className="always">
            <div className="titleLogo" onClick={() => movdPage(1)}>
              <img src="/image/logo.png" alt="" />
              {/* <img src="/image/cocoLogo.png" alt="" /> */}
              <h2>
                <span style={{ color: "#00ff00" }}>C</span>O
                <span style={{ color: "#00ff00" }}>C</span>O
              </h2>
            </div>
            <div
              className="elseMenu"
              style={{ cursor: "pointer" }}
              onClick={() => openHandler()}
            >
              <ToggleMenu props={open} />
            </div>
          </div>
          {open && (
            <div className="hidingMenu">
              <div className="rightSideMenu">
                <h3 onClick={() => movdPage(2)}>문제</h3>
                <h3 onClick={() => movdPage(3)}>커뮤니티</h3>
                <h3 onClick={() => movdPage(4)}>채점상황</h3>
                <h3 onClick={() => movdPage(7)}>스터디룸</h3>
              </div>
              <div>
                {userInfo.id === "" ? (
                  <h3 onClick={() => movdPage(5)}>LOGIN</h3>
                ) : (
                  <div ref={ref} onClick={handleClick}>
                    <div style={{ cursor: "pointer" }} className="login">
                      {userInfo.alarm > 0 ? (
                        <TbMessageCircle2Filled size={20} id="alarm" />
                      ) : (
                        <div />
                      )}

                      <img
                        src={
                          API.IMAGEDOWNLOAD +
                          "4/" +
                          userInfo.id +
                          ".jpg?time=" +
                          userInfo.imagetoken
                        }
                        onError={onErrorImg}
                        height="55px"
                        width="55px"
                        style={{ borderRadius: "50%" }}
                      />
                      <h3 style={{ fontSize: "1.4em" }}>{userInfo.id}</h3>
                    </div>

                    <Overlay
                      show={show}
                      target={ref}
                      placement="bottom"
                      container={ref}
                      containerPadding={20}
                    >
                      <Popover id="popover-contained">
                        <Popover.Header as="h3">Profile</Popover.Header>
                        <Popover.Body>
                          <div className="bodyOverlay">
                            <img src="/image/user.png" alt="" width="80px" />
                            <IoMdLogOut
                              size={25}
                              color="red"
                              id="toLogout"
                              title="로그아웃"
                              onClick={() => {
                                logoutHandler();
                              }}
                            />
                            <h3>{userInfo.id}</h3>
                            <div className="footerOverlay">
                              <h4
                                onClick={() => {
                                  movdPage(6, userInfo.id);
                                }}
                              >
                                My Page
                              </h4>
                              <h4
                                onClick={() => {
                                  movdPage(9, userInfo.id);
                                }}
                              >
                                Alarm
                              </h4>
                            </div>
                            {userInfo.role === 1 ? (
                              <h4
                                id="goManage"
                                onClick={() => {
                                  movdPage(8);
                                }}
                              >
                                Manage
                              </h4>
                            ) : (
                              <></>
                            )}
                          </div>
                        </Popover.Body>
                      </Popover>
                    </Overlay>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const ToggleMenu = (props) => {
  if (props.props == false) return <AiOutlineMenu size={40} />;
  else return <IoIosArrowDown size={35} color="gray" />;
};
