import React from "react";
import { IoLogoInstagram, IoLogoGithub } from "react-icons/io5";
import { useMediaQuery } from "react-responsive";
import { RiGooglePlayFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export const Footer = () => {
  const isntShort = useMediaQuery({ minWidth: 1450 });
  const isShort = useMediaQuery({ maxWidth: 1449.99999, minWidth: 1300 });
  const isPhone = useMediaQuery({ maxWidth: 1299.99999 });

  const move = (e) => {
    switch (e) {
      case 1:
        window.open("https://www.instagram.com/lookin_min/");
        break;
      case 3:
        window.open("https://www.festival-ing.org");
        break;
      case 4:
        window.open("https://github.com/MinPangWon/COCO_Front_End");
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
    <>
      {isntShort && (
        <div className="footer">
          <div className="pageIcons">
            <IoLogoInstagram
              color="#faf5e4"
              size={40}
              onClick={() => move(1)}
            />
            <RiGooglePlayFill
              color="#faf5e4"
              size={40}
              onClick={() => move(3)}
            />
            <IoLogoGithub color="#faf5e4" size={40} onClick={() => move(4)} />
          </div>
          <div className="footerLogo">
            <h2>COCO : Coding Coach</h2>
          </div>

          <div className="txts">
            <div className="div1">
              <p>
                <span className="TT">Address.</span>충청북도 청주시 서원구
                충대로 1 충북대학교 S1-4 116호
              </p>
              <p>
                <span className="TT">Team.</span>Ping-pong in CBNU-SW
              </p>
            </div>

            <div className="div2">
              <p>
                <span className="TT">E-mail.</span>sncalphs@gmail.com
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
            <p>@ Copyright 2022 COCO All rights reserved</p>
            <p onClick={() => handleClick(1)}>개인정보 처리방침</p>
            <p onClick={() => handleClick(2)}>서비스 이용약관</p>
          </div>
        </div>
      )}
      {isShort && (
        <div className="footer2">
          <div className="pageIcons">
            <IoLogoInstagram
              color="#faf5e4"
              size={40}
              onClick={() => move(1)}
            />
            <RiGooglePlayFill
              color="#faf5e4"
              size={40}
              onClick={() => move(3)}
            />
            <IoLogoGithub color="#faf5e4" size={40} onClick={() => move(4)} />
          </div>
          <div className="footerLogo">
            <h2>COCO : Coding Coach</h2>
          </div>

          <div className="txts">
            <div className="div1">
              <p>
                <span className="TT">Address.</span>충청북도 청주시 서원구
                충대로 1 충북대학교 S1-4 116호
              </p>
              <p>
                <span className="TT">Team.</span>Team Ping-pong
              </p>
            </div>

            <div className="div2">
              <p>
                <span className="TT">E-mail.</span>sncalphs@gmail.com
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
            <p>@ Copyright 2022 COCO All rights reserved</p>
            <p>개인정보 처리방침</p>
            <p>서비스 이용약관</p>
          </div>
        </div>
      )}
      {isPhone && (
        <div className="footer3">
          <div className="pageIcons">
            <IoLogoInstagram
              color="#faf5e4"
              size={40}
              onClick={() => move(1)}
            />
            <RiGooglePlayFill
              color="#faf5e4"
              size={40}
              onClick={() => move(3)}
            />
            <IoLogoGithub color="#faf5e4" size={40} onClick={() => move(4)} />
          </div>
          <div className="footerLogo">
            <h2>COCO : Coding Coach</h2>
          </div>

          <div className="txts2">
            <div className="div1">
              <p>
                <span className="TT">Address.</span>충청북도 청주시 서원구
                충대로 1 충북대학교 S1-4 116호
              </p>
              <p>
                <span className="TT">Team.</span>Team Ping-pong
              </p>
            </div>

            <div className="div2">
              <p>
                <span className="TT">E-mail.</span>sncalphs@gmail.com
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
            <p>@ Copyright 2022 COCO All rights reserved</p>
            <p>개인정보 처리방침</p>
            <p>서비스 이용약관</p>
          </div>
        </div>
      )}
    </>
  );
};
