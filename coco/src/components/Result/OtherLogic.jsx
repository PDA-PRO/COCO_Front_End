import React, { useState } from "react";
import "./Result.css";
import fetchData from "../../api/fetchTask";
import Swal from "sweetalert2";
import { BsX } from "react-icons/bs";
import { TbListSearch } from "react-icons/tb";
import { API } from "api/config";
import { useAppSelector } from "../../app/store";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Notfound } from "components/Notfound";
import { Sorry } from "components/Sorry";

export const OtherLogic = ({ changeLogic, task_id, sub_id }) => {
  return (
    <div className="OC">
      <div id="close">
        <div className="un" onClick={() => changeLogic()}>
          {/* 이름은 나중에 바꾸는걸로... */}
          <p>닫기</p>
          <BsX size={28} color="red" />
        </div>
      </div>

      <div className="un" style={{ marginLeft: "0.5vw" }}>
        <TbListSearch color="blue" size={23} />
        <h2>다른 로직의 코드</h2>
      </div>

      <div className="un" style={{ marginLeft: "0.5vw" }}>
        <TbListSearch color="blue" size={23} />
        <h2>유사 로직의 코드</h2>
      </div>

      <div className="codeTwo" style={{ minHeight: "200px" }}>
        <OCcontent task_id={task_id} sub_id={sub_id} />
      </div>
    </div>
  );
};

const OCcontent = ({ task_id, sub_id }) => {
  const [isOn, setIsOn] = useState(false);

  const { isFetching, data } = useQuery(["OC", sub_id], () =>
    axios
      .post(
        API.BASE_URL + "/code-cluster/main",
        {},
        {
          params: {
            task_id: task_id,
            sub_id: sub_id,
          },
        }
      )
      .then(() => {
        setIsOn(true);
      })
      .catch((res) => {
        if (res.response.status == 500) {
          Swal.fire({
            icon: "error",
            title: "충분한 정답 코드가 존재하지 않습니다.",
          }).then((res) => {
            if (res.isConfirmed) {
              return <Notfound />;
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "AI Plugin 사용 불가\n\n404 NOT FOUND",
          }).then((res) => {
            if (res.isConfirmed) {
              return <Notfound />;
            }
          });
        }
      })
  );
  if (isFetching) {
    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          minHeight: "120px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p
          style={{
            fontFamily: "Pretendard-Regular",
            margin: "0",
            fontSize: "1.2em",
            fontWeight: "600",
          }}
        >
          is Loading...
          <br />
          AI가 코드를 찾고 있습니다.
        </p>
      </div>
    );
  }

  function makeNoLine(arr) {
    if (arr.length == 0) {
      return "";
    } else {
      arr.sort((a, b) => {
        return b.distance - a.distance;
      });

      var max_dis = arr[0];
      var dataArray = max_dis.split("\n");

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

  return isOn === false ? (
    <div id="sorry">
      <Sorry />
    </div>
  ) : (
    <div className="OCcontent">
      <div className="OC-Code">
        <pre className="R-Code">{makeNoLine(data.data)}</pre>
      </div>
      <div className="OC-Code">
        <pre className="R-Code">{makeNoLine(data.data)}</pre>
      </div>
    </div>
  );
};
