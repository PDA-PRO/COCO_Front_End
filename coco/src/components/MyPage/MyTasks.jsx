import React from "react";
import "./MyPage.css";
import { useNavigate } from "react-router-dom";
import { Suspense } from "react";
import Spinner from "react-bootstrap/esm/Spinner";
import fetchData from "../../api/fetchTask";
import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import {
  TiBatteryCharge,
  TiBatteryLow,
  TiBatteryMid,
  TiBatteryHigh,
  TiBatteryFull,
} from "react-icons/ti";
import { GoCheck, GoX, GoDash } from "react-icons/go";
import { BsTrash } from "react-icons/bs";
import { useAppSelector } from "../../app/store";
import axios from "axios";

export const MyTasks = () => {
  const userInfo = useAppSelector((state) => state.loginState);

  return (
    <div className="mp-FourthBox">
      <div className="BodyLeft">
        <div className="leftTop">
          <h4>No</h4>
          <h4>문제 제목</h4>
          <h4>난이도</h4>
          <h4>정답률</h4>
          <h4>언어</h4>
          <h4>Solve</h4>
        </div>

        <Suspense fallback={<Spinner />}>
          <GetProblems
            resource={fetchData(
              `http://127.0.0.1:8000/mytasks/${userInfo.id}`,
              {
                headers: { Authorization: "Bearer " + userInfo.access_token },
              }
            )} user={userInfo}/>
        </Suspense>
      </div>
    </div>
  );
};

const GetProblems = ({ resource }) => {
  const problemList = resource.read();
  const maxPage = Math.ceil(problemList.length / 10);
  const [page, setPage] = useState(1);
  const handlePage = (event) => {
    if (
      event.target.innerHTML ===
      '<path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>'
    ) {
      setPage(page - 1);
    } else if (
      event.target.innerHTML ===
      '<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>'
    ) {
      setPage(page + 1);
    } else {
      setPage(parseInt(event.target.outerText));
    }
  };

  return (
    <>
      {problemList.slice(20 * (page - 1), 20 * (page - 1) + 20).map((e) => {
        return <MyTasksBox info={e} key={e.id}/>;
      })}
      <div
        className="leftBottom"
        style={{
          borderRight: "2px solid rgb(198, 209, 235)",
          borderLeft: "2px solid rgb(198, 209, 235)",
          borderBottom: "2px solid rgb(198, 209, 235)",
        }}
      >
        <Pagination
          count={maxPage}
          variant="outlined"
          shape="rounded"
          defaultPage={1}
          onChange={(e) => handlePage(e)}
        />
      </div>
    </>
  );
};

export const MyTasksBox = (info) => {
  const userInfo = useAppSelector((state) => state.loginState);
  const navigate = useNavigate();
  const goDetail = (e) => {
    navigate(`/problems/${e}`);
  };

  const deleteTask = (e) => {
    axios
      .post(
        "http://127.0.0.1:8000/delete_mytask",
        {
          user_id: userInfo.id,
          task_id: e,
        },
        {
          headers: { Authorization: "Bearer " + userInfo.access_token },
        }
      )
      .then((res) => {
        if (res.data === false) {
          alert("내 문제집에서 삭제하지 못했습니다");
        } else {
          alert("내 문제집에서 삭제하였습니다");
          navigate(0);
        }
      })
      .catch(() => {
        alert("내 문제집에서 삭제하지 못했습니다");
      });
  };

  const setLevel = (e) => {
    switch (e) {
      case 1:
        return <TiBatteryLow size={35} color="rgb(98, 148, 255)" />;
      case 2:
        return <TiBatteryMid size={35} color="#9DD84B" />;
      case 3:
        return <TiBatteryHigh size={35} color="#ff7e00" />;
      case 4:
        return <TiBatteryFull size={35} color="red" />;
      case 5:
        return <TiBatteryCharge size={35} color="#7d1b7e" />;
    }
  };

  const lan = (e1, e2) => {
    if (e1 === 1 && e2 === 1) {
      return (
        <div>
          <img src="/image/lan_c.png" height="30px" alt="아니 시발" />
          <img
            src="/image/python.png"
            height="30px"
            style={{ paddingRight: "10px" }}
            alt="왜 시발"
          />
        </div>
      );
    } else if (e1 === 1 && e2 === 0) {
      return (
        <div>
          <img src="/image/lan_c.png" height="30px" alt="" />
        </div>
      );
    } else if (e1 === 0 && e2 === 1) {
      return (
        <div>
          <img src="/image/python.png" height="30px" alt="" />
        </div>
      );
    }
  };

  const solve = (e) => {
    console.log(e);
    if (e === 1) {
      return (
        <p style={{ margin: "0", textAlign: "center" }}>
          <GoCheck size={27} color="green" />
        </p>
      );
    } else if (e === -1) {
      return (
        <p style={{ margin: "0", textAlign: "center" }}>
          <GoX size={27} color="red" />
        </p>
      );
    } else {
      return (
        <p style={{ margin: "0", textAlign: "center" }}>
          <GoDash size={27} color="gray" />
        </p>
      );
    }
  };

  return (
    <div className="MyTasksBox">
      <h4 onClick={() => goDetail(info.info.id)}>No.{info.info.id}</h4>
      <h4 onClick={() => goDetail(info.info.id)}>{info.info.title}</h4>
      <h4>{setLevel(info.info.diff)}</h4>
      <h4
        style={{
          color:
            info.info.rate == 0
              ? "gray"
              : info.info.rate >= 40
              ? "skyblue"
              : "rgb(218, 55, 55)",
        }}
      >
        {info.info.rate}%
      </h4>

      <h4>{lan(info.info.lan_c, info.info.lan_py)}</h4>
      <div style={{ margin: "0", textAlign: "center" }}>
        {solve(info.info.solved)}
      </div>
      <p style={{ margin: "0", textAlign: "center" }}>
        <BsTrash
          onClick={() => deleteTask(info.info.id)}
          size={19}
          color="red"
        />
      </p>
    </div>
  );
};
