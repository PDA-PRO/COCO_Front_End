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
import {
  PiNumberCircleOneLight,
  PiNumberCircleTwoLight,
  PiNumberCircleThreeLight,
} from "react-icons/pi";
import { BiTimeFive, BiMemoryCard } from "react-icons/bi";
import { API } from "api/config";
import { useAppSelector } from "../../app/store";
import axios from "axios";

export const OtherLogic = ({ changeLogic, impCode, impCmt, task_id, sub_id }) => {
  console.log("one", impCode, impCmt);
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

      <AI_code func={1} code={impCode} cmt={impCmt} task_id={task_id} sub_id={sub_id} />

      <div className="OCmiddle">
        <div className="un">
          <PiNumberCircleTwoLight color="blue" size={23} />
          <h2>AI가 찾은 유사 로직의 코드</h2>
        </div>
      </div>
      {/* <AI_code func={2} /> */}

      <div className="OCmiddle">
        <div className="un">
          <PiNumberCircleThreeLight color="blue" size={23} />
          <h2>다른 로직의 코드</h2>
        </div>
      </div>
      <OCcontent />
    </div>
  );
};

const AI_code = ({ func, code, cmt, task_id, sub_id }) => {
  const userInfo = useAppSelector((state) => state.loginState);
  const [like, setLiked] = useState(0);
;

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

        {like === 0 ? (
          <div className="OC-liked" onClick={() => selectCode(func)}>
            <AiOutlineLike size={24} />
            <p>도움됐어요!</p>
          </div>
        ) : (
          <div className="OC-liked" onClick={() => selectCode(func)}>
            <AiFillLike size={24} color="skyblue" />
            <p style={{ color: "skyblue" }}>도움됐어요?</p>
          </div>
        )}
      </div>
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
          {/* <div className="c-un">
            <BiTimeFive color="gray" size={20} />
            <p>소요 시간 : 5ms</p>
          </div>
          <div className="c-un">
            <BiMemoryCard color="gray" size={20} />
            <p>소요 메모리 : 200mb</p>
          </div> */}
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
