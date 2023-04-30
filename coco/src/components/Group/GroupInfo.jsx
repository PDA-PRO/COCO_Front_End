import React from "react";
import "./GroupInfo.css";
import { Header } from "../Home/Header";
import { Footer } from "../Home/Footer";
import { Suspense } from "react";
import Spinner from "react-bootstrap/esm/Spinner";
import fetchData from "../../api/fetchTask";
import { Pagination } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BsFillEyeFill,
  BsChatSquareTextFill,
  BsHeart,
  BsHeartFill,
  BsFillLightbulbFill,
  BsMegaphoneFill,
  BsQuestionLg,
} from "react-icons/bs";
import { useEffect, useState } from "react";
import { TbCrown } from "react-icons/tb";
import { TfiPencil } from "react-icons/tfi";
import { ImBooks } from "react-icons/im";
import { IoChatbubblesOutline } from "react-icons/io5";

export const GroupInfo = () => {
  var path = window.location.pathname;
  path = path.split("/");

  return (
    <>
      <Header />
      <div className="groupInfo">
        <div className="gi">
          <Suspense fallback={<Spinner />}>
            <GiHeader
              resource={fetchData(
                `http://127.0.0.1:8000/group/${path.at(-1)}/`
              )}
            />
          </Suspense>

          <div id="gi-B">
            <div className="gi-GB">
              <Suspense fallback={<Spinner />}>
                <GroupBoard
                  resource={fetchData(
                    `http://127.0.0.1:8000/group/board/${path.at(-1)}/`
                  )}
                />
              </Suspense>
            </div>
            <div className="gi-ML">
              <Suspense fallback={<Spinner />}>
                <MemberList
                  resource={fetchData(
                    `http://127.0.0.1:8000/group/${path.at(-1)}/`
                  )}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

const GiHeader = ({ resource }) => {
  const info = resource.read();
  return (
    <div className="gi-head">
      <div className="headOne">
        <div>
          <img src="\image\group.png" height="73px" />
          <h2>{info.name}</h2>
        </div>

        <div>
          <p>전체 그룹 랭킹 : 3위</p>
          <p>현재 그룹원 수 : {info.members.length}명</p>
          <p>그룹 장 : {info.leader}님</p>
        </div>
      </div>
      <div className="headTwo">
        <p>{info.desc}</p>
      </div>
    </div>
  );
};

const MemberList = ({ resource }) => {
  const info = resource.read();
  const members = info.members;
  members.sort(function (a, b) {
    return b[1] - a[1];
  });
  const maxPage = Math.ceil(members.length / 10);
  const [page, setPage] = useState(1);
  const leader = info.leader;
  return (
    <div className="member-list">
      <h3>Group Members</h3>
      <div className="member-list-header">
        <p> </p>
        <p>ID</p>
        <p>Score</p>
      </div>
      {members.slice(10 * (page - 1), 10 * (page - 1) + 10).map((e) => {
        return <Member info={e} key={e.id} props={leader} />;
      })}
    </div>
  );
};

const Member = ({ info, props }) => {
  const navigate = useNavigate();

  const GoInfo = (e) => {
    // 누른 멤버의 마이페이지로 이동
    navigate(`/group/${e}`);
  };

  return (
    <div className="oneMember">
      <p>{info[0] === props ? <TbCrown size={25} color="orange" /> : ""}</p>
      <p>{info[0]}</p>
      <p>{info[1]}</p>
    </div>
  );
};

const GroupBoard = ({ resource }) => {
  const info = resource.read();
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const moveWorkbook = () => {
    setPage(2);
  };
  const moveBoard = () => {
    setPage(1);
  };
  const moveWrite = () => {
    navigate(`/group/board/write`);
  };

  return (
    <div className="group-board">
      <div className="gb-header">
        {page === 1 ? (
          <div id="he1" onClick={() => moveWorkbook()}>
            <ImBooks size={25} color="green" />
            <p>그룹 문제집열기</p>
          </div>
        ) : (
          <div id="he1" onClick={() => moveBoard()}>
            <IoChatbubblesOutline size={25} color="green" />
            <p>그룹 게시판 열기</p>
          </div>
        )}

        {page === 1 ? (
          <div id="he1" onClick={() => moveWrite()}>
            <TfiPencil size={25} />
            <p>글쓰기</p>
          </div>
        ) : (
          <p></p>
        )}
      </div>
      <div className="gb-body">
        {/* {page === 1 ? : } */}
        <GroupPost />
        <GroupPost />
        <GroupPost />
        <GroupPost />
      </div>
    </div>
  );
};

const GroupPost = ({ props }) => {
  const navigate = useNavigate();
  const moveDetail = (e) => {
    navigate(`/group/board/${e}`);
  };
  const [category, setCategory] = useState("");
  const [bgColor, setBgColor] = useState("white");
  const [cateIcon, setCateIcon] = useState();
  const [date, setDate] = useState("");

  useEffect(() => {
    const chCate = (e) => {
      if (e === 1) {
        setCategory("Notice");
        setBgColor("rgb(231, 255, 211)");
        setCateIcon(<BsMegaphoneFill size={25} color="#00ff00" />);
      } else if (e === 2) {
        setCategory("Help");
        setBgColor("rgb(255, 248, 211)");
        setCateIcon(<BsQuestionLg size={25} color="rgb(255, 200, 101)" />);
      } else if (e === 3) {
        setCategory("자유");
        setBgColor("rgb(237, 251, 255)");
        setCateIcon(
          <BsFillLightbulbFill size={25} color="rgb(111, 101, 255)" />
        );
      }
    };

    function timeForToday(value) {
      const today = new Date();
      const timeValue = new Date(value);

      const betweenTime = Math.floor(
        (today.getTime() - timeValue.getTime()) / 1000 / 60
      );
      if (betweenTime < 1) return "방금전";
      if (betweenTime < 60) {
        return `${betweenTime}분전`;
      }

      const betweenTimeHour = Math.floor(betweenTime / 60);
      if (betweenTimeHour < 24) {
        return `${betweenTimeHour}시간전`;
      }

      const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
      if (betweenTimeDay < 365) {
        return `${betweenTimeDay}일전`;
      }

      return `${Math.floor(betweenTimeDay / 365)}년전`;
    }

    chCate(1);
    // var originTime = props.props.time;
    // setDate(timeForToday(originTime));
  }, []);

  return (
    <div
      className="gPost"
      // style={{ backgroundColor: bgColor }}
      // onClick={() => {
      //   moveDetail(props.props.id);
      // }}
    >
      <div className="gPostInner">
        <div className="un">
          {/* <p>{category}</p>
          {cateIcon} */}
          <p>자유</p>
          <BsFillLightbulbFill size={25} color="rgb(111, 101, 255)" />
        </div>

        <div className="gPostTitle">
          {/* <h2>{props.props.title}</h2> */}
          <h2>글 제목</h2>
        </div>

        <div className="un">
          {/* <h4>{props.props.user_id}</h4>
          <h4>{date}</h4> */}
          <h4>작성자</h4>
          <h4>?일전</h4>
        </div>

        <div className="un">
          <div className="un2">
            <BsFillEyeFill color="rgb(112, 112, 112)" />
            {/* <p>{props.props.views}</p> */}
            <p>100</p>
            <BsChatSquareTextFill
              color="rgb(112, 112, 112)"
              style={{ marginLeft: "10px" }}
            />
            {/* <p>{props.props.comments}</p> */}
            <p>123</p>
          </div>
          <div className="un2">
            <BsHeartFill color="gray" />
            {/* <p>{props.props.likes}</p> */}
            <p>1</p>
          </div>
        </div>
      </div>
    </div>
  );
};
