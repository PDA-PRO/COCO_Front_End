import React, { Suspense, useState, useEffect, useRef } from "react";
import Spinner from "react-bootstrap/Spinner";
import { GoSearch } from "react-icons/go";
import { HiUserPlus, HiUserMinus } from "react-icons/hi2";
import Pagination from "@mui/material/Pagination";
import { useAppSelector } from "../../../app/store";
import { API } from "api/config";
import Swal from "sweetalert2";
import axios from "axios";

export const User = () => {
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(null);
  const [userList, setUserList] = useState(null);
  const [managerList, setManagerList] = useState(null);
  const [loading, setLoading] = useState(true);

  const keywordRef = useRef();

  useEffect(() => {
    Promise.all([
      axios.get(API.USER, {
        params: {
          size: 10,
          page: page,
          keyword: keywordRef.current.value,
          role: 0,
        },
      }),
      axios.get(API.USER, {
        params: {
          role: 1,
        },
      }),
    ]).then((value) => {
      let userData = value[0].data;
      let managerData = value[1].data.userlist;
      setUserList(userData);
      setManagerList(managerData);
      setLoading(false);
    });
  }, [reload, page]);

  const onSearchHandler = () => {
    setReload(`search${Math.random()}`);
    setLoading(true);
  };
  return (
    <>
      <h2 className="mTi">USER MANAGEMENT</h2>
      <div className="m-upload">
        <div className="divide-box">
          <div className="box">
            <p>유저 목록</p>
            <div className="searchBar">
              <input
                ref={keywordRef}
                type="text"
                placeholder="search"
                id="SV"
              />
              <GoSearch
                size={23}
                color="rgb(98, 148, 255)"
                id="goSearch"
                onClick={() => onSearchHandler()}
              />
            </div>
            {loading ? (
              <Spinner />
            ) : (
              <UserList
                userList={userList}
                setPage={(value) => {
                  setPage(value);
                  setLoading(true);
                }}
                page={page}
                setReload={setReload}
                setLoading={setLoading}
              />
            )}
          </div>
          <div className="box">
            <p>관리자 목록</p>
            {loading ? (
              <Spinner />
            ) : (
              <Managers
                managerList={managerList}
                setReload={setReload}
                setLoading={setLoading}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const UserList = ({ userList, page, setPage, setReload, setLoading }) => {
  const userInfo = useAppSelector((state) => state.loginState);
  const addMananger = (user_id) => {
    axios
      .patch(
        API.PERMISSION,
        {
          id: user_id,
          role: 1,
        },
        {
          headers: { Authorization: "Bearer " + userInfo.access_token },
        }
      )
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: `${user_id}님을 관리자에 추가하였습니다`,
        });

        setReload(`add${user_id}`);
        setLoading(true);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "관리자 추가에 실패하였습니다.",
        });
      });
  };
  const users = userList.userlist;

  return (
    <div className="userList-manage">
      <div className="uL-top">
        <p>ID</p>
        <p>Name</p>
        <p>관리자 추가</p>
      </div>

      {users.map((e) => {
        return (
          <div key={e.id} className="uL-content">
            <p>{e.id}</p>
            <p>{e.name}</p>
            <p
              style={{ cursor: "pointer", color: "skyblue" }}
              onClick={() => addMananger(e.id)}
            >
              <HiUserPlus size={23} />
            </p>
          </div>
        );
      })}
      <div className="pageController">
        <Pagination
          count={Math.ceil(userList.total / userList.size)}
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

const Managers = ({ managerList, setReload, setLoading }) => {
  const managers = managerList;
  const userInfo = useAppSelector((state) => state.loginState);
  const minusMananger = (user_id) => {
    axios
      .patch(
        API.PERMISSION,
        {
          id: user_id,
          role: 0,
        },
        {
          headers: { Authorization: "Bearer " + userInfo.access_token },
        }
      )
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: `${user_id}님을 관리자에서 삭제하였습니다`,
        });
        setReload(`remove${user_id}`);
        setLoading(true);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "관리자 삭제에 실패하였습니다.",
        });
      });
  };

  return (
    <div className="userList-manage" id="mm">
      <div className="uL-top">
        <p>ID</p>
        <p>Name</p>
        <p>관리자에서 제거</p>
      </div>

      {managers.map((e) => {
        return (
          <div key={e.id} className="uL-content">
            <p>{e.id}</p>
            <p>{e.name}</p>
            <p
              style={{ cursor: "pointer", color: "orange" }}
              onClick={() => minusMananger(e.id)}
            >
              <HiUserMinus size={23} />
            </p>
          </div>
        );
      })}
    </div>
  );
};
