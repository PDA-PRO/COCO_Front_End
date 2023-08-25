import React, { Suspense, useRef, useState } from "react";
import "./Manage.css";
import { useNavigate } from "react-router-dom";
import { TaskUpload } from "./manageComponents/TaskUpload";
import { TaskList } from "./manageComponents/TaskList";
import { PostList } from "./manageComponents/PostList";
import { Notice } from "./manageComponents/Notice";
import { User } from "./manageComponents/User";
import { useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import $ from "jquery";
import { TutorApp } from "./manageComponents/TutorApp";

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
      case 5:
        return <User />;
      case 6:
        return <TutorApp />;
    }
  };
  return (
    <div className="manage">
      <div className="manageBody">
        <div className="m-head">
          <h2 id="m-title">MANAGE</h2>
          <h2 id="m-Logo" onClick={() => moveHome()}>
            COCO
          </h2>
        </div>
        {show(menu)}
      </div>

      <Menu moveTo={(e) => moveTo(e)} />
    </div>
  );
};

//---------------------------------- 메뉴 ----------------------------------------------

const Menu = (props) => {
  const [vis, setVis] = useState(false);

  $(document).ready(function () {
    function toggleSidebar() {
      $(".button").toggleClass("active");
      $("main").toggleClass("move-to-left");
      $(".sidebar-item").toggleClass("active");
    }

    $(".button").on("click tap", function () {
      toggleSidebar();
    });

    $(document).keyup(function (e) {
      if (e.keyCode === 27) {
        toggleSidebar();
      }
    });
  });

  const returnVis = (e) => {
    if (e === true) return "visible";
    else {
      return "hidden";
    }
  };

  return (
    <div className="manageMenu">
      <h2
        onClick={() => {
          setVis(!vis);
        }}
      >
        <HiMenu
          size={30}
          style={{ marginRight: "20px", paddingBottom: "3px" }}
        />
        <span></span>Menu
      </h2>
      <div style={{ visibility: returnVis(vis) }} id="menuDiv">
        <h3 onClick={() => props.moveTo(1)}>- TASK UPLOAD</h3>
        <h3 onClick={() => props.moveTo(2)}>- TASK LIST</h3>
        <h3 onClick={() => props.moveTo(3)}>- POST LIST</h3>
        <h3 onClick={() => props.moveTo(4)}>- NOTICE</h3>
        <h3 onClick={() => props.moveTo(5)}>- USER MANAGEMENT</h3>
        <h3 onClick={() => props.moveTo(6)}>- TUTOR APPLICATION</h3>
      </div>
    </div>
  );
};

//----------------------------------문제 리스트----------------------------------------------

//----------------------------------게시글 리스트----------------------------------------------
