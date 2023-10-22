import React from "react";
import { IoLogoInstagram, IoLogoGithub } from "react-icons/io5";
import { RiGooglePlayFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export const Footer = (props) => {
  const move = (e) => {
    switch (e) {
      case 1:
        window.open("https://www.instagram.com/lookin_min/");
        break;
      // case 3:
      //   window.open("https://www.festival-ing.org");
      //   break;
      case 4:
        window.open("https://github.com/PDA-PRO");
        break;
    }
  };

  let navigate = useNavigate();
  function handleClick(e) {
    if (e === 1) {
      navigate("/personal");
    } else {
      navigate("/service");
    }
  }

  return (
    <div
      className="footer"
      style={
        props.props == 1
          ? { backgroundColor: "rgb(199, 199, 199)", color: "black" }
          : { backgroundColor: "#fff" }
      }
    >
      <div className="footerBody">
        <div className="pageIcons">
          <IoLogoInstagram
            color={props.props == 1 ? "black" : "rgb(124, 124, 124)"}
            size={30}
            onClick={() => move(1)}
            title="INSTAGRAM으로 이동"
          />
          {/* <RiGooglePlayFill
            color={props.props == 1 ? "black" : "rgb(124, 124, 124)"}
            size={30}
            onClick={() => move(3)}
          /> */}
          <IoLogoGithub
            color={props.props == 1 ? "black" : "rgb(124, 124, 124)"}
            size={30}
            onClick={() => move(4)}
            title="GitHub으로 이동"
          />
        </div>
        <div className="footerLogo">
          <h2>COCO : Coding Coach</h2>
        </div>

        <div className="txts">
          <div className="div1">
            <p>
              <span className="TT">Address.</span>충청북도 청주시 서원구 충대로
              1 충북대학교 S1-4 116호
            </p>
            <p>
              <span className="TT">Team.</span>Ping-pong in CBNU-SW
            </p>
          </div>

          <div className="div2">
            <p>
              <span className="TT">E-mail.</span>ancx1234@naver.com
            </p>
            <p>
              <span className="TT">Instagram.</span>@lookin_min
            </p>
          </div>

          <div className="div3">
            <p>
              <span className="TT">Leader.</span>조민수
            </p>
          </div>
        </div>

        <div className="txtz2">
          <p>@ Copyright 2023 Ping-pong All rights reserved</p>
          <p onClick={() => handleClick(1)}>개인정보 처리방침</p>
          <p onClick={() => handleClick(2)}>서비스 이용약관</p>
        </div>
      </div>
    </div>
  );
};
