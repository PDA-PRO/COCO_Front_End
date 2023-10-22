import React, { useState } from "react";
import "./Result.css";
import axios from "axios";
import { API } from "api/config";
import { useAppSelector } from "../../app/store";
import { BsX } from "react-icons/bs";
import { TbListSearch, TbMessageCircleQuestion } from "react-icons/tb";

export const Improve = ({ changeLogic, impCode, impCmt }) => {
  return (
    <div className="OC">
      <div className="OCtop">
        <div className="un">
          <TbMessageCircleQuestion color="blue" size={23} />
          <h2>AI가 작성한 개선된 코드</h2>
        </div>

        <div className="un" onClick={() => changeLogic()}>
          {/* 이름은 나중에 바꾸는걸로... */}
          <p>닫기</p>
          <BsX size={28} color="red" />
        </div>
      </div>

      <AI_code func={1} code={impCode} cmt={impCmt} />
    </div>
  );
};

const AI_code = ({ func, code, cmt }) => {
  const userInfo = useAppSelector((state) => state.loginState);
  function makeNoLine(arr) {
    if (arr.length == 0) {
      return "";
    } else {
      var dataArray = arr.split("\n");

      var numberedData = dataArray
        .map((item, index) => {
          return `${index + 1}@${item}`;
        })
        .join("\n");

      const strings = numberedData.split("\n").map((str) => {
        const [num, val] = str.split("@");
        return (
          <div className="codeLine">
            <n className="codeNum">{num}.</n>
            <n className="codeTxt">{val}</n>
          </div>
        );
      });
      return strings;
    }
  }

  function addNewLineAfterDot(inputString) {
    // 정규식을 사용하여 모든 '.'을 찾아서 '\n'을 추가
    const resultString = inputString.replace(/\./g, ".\n");
    return resultString;
  }

  var resString = addNewLineAfterDot(cmt);
  console.log(resString);

  return (
    <div className="OCcontent">
      <div className="OC-Code">
        <pre className="R-Code">{makeNoLine(code)}</pre>
      </div>
      <div className="OC-opi">
        <div className="OC-txt">
          {func === 1 ? (
            <div className="aiComment">
              <div className="cmtTop">
                <img src="/image/chatbot.png" width="30px"></img>
                <p style={{ color: "rgb(44, 179, 233)" }}>AI Comment</p>
              </div>
              <p style={{ whiteSpace: "pre-wrap", paddingLeft: "1em" }}>
                {resString}
              </p>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
