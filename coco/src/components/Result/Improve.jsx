import React, { useState } from "react";
import "./Result.css";
import axios from "axios";
import { API } from "api/config";
import { useAppSelector } from "../../app/store";
import { BsX } from "react-icons/bs";
import {
  PiNumberCircleOneLight,
  PiNumberCircleTwoLight,
  PiNumberCircleThreeLight,
} from "react-icons/pi";

export const Improve = ({ changeLogic, impCode, impCmt, task_id, sub_id }) => {
  return (
    <div className="OC">
      <div className="OCtop">
        <div className="un">
          <PiNumberCircleOneLight color="blue" size={23} />
          <h2>AI가 작성한 개선된 코드</h2>
        </div>

        <div className="un" onClick={() => changeLogic()}>
          {/* 이름은 나중에 바꾸는걸로... */}
          <p>닫기</p>
          <BsX size={28} color="red" />
        </div>
      </div>

      <AI_code
        func={1}
        code={impCode}
        cmt={impCmt}
        task_id={task_id}
        sub_id={sub_id}
      />
    </div>
  );
};

const AI_code = ({ func, code, cmt, task_id, sub_id }) => {
  const userInfo = useAppSelector((state) => state.loginState);
  const [like, setLiked] = useState(0);
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

  const selectCode = (type) => {
    //개선 코드
    if (type === 1) {
      if (like) {
        axios
          .put(
            API.AI + "/code-select",
            {
              task_id: task_id,
              sub_id: sub_id,
              check: 0,
            },
            { headers: { Authorization: "Bearer " + userInfo.access_token } }
          )
          .then((res) => {
            console.log(res.data);
            setLiked(0);
          });
      } else {
        axios
          .put(
            API.AI + "/code-select",
            {
              task_id: task_id,
              sub_id: sub_id,
              check: 0,
            },
            { headers: { Authorization: "Bearer " + userInfo.access_token } }
          )
          .then((res) => {
            console.log(res.data);
            setLiked(1);
          });
      }
    }
  };

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
              <p style={{ paddingLeft: "1em" }}>{cmt}</p>
            </div>
          ) : (
            <></>
          )}
          {/* <div className="c-un">
              <BiTimeFive color="gray" size={20} />
              <p>소요 시간 : 5ms</p>
            </div>
            <div className="c-un">
              <BiMemoryCard color="gray" size={20} />
              <p>소요 메모리 : 200mb</p>
            </div> */}
        </div>
      </div>
    </div>
  );
};
