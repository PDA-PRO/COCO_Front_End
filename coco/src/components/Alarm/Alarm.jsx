import React from "react";
import { Suspense } from "react";
import "./Alarm.css";
import { Header } from "components/Home/Header";
import { Footer } from "components/Home/Footer";
import Spinner from "react-bootstrap/Spinner";
import { useAppSelector } from "../../app/store";
import { LuMailPlus } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export const Alarm = () => {
  const userInfo = useAppSelector((state) => state.loginState);
  const path = window.location.pathname.split("/");

  var me = userInfo.id;
  var now = path.at(-1);

  // const {data} = useQuery()

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
          {/* useQuery써서 API 호출 */}
          <AlarmContent />
        </div>
      </div>
      <Footer />
    </>
  );
};
/* API 받아주고 */
const AlarmContent = () => {
  return (
    <div className="alarmContent">
      <GetAlarm state={1} />
      <GetAlarm state={4} />
      <GetAlarm state={7} />
      <GetAlarm state={10} />
      <GetAlarm state={11} />
      <GetAlarm state={12} />
    </div>
  );
};

/* 받은 API에서 map으로 하나씩 출력 */

const GetAlarm = (props) => {
  const navigate = useNavigate();

  console.log(props.state);

  const movepage = (e) => {
    switch (e) {
      case 1: // make comment, like post, like comment
        navigate(`/board/3`); //${id} 로 수정
      case 2: // tutor certification
        navigate(`/room`);
      case 3: // studyroom inviting, room closed, room Q&A update,
        navigate(`/room/2`); //${id} 로 수정

      case 4: // room roadmap undate
        navigate(`/room/roadmap/1/1`); //${room_id}/${roadmap_id} 로 수정
      case 5: // code selection
        navigate(`/result/2`); //${id} 로 수정

      case 6: // To manager
        navigate(`/manage`); //${id} 로 수정
    }
  };

  const render = (e) => {
    switch (e) {
      case 1: // make comment
        return (
          <p
            id="context"
            title="해당 페이지로 이동"
            onClick={() => movepage(1)}
          >
            sender_id님이 user_id님의 글에 댓글을 달았습니다.
          </p>
        );
      case 2: // like post
        return (
          <p
            id="context"
            title="해당 페이지로 이동"
            onClick={() => movepage(1)}
          >
            sender_id님이 user_id님의 글을 좋아합니다.
          </p>
        );
      case 3: // like comment
        return (
          <p
            id="context"
            title="해당 페이지로 이동"
            onClick={() => movepage(1)}
          >
            sender_id님이 user_id님의 댓글을 좋아합니다.
          </p>
        );
      case 4: // Tutor certification
        return (
          <p
            id="context"
            title="해당 페이지로 이동"
            onClick={() => movepage(2)}
          >
            user_id 님이 튜터 권한을 획득했습니다.
          </p>
        );
      case 5: // room inviting
        return (
          <p
            id="context"
            title="해당 페이지로 이동"
            onClick={() => movepage(3)}
          >
            sender_id님이 user_id님을 스터디룸 studyroom_name에 초대했습니다.
          </p>
        );
      case 6: // room closed
        return (
          <p
            id="context"
            title="해당 페이지로 이동"
            onClick={() => movepage(3)}
          >
            user_id님의 스터디룸 studyroom_name이 삭제되었습니다.
          </p>
        );
      case 7: // room Q&A update
        return (
          <p
            id="context"
            title="해당 페이지로 이동"
            onClick={() => movepage(3)}
          >
            sender_id님이 user_id님의 질문에 답변을 남겼습니다.
          </p>
        );
      case 8: // room Q&A confirm
        return (
          <p
            id="context"
            title="해당 페이지로 이동"
            onClick={() => movepage(3)}
          >
            sender_id님이 user_id님의 답변을 채택했습니다.
          </p>
        );
      case 9: // room roadmap make
        return (
          <p
            id="context"
            title="해당 페이지로 이동"
            onClick={() => movepage(4)}
          >
            스터디룸 studyroom_name에 새로운 ROAD MAP이 등록되었습니다.
          </p>
        );
      case 10: // room roadmap undate
        return (
          <p
            id="context"
            title="해당 페이지로 이동"
            onClick={() => movepage(4)}
          >
            스터디룸 studyroom_name의 ROAD MAP이 업데이트 되었습니다.
          </p>
        );
      case 11: // if tutor -> new Question assigned
        return (
          <p
            id="context"
            title="해당 페이지로 이동"
            onClick={() => movepage(3)}
          >
            스터디룸 studyroom_name에 sender_id님의 새로운 질문이
            등록되었습니다.
          </p>
        );
      case 12: // my code selection
        return (
          <p
            id="context"
            title="해당 페이지로 이동"
            onClick={() => movepage(5)}
          >
            문제 task_name에 대한 user_id님의 풀이가 도움된 코드로
            채택되었습니다.
          </p>
        );
      case 13: // To manager
        return (
          <p
            id="context"
            title="해당 페이지로 이동"
            onClick={() => movepage(6)}
          >
            user_id님이 관리자 권한을 부여받았습니다.
          </p>
        );
    }
  };
  return (
    <div className="alr">
      <p id="time">23-09-15 17:00</p>
      {render(props.state)}
    </div>
  );
};
