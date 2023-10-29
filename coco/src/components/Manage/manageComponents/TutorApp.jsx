import React from "react";
import { BsPersonCheck, BsPersonX } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { API } from "api/config";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "../../../app/store";
import Swal from "sweetalert2";
import axios from "axios";
import _ from "lodash";

export const TutorApp = () => {
  const userInfo = useAppSelector((state) => state.loginState);
  const { data: tutorRequest, isFetching: isFetching1 } = useQuery({
    queryKey: ["tutorlist", "request"],
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
      onSuccess: (res) => {
        //queryClient.invalidateQueries() 를 이용하여 튜터리스트를 업데이트하면 아직 db에 변경사항이 적용되기 전에 요청을 해서 받아오기 때문에 캐쉬를 직접 조작해줘야함
        queryClient.setQueryData(["tutorlist", "request"], (oldData) => {
          let newData = _.cloneDeep(oldData);
          newData.data = newData.data.filter((a) => a.user_id != info.user_id);
          return newData;
        });
        queryClient.setQueryData(["tutorlist"], (oldData) => {
          let newData = _.cloneDeep(oldData);
          newData.data.userlist = [
            ...newData.data.userlist,
            { id: info.user_id },
          ];
          return newData;
        });
        Swal.fire({ icon: "success", title: "튜터에 추가되었습니다." });
      },
    }
  );
  const addTutor = () => {
    updateMutation.mutate();
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
  const delateMutation = useMutation(
    () =>
      axios.patch(
        API.PERMISSION,
        { id: info.id, tutor: 0 },
        {
          headers: { Authorization: "Bearer " + userInfo.access_token },
        }
      ),
    {
      onSuccess: (res) => {
        //queryClient.invalidateQueries() 를 이용하여 튜터리스트를 업데이트하면 아직 db에 변경사항이 적용되기 전에 요청을 해서 받아오기 때문에 캐쉬를 직접 조작해줘야함
        queryClient.setQueryData(["tutorlist"], (oldData) => {
          let newData = _.cloneDeep(oldData);
          newData.data.userlist = newData.data.userlist.filter(
            (a) => a.id != info.id
          );
          return newData;
        });
        Swal.fire({ icon: "success", title: "튜터에서 제거되었습니다." });
      },
    }
  );
  const delTutor = () => {
    delateMutation.mutate();
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
