import React, { useState } from "react";
import "./Result.css";
import fetchData from "../../api/fetchTask";
import Spinner from "react-bootstrap/Spinner";
import {
  BsSlashCircle,
  BsCheckCircle,
  BsBoxArrowInRight,
  BsX,
} from "react-icons/bs";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";

export const OtherLogic = (changeLogic) => {
  return (
    <div className="OC">
      <div className="OCtop">
        <h2>다른 로직 코드</h2>
        <div className="un" onClick={() => changeLogic.changeLogic()}>
          {/* 이름은 나중에 바꾸는걸로... */}
          <p>닫기</p>
          <BsX size={28} color="red" />
        </div>
      </div>

      <OCcontent />
      <OCcontent />
    </div>
  );
};

const OCcontent = () => {
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

  const [like, setLiked] = useState(0);

  return (
    <div className="OCcontent">
      <div className="OC-Code">
        <pre className="R-Code">{makeNoLine("print(hello)")}</pre>
      </div>
      <div className="OC-opi">
        <div className="OC-txt">
          <p>작성자 : name</p>
          <p>소요시간 : 5ms</p>
        </div>
        {like === 0 ? (
          <div className="OC-liked" onClick={() => setLiked(1)}>
            <AiOutlineLike size={24} />
            <p>도움됐어요!</p>
          </div>
        ) : (
          <div className="OC-liked" onClick={() => setLiked(1)}>
            <AiFillLike size={24} color="skyblue" />
            <p style={{ color: "skyblue" }}>도움됐어요!</p>
          </div>
        )}
      </div>
    </div>
  );
};
