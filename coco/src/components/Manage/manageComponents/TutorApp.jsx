import React from "react";
import { BsPersonCheck, BsPersonX } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { API } from "api/config";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "../../../app/store";
import Swal from "sweetalert2";
import axios from "axios";

export const TutorApp = () => {
  const userInfo = useAppSelector((state) => state.loginState);
  const { data: tutorRequest, isFetching: isFetching1 } = useQuery({
    queryKey: ["tutorrequestlist"],
    queryFn: () =>
      axios.get(API.REQUESTTUTOR, {
        headers: { Authorization: "Bearer " + userInfo.access_token },
      }),
  });
  const { data: tutorlist, isFetching: isFetching2 } = useQuery({
    queryKey: ["tutorlist"],
    queryFn: () => axios.get(API.USER, { params: { tutor: 1 } }),
  });
  if (isFetching1 || isFetching2) {
    return <></>;
  }
  return (
    <>
      <h2 className="mTi">TUTOR APPLICATION</h2>
      <div className="m-upload">
        <div className="divide-box2">
          <div className="box">
            <p>튜터 신청 목록</p>
            <div className="tgridTop">
              <p>ID</p>
              <p>학습 달성률 (1~5)</p>
              <p>승인</p>
            </div>
            {tutorRequest.data.map((e) => (
              <Applier info={e} />
            ))}
          </div>
          <div className="box">
            <p>튜터 목록</p>
            <div className="tmemHead">
              <p>ID</p>
              <p>권한 제거</p>
            </div>
            {tutorlist.data.userlist.map((e) => (
              <TMem info={e} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const Applier = ({ info }) => {
  const userInfo = useAppSelector((state) => state.loginState);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const updateMutation = useMutation(
    () =>
      axios.patch(
        API.PERMISSION,
        { id: info.user_id, tutor: 1 },
        {
          headers: { Authorization: "Bearer " + userInfo.access_token },
        }
      ),
    {
      onSuccess: () => {
        // 요청이 성공한 경우
        console.log("onSuccess");
        queryClient.invalidateQueries("tutorlist"); // queryKey 유효성 제거
      },
    }
  );
  const addTutor = () => {
    updateMutation.mutate();
    Swal.fire({ icon: "success", title: "튜터에 추가되었습니다." });
  };

  return (
    <div className="tutorGrid">
      <p onClick={() => navigate(`/mypage/id1`)} style={{ cursor: "pointer" }}>
        {info.user_id}
      </p>
      <p style={{ color: "rgb(98, 148, 255)" }}>1/2</p>
      <p style={{ color: "#9DD84B" }}>1/3</p>
      <p style={{ color: "#ff7e00" }}>1/5</p>
      <p style={{ color: "red" }}>1/6</p>
      <p style={{ color: "#7d1b7e" }}>1/8</p>
      <p className="confirm" onClick={() => addTutor()}>
        <BsPersonCheck size={30} color="rgb(98, 148, 255)" />
      </p>
      <p style={{ color: "gray" }}>사유</p>
      <p className="reas">{info.reason}</p>
    </div>
  );
};

const TMem = ({ info }) => {
  const userInfo = useAppSelector((state) => state.loginState);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const updateMutation = useMutation(
    () =>
      axios.patch(
        API.PERMISSION,
        { id: info.id, tutor: 0 },
        {
          headers: { Authorization: "Bearer " + userInfo.access_token },
        }
      ),
    {
      onSuccess: () => {
        // 요청이 성공한 경우
        console.log("onSuccess");
        queryClient.invalidateQueries("tutorlist"); // queryKey 유효성 제거
      },
    }
  );
  const delTutor = () => {
    updateMutation.mutate();
    Swal.fire({ icon: "success", title: "튜터에서 제거되었습니다." });
  };

  return (
    <div className="tmem">
      <p onClick={() => navigate(`/mypage/id1`)}>{info.id}</p>
      <p onClick={() => delTutor()}>
        <BsPersonX size={23} color="red" />
      </p>
    </div>
  );
};
