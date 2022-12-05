import React, { Suspense } from "react";
import { Header } from "../../Home/Header";
import { Footer } from "../../Home/Footer";
import "./BD.css";
import {
  BsCode,
  BsCodeSlash,
  BsFillEyeFill,
  BsFillChatSquareDotsFill,
  BsFillHeartFill,
} from "react-icons/bs";
import { SlPencil } from "react-icons/sl";
import { VscCommentDiscussion } from "react-icons/vsc";
import Spinner from "react-bootstrap/Spinner";
import fetchData from "../../../api/fetchTask";
import { Comments } from "./Comments/Comments";
import { WriteComment } from "./Comments/WriteComment";
import { useState } from "react";

export const BoardDetail = () => {
  var path = window.location.pathname;
  path = path.split("/");

  return (
    <>
      <Header />
      <Suspense fallback={<Spinner/>}>
        <GetBoardDetail resource={fetchData(`http://127.0.0.1:8000/board/${path.at(-1)}/`)}/>
      </Suspense>
      <Footer />
    </>
  );
};

const GetBoardDetail = ({resource}) => {
  const detail = resource.read(); //api fetch 결과
  console.log(detail)
  
  const [write, setWrite] = useState(false);

  const commentShoot = (e) => {
    if (e == 1) {
      setWrite(true);
    } else {
      setWrite(false);
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
  

  return(
    <>
          <div className="boardDetail">
        <div className="BDtitle">
          <h2>No.{detail.title}</h2>
          <div className="BD_idAndTime">
            <h3>작성자 : sncalphs</h3>
            <h3>{timeForToday(detail.time)}</h3>
          </div>
        </div>

        <div className="BDsubTitle">
          <div id="bun1">
            <div className="BDun">
              <BsFillEyeFill size={25} color="gray" />
              <p>{detail.views}</p>
            </div>

            <div className="BDun">
              <BsFillChatSquareDotsFill size={20} color="gray" />
              <p>{detail.comments}</p>
            </div>
          </div>

          <div id="bun2">
            <div className="BDun">
              <BsFillHeartFill size={23} />
              <p>{detail.likes}</p>
            </div>
          </div>
        </div>

        <div className="BDContent">
          <div className="BDTxt">
            <p>
              {detail.context}
            </p>
          </div>

          <div className="BDCode">
            <div className="BD_codeTop">
              <BsCode size={33} />
              <h2>CODE HERE</h2>
              <BsCodeSlash size={33} />
            </div>

            <div className="BD_showCode">
              <p>
                n = int(input()) <br /> print(n+m)
              </p>
            </div>
            <p></p>
          </div>
        </div>
        <div className="comments">
          <div className="cHead">
            <VscCommentDiscussion size={35} color="#6BE52E" />
            <h2>댓글</h2>
          </div>
          <div
            className="cWrite"
            onClick={() => {
              commentShoot(1);
            }}
          >
            <SlPencil size={25} />
            <p>댓글 작성</p>
          </div>
          <div className="cBody">
            {write ? (
              <WriteComment commentShoot={commentShoot} />
            ) : (
              <div id="closeState"></div>
            )}

            {/* 댓글불러오기 */}
            {/* <GetList resource={fetchData("http://127.0.0.1:8000/board")} /> */}
            <Comments />
            <Comments />
          </div>
        </div>
      </div>
    </>
  );
}

const GetList = ({ resource }) => {
  const commentList = resource.read();

  return (
    <>
      {commentList.map((e) => {
        return <Comments props={e} key={e.id} />;
      })}
    </>
  );
};
