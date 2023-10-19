import React, { useEffect } from "react";
import { Suspense } from "react";
import "./Alarm.css";
import { Header } from "components/Home/Header";
import { Footer } from "components/Home/Footer";
import Spinner from "react-bootstrap/Spinner";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { LuMailPlus } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { API } from "api/config";
import fetchData from "../../api/fetchTask";
const axios = require("axios")

export const Alarm = () => {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.loginState);
  var user_id = userInfo.id;

  useEffect(() => {
    axios
      .patch(API.ALARM + `/${user_id}`, {
        user_id: user_id,
      })
      .then((res) => {
        if (res.data === true) {
          dispatch({
            type: "loginSlice/alarm",
            alarm: 0,
          });
        }
      });
  }, []);

  return (
    <>
      <Header />
      <div className="alarm">
        <div className="alarmBody">
          <div className="alarmTop">
            <LuMailPlus size={23} color="lightgreen" />
            <h2>Alarm</h2>
          </div>

          <hr />
          <Suspense fallback={<Spinner />}>
            <AlarmContent
              resource={fetchData(API.ALARM, {
                headers: { Authorization: "Bearer " + userInfo.access_token },
              })}
            />
          </Suspense>
        </div>
      </div>
      <Footer />
    </>
  );
};
/* API 받아주고 */
const AlarmContent = ({ resource }) => {
  const data = resource.read();
  console.log(data);
  return (
    <div className="alarmContent">
      {data.map((item) => {
        return <GetAlarm info={item} key={item.time} />;
      })}
    </div>
  );
};

const GetAlarm = (props) => {
  const navigate = useNavigate();

  const getTime = (time) => {
    time = time.split("T");

    return (
      <div className="timestamp">
        <p id="time">{time[0]}</p>

        <p id="time">{time[1]}</p>
      </div>
    );
  };

  const movepage = (e, context) => {
    switch (e) {
      case 1: // make comment, like post, like comment
        navigate(`/board/${context.board_id}`); //${id} 로 수정
        break;
      case 2: // tutor certification
        navigate(`/room`);
        break;
      case 3: // studyroom inviting, room closed, room Q&A update,
        navigate(`/room/${context.room_id}`); //${id} 로 수정
        break;
      case 4: // room roadmap undate
        navigate(`/room/roadmap/${context.room_id}/${context.roadmap_id}`); //${room_id}/${roadmap_id} 로 수정
        break;
      case 5: // code selection
        navigate(`/result/2`); //${id} 로 수정
        break;
      case 6: // To manager
        navigate(`/manage`); //${id} 로 수정
        break;
    }
  };

  const render = (e) => {
    const context = JSON.parse(e.context);
    switch (e.category) {
      case 1: // make comment
        return (
          <p
            id="context"
            title="해당 페이지로 이동"
            onClick={() => movepage(1, context)}
          >
            {e.sender}님이 {e.receiver}님의 글에 댓글을 달았습니다.
          </p>
        );
      case 2: // like post
        return (
          <p
            id="context"
            title="해당 페이지로 이동"
            onClick={() => movepage(1, context)}
          >
            {e.sender}님이 {e.receiver}님의 글을 좋아합니다.
          </p>
        );
      case 3: // like comment
        return (
          <p
            id="context"
            title="해당 페이지로 이동"
            onClick={() => movepage(1, context)}
          >
            {e.sender}님이 {e.receiver}님의 댓글을 좋아합니다.
          </p>
        );
      case 4: // Tutor certification
        return (
          <p
            id="context"
            title="해당 페이지로 이동"
            onClick={() => movepage(2, context)}
          >
            {e.receiver} 님이 튜터 권한을 획득했습니다.
          </p>
        );
      case 5: // room inviting
        return (
          <p
            id="context"
            title="해당 페이지로 이동"
            onClick={() => movepage(3, context)}
          >
            {e.sender}님이 {e.receiver}님을 스터디룸 '{context.room_name}'에
            초대했습니다.
          </p>
        );
      case 6: // room closed
        return (
          <p
            id="context"
            title="해당 페이지로 이동"
            onClick={() => movepage(3, context)}
          >
            {e.receiver}님의 스터디룸 '{context.room_name}'이 삭제되었습니다.
          </p>
        );
      case 7: // room Q&A update
        return (
          <p
            id="context"
            title="해당 페이지로 이동"
            onClick={() => movepage(3, context)}
          >
            {e.sender}님이 {e.receiver}님의 질문에 답변을 남겼습니다.
          </p>
        );
      case 8: // room Q&A confirm
        return (
          <p
            id="context"
            title="해당 페이지로 이동"
            onClick={() => movepage(3, context)}
          >
            {e.sender}님이 {e.receiver}님의 답변을 채택했습니다.
          </p>
        );
      case 9: // room roadmap make
        return (
          <p
            id="context"
            title="해당 페이지로 이동"
            onClick={() => movepage(4, context)}
          >
            스터디룸 '{context.room_name}'에 새로운 ROAD MAP이 등록되었습니다.
          </p>
        );
      case 10: // room roadmap undate
        return (
          <p
            id="context"
            title="해당 페이지로 이동"
            onClick={() => movepage(4, context)}
          >
            스터디룸 '{context.room_name}'의 ROAD MAP이 업데이트 되었습니다.
          </p>
        );
      case 11: // if tutor -> new Question assigned
        return (
          <p
            id="context"
            title="해당 페이지로 이동"
            onClick={() => movepage(3, context)}
          >
            스터디룸'{context.room_name}'에 {e.sender}님의 새로운 질문이
            등록되었습니다.
          </p>
        );
      case 12: // my code selection
        return (
          <p
            id="context"
            title="해당 페이지로 이동"
            onClick={() => movepage(5, context)}
          >
            문제 task_name에 대한 {e.receiver}님의 풀이가 도움된 코드로
            채택되었습니다.
          </p>
        );
      case 13: // To manager
        return (
          <p
            id="context"
            title="해당 페이지로 이동"
            onClick={() => movepage(6, context)}
          >
            {e.receiver}님이 관리자 권한을 부여받았습니다.
          </p>
        );
      case 14: // To manager
        return (
          <p
            id="context"
            title="해당 페이지로 이동"
            onClick={() => movepage(3, context)}
          >
            {e.receiver}님이 튜터 권한을 부여받았습니다.
          </p>
        );
    }
  };

  return (
    <div className="alr">
      {getTime(props.info.time)}
      {render(props.info)}
    </div>
  );
};
