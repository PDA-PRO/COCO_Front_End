import React from "react";
import "./GroupInfo.css";
import { Header } from "../Home/Header";
import { Footer } from "../Home/Footer";
import { Suspense } from "react";
import Spinner from "react-bootstrap/esm/Spinner";
import { GoSearch } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/store";
import { useState } from "react";
import { TbCrown } from "react-icons/tb";
import { TfiPencil } from "react-icons/tfi";
import { ImBooks } from "react-icons/im";
import { FiUserPlus } from "react-icons/fi";
import { RiUserAddLine } from "react-icons/ri";
import { IoChatbubblesOutline } from "react-icons/io5";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { MdClear } from "react-icons/md";
import { PiFolderNotchPlusDuotone } from "react-icons/pi";
import { QA } from "./QA/QA";
import { RoadMap } from "./RoadMap/RoadMap";
import { API } from "api/config";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import axiosInstance from "api/axiosWithPathParameter";
import { Notfound } from "../Notfound.jsx";

export const GroupInfo = () => {
  var path = window.location.pathname.split("/");
  const userInfo = useAppSelector((state) => state.loginState);
  const userID = userInfo.id;
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { isLoading, data } = useQuery({
    queryKey: ["roominfo", path.at(-1), 11],
    queryFn: () =>
      axiosInstance.get(API.ROOM, {
        headers: {
          Authorization: "Bearer " + userInfo.access_token,
        },
        urlParams: {
          room_id: path.at(-1),
        },
      }),
  });

  const moveWorkbook = () => {
    setPage(2);
  };
  const moveBoard = () => {
    setPage(1);
  };

  const moveWrite = (id) => {
    navigate(`/room/qa/write`, { state: id });
  };

  return (
    <>
      <Header />
      {data !== undefined ? (
        <div className="groupInfo">
          <div className="gi">
            {isLoading ? <Spinner /> : <GiHeader info={data.data} />}

            <div id="gi-B">
              <div className="gi-GB">
                <div className="gb-header">
                  {page === 1 ? (
                    <div id="he1" onClick={() => moveWorkbook()}>
                      <ImBooks size={25} color="green" />
                      <p>학습 RoadMap 열기</p>
                    </div>
                  ) : (
                    <div id="he1" onClick={() => moveBoard()}>
                      <IoChatbubblesOutline size={25} color="green" />
                      <p>Q & A 열기</p>
                    </div>
                  )}
                  {page === 1 ? (
                    <div id="he1" onClick={() => moveWrite(path.at(-1))}>
                      <TfiPencil size={25} />
                      <p>질문 작성</p>
                    </div>
                  ) : isLoading ? (
                    <Spinner />
                  ) : (
                    <MakeRoadMap resource={data.data} />
                  )}
                </div>

                {page == 1 ? (
                  <Suspense fallback={<Spinner />}>
                    <QA />
                  </Suspense>
                ) : (
                  <Suspense fallback={<Spinner />}>
                    <RoadMap userID={userID} path={path.at(-1)} />
                  </Suspense>
                )}
              </div>

              <div className="gi-ML">
                {isLoading ? <Spinner /> : <MemberList resource={data.data} />}
                {isLoading ? (
                  <Spinner />
                ) : (
                  <LeaveOrDelete resource={data.data} />
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Notfound />
      )}
      <Footer />
    </>
  );
};

const MakeRoadMap = ({ resource }) => {
  var path = window.location.pathname;
  path = path.split("/");
  const userInfo = useAppSelector((state) => state.loginState);
  const userID = userInfo.id;

  const info = resource;
  const navigate = useNavigate();

  const createRoadmap = (id) => {
    navigate(`/room/createRoadmap/${id}`);
  };

  if (info.leader === userID) {
    return (
      <div id="he1" onClick={() => createRoadmap(path.at(-1))}>
        <PiFolderNotchPlusDuotone size={24} />
        <p>로드맵 추가하기</p>
      </div>
    );
  } else {
    return <></>;
  }
};

const GiHeader = ({ info }) => {
  const navigate = useNavigate();
  return (
    <div className="gi-head">
      {/* <LiaSchoolSolid size={30} /> */}
      <img src="\image\group.png" />
      <div className="headOne">
        <div>
          <h2>{info.name}</h2>
        </div>

        <div>
          <p>현재 튜티 수 : {info.members.length - 1}명</p>
        </div>
      </div>
      <div className="headTwo">
        <p>{info.desc}</p>
        <p
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/mypage/${info.leader}`)}
        >
          튜터 : {info.leader}님
        </p>
      </div>
    </div>
  );
};

const MemberList = ({ resource }) => {
  var path = window.location.pathname;
  path = path.split("/");
  const info = resource;
  const members = info.members;
  members.sort(function (a, b) {
    return b[1] - a[1];
  });
  const leader = info.leader;
  const [modalShow, setModalShow] = useState(false);
  const userInfo = useAppSelector((state) => state.loginState);

  return (
    <div className="member-list">
      <h3>튜티</h3>

      <div className="member-list-header">
        <p> </p>
        <p>ID</p>
        <p>Score</p>
      </div>
      {members.map((e) => {
        return <Member info={e} key={e.id} props={leader} />;
      })}

      {userInfo.id === leader ? (
        <>
          <div className="im-d">
            <FiUserPlus size={18} />
            <p id="invite_mem" onClick={() => setModalShow(true)}>
              튜티 초대
            </p>
          </div>

          <InviteNewMember
            show={modalShow}
            onHide={() => setModalShow(false)}
            group_id={path.at(-1)}
            userInfo={userInfo}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

const InviteNewMember = (props) => {
  const [search, setSearch] = useState("");
  const [userList, setUserList] = useState([]);

  const onSearchHandler = (e) => {
    setSearch(e.target.value);
  };

  const onSubmitHandler = (e) => {
    axiosInstance
      .get(API.USER, {
        params: { keyword: search },
      })
      .then(({ data }) => {
        setUserList([...data.userlist]);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "검색에 실패하였습니다.",
        });
      });
  };

  const onInviteHanlder = (id) => {
    axiosInstance
      .put(
        API.ROOMMEMBER,
        {
          user_id: id,
        },
        {
          headers: {
            Authorization: "Bearer " + props.userInfo.access_token,
          },
          urlParams: {
            room_id: props.group_id,
          },
        }
      )
      .then(() => {
        Swal.fire({
          icon: "success",
          title: `${id}님을 초대하였습니다`,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch(({ response }) => {
        if (response.status == 409) {
          Swal.fire({
            icon: "warning",
            title: `이미 초대된 아이디입니다.`,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: `Server Error.`,
          });
        }
      });
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Invite Member
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="ID or 이름으로 검색"
            onBlur={onSearchHandler}
          />
        </Form.Group>
        {userList.length > 0 ? (
          <>
            <div id="searchResultTop">
              <p>ID</p>
              <p>Name</p>
              <p>Exp</p>
              <p>Lv</p>
            </div>
            {userList.map((e) => {
              return (
                <div className="searchResult">
                  <p>{e.id}</p>
                  <p>{e.name}</p>
                  <p>{e.exp}</p>
                  <p onClick={() => onInviteHanlder(e.id)}>
                    <RiUserAddLine size={20} style={{ marginRight: "5px" }} />
                    초대
                  </p>
                </div>
              );
            })}
          </>
        ) : (
          <></>
        )}
        <div
          className="im-d"
          style={{ marginTop: "15px" }}
          onClick={onSubmitHandler}
        >
          <GoSearch size={20} />
          <p id="search_mem">검색하기</p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const Member = ({ info, props }) => {
  const navigate = useNavigate();

  const GoInfo = (e) => {
    // 누른 멤버의 마이페이지로 이동
    navigate(`/mypage/${e}`);
  };

  return (
    <div
      className="oneMember"
      style={info.user_id === props ? { display: "none" } : {}}
    >
      <p>
        {info.user_id === props ? <TbCrown size={25} color="orange" /> : ""}
      </p>
      <p onClick={() => GoInfo(info.user_id)}>{info.user_id}</p>
      <p>{info.exp}</p>
    </div>
  );
};

const LeaveOrDelete = ({ resource }) => {
  var path = window.location.pathname;
  const info = resource;
  const leader = info.leader;
  path = path.split("/");
  const userInfo = useAppSelector((state) => state.loginState);
  const userID = userInfo.id;

  const navigate = useNavigate();

  const onDeleteHandler = (group_id) => {
    Swal.fire({
      icon: "question",
      title: "정말 스터디룸을 삭제하시겠습니까?",
    }).then((res) => {
      if (res.isConfirmed) {
        axiosInstance // 여기 api 주소만 바꾸면 끝
          .delete(API.ROOM, {
            urlParams: {
              room_id: group_id,
            },
            headers: { Authorization: "Bearer " + userInfo.access_token },
          })
          .then((res) => {
            console.log(res.data.code);
            if (res.data.code) {
              Swal.fire({
                icon: "success",
                title: `스터디룸을 삭제하였습니다`,
              }).then((res) => {
                if (res.isConfirmed) {
                  navigate("/room");
                }
              });
            }
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "스터디룸 삭제에 실패하였습니다.",
            });
          });
      }
    });
  };

  return (
    <>
      {leader === userID ? (
        <div className="explode" onClick={() => onDeleteHandler(path.at(-1))}>
          <p>스터디룸 삭제</p>
          <MdClear size={28} color="red" />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
