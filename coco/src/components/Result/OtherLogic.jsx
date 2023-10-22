import React, { useState } from "react";
import "./Result.css";
import fetchData from "../../api/fetchTask";
import Swal from "sweetalert2";
import { BsX } from "react-icons/bs";
import { TbListSearch, TbMessageCircleQuestion } from "react-icons/tb";
import { API } from "api/config";
import { useAppSelector } from "../../app/store";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const OtherLogic = ({ changeLogic, task_id, sub_id }) => {
  return (
    <div className="OC">
      <div className="OCtop">
        <div className="un">
          <TbListSearch color="blue" size={23} />
          <h2>다른 로직의 코드</h2>
        </div>

        <div className="un" onClick={() => changeLogic()}>
          {/* 이름은 나중에 바꾸는걸로... */}
          <p>닫기</p>
          <BsX size={28} color="red" />
        </div>
      </div>

      <OCcontent task_id={task_id} sub_id={sub_id} />
    </div>
  );
};

const OCcontent = ({ task_id, sub_id }) => {
  const { isFetching, data } = useQuery(["OC", sub_id], () =>
    axios.post(
      API.BASE_URL + "/code-cluster",
      {},
      {
        params: {
          task_id: task_id,
          sub_id: sub_id,
        },
      }
    )
  );
  if (isFetching) {
    return Swal.fire({
      icon: "info",
      title: "AI가 다른 로직의 코드를 찾고 있습니다.",
      footer: "시간이 다소 소요될 수 있습니다.",
      showConfirmButton: false,
    });
  }
  function makeNoLine(arr) {
    if (arr.length == 0) {
      return "";
    } else {
      arr.sort((a, b) => {
        return b.distance - a.distance;
      });
      console.log(arr);
      var max_dis = arr[0];
      var dataArray = max_dis.code.split("\n");

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

  return (
    <div className="OCcontent">
      <div className="OC-Code">
        <pre className="R-Code">{makeNoLine(data.data)}</pre>
      </div>
      <div className="OC-opi">
        {/* <div className="OC-txt">
          <p>작성자 : name</p>
        </div> */}
      </div>
    </div>
  );
};
