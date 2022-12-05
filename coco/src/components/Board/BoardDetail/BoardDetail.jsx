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
  const [write, setWrite] = useState(false);
  const commentShoot = (e) => {
    if (e == 1) {
      setWrite(true);
    } else {
      setWrite(false);
    }

    console.log(write);
  };

  return (
    <>
      <Header />
      <div className="boardDetail">
        <div className="BDtitle">
          <h2>No.1 모르겠어요!</h2>
          <div className="BD_idAndTime">
            <h3>작성자 : sncalphs</h3>
            <h3>2022.11.30</h3>
          </div>
        </div>

        <div className="BDsubTitle">
          <div id="bun1">
            <div className="BDun">
              <BsFillEyeFill size={25} color="gray" />
              <p>25</p>
            </div>

            <div className="BDun">
              <BsFillChatSquareDotsFill size={20} color="gray" />
              <p>2</p>
            </div>
          </div>

          <div id="bun2">
            <div className="BDun">
              <BsFillHeartFill size={23} />
              <p>6</p>
            </div>
          </div>
        </div>

        <div className="BDContent">
          <div className="BDTxt">
            <p>
              아무리 풀어도 모르겠어요
              <br />
              고수님들 도와주세요!
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

            {/* <GetList resource={fetchData("http://127.0.0.1:8000/board")} /> */}
            <Comments />
            <Comments />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

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
