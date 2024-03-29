import React from "react";
import "./MyPage.css";
import {
  BsFillEyeFill,
  BsChatSquareTextFill,
  BsHeartFill,
  BsFillLightbulbFill,
  BsMegaphoneFill,
  BsQuestionLg,
  BsTrash,
  BsPencilSquare,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { API } from "api/config";
import Swal from "sweetalert2";
import axiosInstance from "api/axiosWithPathParameter";

export const ThirdBox = (props) => {
  const navigate = useNavigate();
  const moveDetail = (e) => {
    navigate(`/board/${e}`);
  };

  function timeForToday(value) {
    const today = new Date();
    const timeValue = new Date(value);
    const convertTime = timeValue.getTime() + 9 * 60 * 60 * 1000;

    const betweenTime = Math.floor((today.getTime() - convertTime) / 1000 / 60);
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

  const chCate = (e) => {
    if (e === 1) {
      return [
        "Notice",
        "rgb(231, 255, 211)",
        <BsMegaphoneFill
          size={20}
          color="#00ff00"
          style={{ marginRight: "10px", paddingBottom: "2px" }}
        />,
      ];
    } else if (e === 2) {
      return [
        "Help",
        "rgb(255, 240, 101)",
        <BsQuestionLg
          size={20}
          color="rgb(255, 200, 101)"
          style={{ marginRight: "10px", paddingBottom: "2px" }}
        />,
      ];
    } else if (e === 3) {
      return [
        "자유",
        "skyblue",
        <BsFillLightbulbFill
          size={20}
          color="rgb(111, 101, 255)"
          style={{ marginRight: "10px", paddingBottom: "2px" }}
        />,
      ];
    }
  };

  const modify = (e) => {
    navigate(`/board_modify/${e}`);
  };

  const onDeleteHandler = (e) => {
    Swal.fire({ icon: "question", title: "게시글을 삭제하시겠습니까?" }).then(
      (result) => {
        if (result.isConfirmed) {
          axiosInstance
            .delete(API.BOARD, {
              headers: {
                Authorization: "Bearer " + props.userinfo.access_token,
              },
              urlParams: {
                board_id: e,
              },
            })
            .then((res) => {
              Swal.fire({
                icon: "success",
                title: "게시글을 삭제하였습니다",
              });
              setTimeout(() => window.location.reload(), 1000);
            })
            .catch(() => {
              Swal.fire({
                icon: "error",
                title: "게시글 삭제에 실패하였습니다",
              });
            });
        }
      }
    );
  };

  return (
    <div className="mp-ThirdBox">
      {props.props.map((e) => {
        const category = chCate(e.category);
        return (
          <div
            className="myGuel"
            style={{ borderColor: category[1] }}
            key={e.id}
          >
            <h4>
              <span>{category[2]}</span>
              {category[0]}
            </h4>
            <h3
              style={{
                textOverflow: "ellipsis",
                maxWidth: "223px",
                textAlign: "center",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
              onClick={() => moveDetail(e.id)}
            >
              {e.title}
            </h3>
            <h5>{timeForToday(e.time)}</h5>
            <div className="GuelBox">
              <div className="bBox">
                <BsFillEyeFill color="rgb(112, 112, 112)" size={20} />
                <p>{e.views}</p>
              </div>
              <div className="bBox">
                <BsChatSquareTextFill
                  color="rgb(112, 112, 112)"
                  size={18}
                  style={{ marginLeft: "10px" }}
                />
                <p>{e.comments}</p>
              </div>
              <div className="bBox">
                <BsHeartFill size={18} color="red" />
                <p>{e.likes}</p>
              </div>
            </div>
            <BsPencilSquare
              style={{ cursor: "pointer" }}
              size={20}
              onClick={() => modify(e.id)}
            />
            <BsTrash
              id="delGuel"
              size={20}
              color="red"
              onClick={() => onDeleteHandler(e.id)}
            />
          </div>
        );
      })}
    </div>
  );
};
