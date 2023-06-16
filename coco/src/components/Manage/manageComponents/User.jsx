import React from "react";
import Spinner from "react-bootstrap/Spinner";
import fetchData from "../../../api/fetchTask";
import { GoSearch } from "react-icons/go";
import { HiUserPlus, HiUserMinus } from "react-icons/hi2";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import axios from "axios";

export const User = () => {
  const [order, setOrder] = useState([]);
  const onSearchHandler = (info) => {
    axios
      .post("http://127.0.0.1:8000/find_task/", {
        info: info,
      })
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
            <UserList />
          </div>
          <div className="box">
            <p>관리자 목록</p>
            <Managers />
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

const UserList = () => {
  const addMananger = (e) => {};

  return (
    <div className="userList-manage">
      <div className="uL-top">
        <p>ID</p>
        <p>Name</p>
        <p>관리자 추가</p>
      </div>

      <div className="uL-content">
        <p>test</p>
        <p>test</p>
        <p
          style={{ cursor: "pointer", color: "skyblue" }}
          onClick={() => addMananger()}
        >
          <HiUserPlus size={23} />
        </p>
      </div>
    </div>
  );
};

const Managers = () => {
  const minusMananger = (e) => {};
  return (
    <div className="userList-manage" id="mm">
      <div className="uL-top">
        <p>ID</p>
        <p>Name</p>
        <p>관리자에서 제거</p>
      </div>

      <div className="uL-content">
        <p>test</p>
        <p>test</p>
        <p
          style={{ cursor: "pointer", color: "orange" }}
          onClick={() => minusMananger()}
        >
          <HiUserMinus size={23} />
        </p>
      </div>
    </div>
  );
};
