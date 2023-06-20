import React, { Suspense, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import fetchData from "../../../api/fetchTask";
import { GoSearch } from "react-icons/go";
import { HiUserPlus, HiUserMinus } from "react-icons/hi2";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useAppSelector } from "../../../app/store";

export const User = () => {
  const userInfo = useAppSelector((state) => state.loginState);
  const [order, setOrder] = useState([]);

  const onSearchHandler = (info) => {
    axios
      .post(
        "http://127.0.0.1:8000/manage/search_user/",
        {
          user_id: info,
        }
        // {
        //   headers: { Authorization: "Bearer " + userInfo.access_token },
        // }
      )
      .then((res) => {
        setOrder(res.data);
      });
  };

  return (
    <>
      <h2 className="mTi">User Management</h2>
      <div className="m-upload">
        <div className="divide-box">
          <div className="box">
            <p>유저 목록</p>
            <SearchBar search={onSearchHandler} />
            {order.length === 0 ? (
              <Suspense fallback={<Spinner />}>
                <UserList
                  resource={fetchData(`http://127.0.0.1:8000/manage/user_list`)}
                />
              </Suspense>
            ) : (
              <SearchList order={order} />
            )}
          </div>
          <div className="box">
            <p>관리자 목록</p>
            <Suspense fallback={<Spinner />}>
              <Managers
                resource={fetchData(
                  `http://127.0.0.1:8000/manage/manager_list`
                )}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
};

const SearchBar = ({ search }) => {
  const onSearchHandler = (e) => {
    var info = document.getElementById("SV").value;
    search(info);
    console.log(info);
  };

  return (
    <div className="searchBar">
      <input type="text" placeholder="search" id="SV" />
      <GoSearch
        size={23}
        color="rgb(98, 148, 255)"
        id="goSearch"
        onClick={() => onSearchHandler()}
      />
    </div>
  );
};

const SearchList = ({order}) => {
  const addMananger = (user_id) => {
    axios
    .post("http://127.0.0.1:8000/manage/add_manager/", {
      user_id: user_id
    })
    .then((res) => {
      if(res.data === true){
        alert(`${user_id}님을 관리자에 추가하였습니다`);
      }
    }).catch(() => {
      alert("관리자 추가에 실패하였습니다.")
    })
  };
  return (
    <div className="userList-manage">
      <div className="uL-top">
        <p>ID</p>
        <p>Name</p>
        <p>관리자 추가</p>
      </div>

      {order.map((e) => {
        return (
          <div className="uL-content">
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
    </div>
  );
};

const UserList = ({ resource }) => {
  const addMananger = (user_id) => {
    axios
    .post("http://127.0.0.1:8000/manage/add_manager/", {
      user_id: user_id
    })
    .then((res) => {
      if(res.data === true){
        alert(`${user_id}님을 관리자에 추가하였습니다`);
      }
    }).catch(() => {
      alert("관리자 추가에 실패하였습니다.")
    })
  };
  const users = resource.read();

  return (
    <div className="userList-manage">
      <div className="uL-top">
        <p>ID</p>
        <p>Name</p>
        <p>관리자 추가</p>
      </div>

      {users.map((e) => {
        return (
          <div className="uL-content">
            <p>{e.id}</p>
            <p>{e.name}</p>
            <p
              style={{ cursor: "pointer", color: "skyblue" }}
              onClick={() => addMananger()}
            >
              <HiUserPlus size={23} />
            </p>
          </div>
        );
      })}
    </div>
  );
};

const Managers = ({ resource }) => {
  const managers = resource.read();
  const minusMananger = (user_id) => {
    axios
    .post("http://127.0.0.1:8000/manage/delete_manager/", {
      user_id: user_id
    })
    .then((res) => {
      if(res.data === true){
        alert(`${user_id}님을 관리자에서 삭제하였습니다`);
      }
    }).catch(() => {
      alert("관리자 삭제에 실패하였습니다.")
    })
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
          <div className="uL-content">
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
