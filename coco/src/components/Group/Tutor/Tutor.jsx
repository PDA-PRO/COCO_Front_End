import React, { useState } from "react";
import "./Tutor.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { BsSendPlus } from "react-icons/bs";
import axios from "axios";
import { API } from "api/config";
import { useAppSelector } from "../../../app/store";

export const Tutor = () => {
  const [reason, setReason] = useState("");
  const userInfo = useAppSelector((state) => state.loginState);
  const userID = userInfo.id;
  const onReasonHandler = (e) => {
    setReason(e.currentTarget.value);
  };
  const onSubmitHandler = () => {
    axios
      .post(
        API.TUTORREQUEST,
        {},
        {
          params: { user_id: userID, reason: reason },
        }
      )
      .then(() => alert("신청성공"))
      .catch(() => alert("이미 신청을 완료했습니다"));
  };
  return (
    <div className="tutor">
      <div className="left">
        <h4>튜터란?</h4>
        <p>튜터는 스터디룸을 만들 권한을 부여받습니다.</p>
        <p>스터디룸을 통해 튜터는 튜티들을 관리할 수 있습니다.</p>
        <p>
          스터디룸에서는 Q&A와 학습 로드맵을 통해 튜터들의 학습을 도와줄 수
          있습니다.
        </p>

        <hr />
        <h4>튜터 조건</h4>
        <p>튜터는 각 난이도별 문제의 1/3을 모두 해결해야 합니다.</p>
        <p>
          문제 해결이 완료되지 않았더라도 사유를 작성해 튜터로 승인받을 수
          있습니다.
        </p>
        <p>튜터 승인까지는 일주일 정도의 시간이 소요될 수 있습니다.</p>
      </div>

      <div className="right">
        <div className="uop">
          <p>신청 사유 : </p>
          <InputGroup className="mb-0">
            <Form.Control
              placeholder="조건 충족 시, 신청사유를 작성하지 않아도 됩니다."
              onBlur={onReasonHandler}
            />
          </InputGroup>
        </div>

        <div className="btn-application" onClick={onSubmitHandler}>
          <p>신청하기</p>
          <BsSendPlus size={20} />
        </div>
      </div>
    </div>
  );
};
