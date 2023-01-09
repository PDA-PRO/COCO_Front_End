import React, { Suspense, useRef, useState } from "react";
import "./Manage.css";
import { useNavigate } from "react-router-dom";
import { TaskUpload } from "./manageComponents/TaskUpload";
import { TaskList } from "./manageComponents/TaskList";
import { PostList } from "./manageComponents/PostList";
import { Notice } from "./manageComponents/Notice";
import { useEffect } from "react";

export const Manage = () => {
  // --------------------------- 페이지 전환 --------------------------------
  const [menu, setMenu] = useState(1);
  const navigate = useNavigate();
  const moveHome = () => {
    navigate("/");
  };

  useEffect(() => {}, [menu]);

  // --------------------------- 페이지 전환 --------------------------------
  const moveTo = (e) => {
    setMenu(e);
  };

  // --------------------------- POST 보낼 값 State 화 ----------------------

  // --------------------------- Submit 버튼으로 post ---------------------
  const show = (e) => {
    switch (e) {
      case 1:
        return <TaskUpload />;
      case 2:
        return <TaskList />;
      case 3:
        return <PostList />;
      case 4:
        return <Notice />;
    }
  };
  return (
    <div className="manage">
      <div className="m-head">
        <h2 id="m-title">관리자 : 조민수</h2>
        <h2 id="m-Logo" onClick={() => moveHome()}>
          COCO
        </h2>
      </div>
      <Menu moveTo={(e) => moveTo(e)} />
      {show(menu)}
    </div>
  );
};

//---------------------------------- 메뉴 ----------------------------------------------

const Menu = (props) => {
  return (
    <div className="manageMenu">
      <h3 onClick={() => props.moveTo(1)}>- TASK UPLOAD</h3>
      <h3 onClick={() => props.moveTo(2)}>- TASK LIST</h3>
      <h3 onClick={() => props.moveTo(3)}>- POST LIST</h3>
      <h3 onClick={() => props.moveTo(4)}>- Notice</h3>
    </div>
  );
};

//----------------------------------문제 리스트----------------------------------------------

//----------------------------------게시글 리스트----------------------------------------------
