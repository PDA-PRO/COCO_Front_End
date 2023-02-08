import React, { useState, useRef } from "react";
import "./Home.css";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { AiOutlineMenu, AiOutlineArrowDown } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";

export const Header = (props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.loginState);
  const Large = useMediaQuery({ minWidth: 950 });
  const Small = useMediaQuery({ maxWidth: 949.99999 });

  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  const handleShow = () => setShow(true);

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
              {/* <img src="/image/cocoLogo.png" alt="" /> */}
              <h2>
                <span style={{ color: "#00ff00" }}>C</span>O
                <span style={{ color: "#00ff00" }}>C</span>O
              </h2>
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
              <div ref={ref} onClick={handleClick}>
                <div
                  onClick={handleShow}
                  style={{ cursor: "pointer" }}
                  className="login"
                >
                  <img src="/image/user.png" alt="" height="45px" />
                  <h3>{userInfo.id}</h3>
                </div>

                <Overlay
                  show={show}
                  target={target}
                  placement="bottom"
                  container={ref}
                  containerPadding={20}
                >
                  <Popover id="popover-contained">
                    <Popover.Header as="h3">Profile</Popover.Header>
                    <Popover.Body>
                      <div className="bodyOverlay">
                        <img src="/image/user.png" alt="" width="100px" />
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
                              logoutHandler();
                            }}
                          >
                            LogOut
                          </h4>
                        </div>
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
              </div>
              <div>
                {userInfo.id === "" ? (
                  <h3 onClick={() => movdPage(5)}>LOGIN</h3>
                ) : (
                  <div ref={ref} onClick={handleClick}>
                    <div
                      onClick={handleShow}
                      style={{ cursor: "pointer" }}
                      className="login"
                    >
                      <img src="/image/user.png" alt="" height="55px" />
                      <h3 style={{ fontSize: "1.4em" }}>{userInfo.id}</h3>
                    </div>

                    <Overlay
                      show={show}
                      target={target}
                      placement="bottom"
                      container={ref}
                      containerPadding={20}
                    >
                      <Popover id="popover-contained">
                        <Popover.Header as="h3">Profile</Popover.Header>
                        <Popover.Body>
                          <div className="bodyOverlay">
                            <img src="/image/user.png" alt="" width="80px" />
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
                                  logoutHandler();
                                }}
                              >
                                LogOut
                              </h4>
                            </div>
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
