import React from "react";
import { Header } from "../Home/Header";
import { Footer } from "../Home/Footer";
import "./MyPage.css";

import { SecondBox } from "./SecondBox";
import {
  IoInformationCircleOutline,
  IoClipboardOutline,
} from "react-icons/io5";
import { BsGraphUp } from "react-icons/bs";
import { ThirdBox } from "./ThirdBox";
import { FirstBox } from "./FirstBox";

export const MyPage = () => {
  return (
    <>
      <Header />
      <div className="myPage">
        <h2>
          <span>
            <IoInformationCircleOutline
              size={30}
              color="green"
              style={{ paddingBottom: "3px", marginRight: "8px" }}
            />
          </span>
          회원 정보
        </h2>
        <FirstBox />
        <h2>
          <span>
            <BsGraphUp
              size={27}
              color="green"
              style={{ paddingBottom: "3px", marginRight: "13px" }}
            />
          </span>
          내 역량
        </h2>
        <SecondBox />
        <h2>
          <span>
            <IoClipboardOutline
              size={29}
              color="green"
              style={{ paddingBottom: "3px", marginRight: "13px" }}
            />
          </span>
          내 게시글
        </h2>
        <ThirdBox />
      </div>
      <Footer />
    </>
  );
};
