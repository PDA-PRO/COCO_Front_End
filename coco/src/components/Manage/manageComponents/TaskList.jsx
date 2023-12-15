import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import { BsTrash, BsFillPencilFill } from "react-icons/bs";
import Pagination from "@mui/material/Pagination";
import { useAppSelector } from "../../../app/store";
import { API } from "api/config";
import Swal from "sweetalert2";
import "../Manage.css";
import axiosInstance from "api/axiosWithPathParameter";

//페이지 네이션, 문제 삭제시 리스트 재호출, 첫 렌더링을 모두 api 호출 한번에 해결하려면
//이 방법밖에 생각이 나질 않았습니다. suspense를 쓰지 말아주세요
//역시 튜닝의 끝은 순정인가 봅니다.
export const TaskList = () => {
  const [page, setPage] = useState(1);
  const [del, setDel] = useState(0);
  const [taskList, setTaskList] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axiosInstance
      .get(API.TASK, {
        params: {
          size: 10,
          page: page,
        },
      })
      .then(({ data }) => {
        setTaskList(data);
        setLoading(false);
      });
  }, [del, page]);
  return (
    <>
      <h2 className="mTi">TASK LIST</h2>
      <div>
        {loading ? (
          <Spinner />
        ) : (
          <TasksList
            resource={taskList}
            setPage={(value) => {
              setPage(value);
              setLoading(true);
            }}
            page={page}
            setDel={setDel}
            setLoading={setLoading}
          />
        )}
      </div>
    </>
  );
};

const TasksList = ({ resource, page, setPage, setDel, setLoading }) => {
  const userInfo = useAppSelector((state) => state.loginState);
  const problemList = resource;
  return (
    <div className="m-upload">
      <div className="taskTop">
        <h3>ID</h3>
        <h3>제목</h3>
        <h3>난이도</h3>
        <h3>정답률</h3>
        <h3>제출수</h3>
        <h3>수정</h3>
        <h3>삭제</h3>
      </div>
      {problemList.tasks.map((e) => {
        return (
          <ListBox
            key={e.id}
            info={e}
            token={userInfo.access_token}
            setDel={setDel}
            setLoading={setLoading}
          />
        );
      })}
      <div className="pageController">
        <Pagination
          count={Math.ceil(problemList.total / problemList.size)}
          variant="outlined"
          shape="rounded"
          defaultPage={1}
          page={page}
          onChange={(e, value) => setPage(value)}
        />
      </div>
    </div>
  );
};

const ListBox = ({ info, token, setDel, setLoading }) => {
  const navigate = useNavigate();
  const goDetail = (e) => {
    navigate(`/problems/${e}`);
  };
  const loadlist = (e) => {
    Swal.fire({
      icon: "warning",
      title:
        "문제 삭제 시 예기치 못한 에러가 발생할 수 있습니다.\n정말로 삭제하시겠습니까?",
    }).then((res) => {
      if (res.isConfirmed) {
        axiosInstance
          .delete(API.TASK, {
            headers: { Authorization: "Bearer " + token },
            urlParams: {
              task_id: info.id,
            },
          })
          .then(() => {
            Swal.fire({
              icon: "success",
              title: `id : ${info.id}, 제목 : ${info.title} 문제를 삭제했습니다.`,
            });

            setDel(info.id);
            setLoading(true);
          });
      }
    });
  };
  return (
    <div className="taskList">
      <h4>No.{info.id}</h4>
      <h4
        style={{
          textOverflow: "ellipsis",
          maxWidth: "223px",
          textAlign: "center",
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
        onClick={() => {
          goDetail(info.id);
        }}
      >
        {info.title}
      </h4>
      <h4>{info.diff}</h4>
      <h4>{info.rate}%</h4>
      <h4>{info.count == null ? 0 : info.count}</h4>
      <BsFillPencilFill
        cursor="pointer"
        size={20}
        color="red"
        onClick={() => {
          navigate(`/manage/modify/${info.id}`);
        }}
        style={{ justifySelf: "center" }}
      />
      <BsTrash
        cursor="pointer"
        size={20}
        color="red"
        onClick={loadlist}
        style={{ justifySelf: "center" }}
      />
    </div>
  );
};
