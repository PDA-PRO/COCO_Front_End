import React from "react";
import "./GroupInfo.css";
import { Header } from "../Home/Header";
import { Footer } from "../Home/Footer";
import { Suspense } from "react";
import Spinner from "react-bootstrap/esm/Spinner";
import fetchData from "../../api/fetchTask";
import { Pagination } from "@mui/material";
import { GoSearch } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/store";
import { useEffect, useState } from "react";
import { TbCrown } from "react-icons/tb";
import { TfiPencil } from "react-icons/tfi";
import { ImBooks } from "react-icons/im";
import { FiUserPlus } from "react-icons/fi";
import { RiUserAddLine } from "react-icons/ri";
import { IoChatbubblesOutline } from "react-icons/io5";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { MdClear } from "react-icons/md";
import { PiFolderNotchPlusDuotone } from "react-icons/pi";
import { QA } from "./QA/QA";
import { RoadMap } from "./RoadMap/RoadMap";

const InviteNewMember = (props) => {
  const [search, setSearch] = useState("");
  const [userList, setUserList] = useState([]);

  const onSearchHandler = (e) => {
    setSearch(e.target.value);
  };

  const onSubmitHandler = (e) => {
    console.log(search);
    axios
      .get("http://127.0.0.1:8000/room/search_user/", {
        params: { user_id: search },
      })
      .then((res) => {
        setUserList([...res.data]);
      })
      .catch(() => {
        alert("검색에 실패하였습니다");
      });
  };

  const onInviteHanlder = (id) => {
    console.log(id);
    axios
      .put("http://127.0.0.1:8000/room/member/", {
        room_id: props.group_id,
        user_id: [id],
      })
      .then((res) => {
        console.log(res.data);
        if (res.data === false) {
          alert("이미 초대된 아이디입니다");
        } else if (res.data === true) {
          alert(`${id}님을 초대하였습니다`);
        }
      })
      .catch(() => {
        alert("검색에 실패하였습니다");
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
            onChange={onSearchHandler}
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
                  <p>Lv.{e.level}</p>
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

export const GroupInfo = () => {
  var path = window.location.pathname;
  path = path.split("/");
  const userInfo = useAppSelector((state) => state.loginState);
  const userID = userInfo.id;

  const [page, setPage] = useState(1);

  const moveWorkbook = () => {
    setPage(2);
  };
  const moveBoard = () => {
    setPage(1);
  };

  const navigate = useNavigate();

  const moveWrite = (id) => {
    navigate(`/room/qa/write`, { state: id });
  };

  return (
    <>
      <Header />
      <div className="groupInfo">
        <div className="gi">
          <Suspense fallback={<Spinner />}>
            <GiHeader
              resource={fetchData(`http://127.0.0.1:8000/room/${path.at(-1)}/`)}
            />
          </Suspense>

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
                ) : (
                  <Suspense fallback={<Spinner />}>
                    <MakeRoadMap
                      resource={fetchData(
                        `http://127.0.0.1:8000/room/${path.at(-1)}/`
                      )}
                    />
                  </Suspense>
                )}
              </div>

              {page == 1 ? (
                <Suspense fallback={<Spinner />}>
                  {/* <GroupBoard
                    resource={fetchData(
                      `http://127.0.0.1:8000/room/board/${path.at(-1)}/`
                    )}
                  /> */}
                  <QA />
                </Suspense>
              ) : (
                <Suspense fallback={<Spinner />}>
                  <RoadMap
                    resource={fetchData(
                      `http://127.0.0.1:8000/room/roadmap/${path.at(
                        -1
                      )}?user_id=${userID}`
                    )}
                  />
                </Suspense>
              )}
            </div>

            <div className="gi-ML">
              <Suspense fallback={<Spinner />}>
                <MemberList
                  resource={fetchData(
                    `http://127.0.0.1:8000/room/${path.at(-1)}/`
                  )}
                />
              </Suspense>

              <Suspense fallback={<Spinner />}>
                <LeaveOrDelete
                  resource={fetchData(
                    `http://127.0.0.1:8000/room/${path.at(-1)}/`
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

const MakeRoadMap = ({ resource }) => {
  var path = window.location.pathname;
  path = path.split("/");
  const userInfo = useAppSelector((state) => state.loginState);
  const userID = userInfo.id;

  const info = resource.read();
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

const GiHeader = ({ resource }) => {
  const info = resource.read();
  return (
    <div className="gi-head">
      {/* <LiaSchoolSolid size={30} /> */}
      <img src="\image\group.png" />
      <div className="headOne">
        <div>
          <h2>{info.name}</h2>
        </div>

        <div>
          <p>전체 스터디 랭킹 : 3위</p>
          <p>현재 튜티 수 : {info.members.length - 1}명</p>
        </div>
      </div>
      <div className="headTwo">
        <p>{info.desc}</p>
        <p>튜터 : {info.leader}님</p>
      </div>
    </div>
  );
};

const MemberList = ({ resource }) => {
  var path = window.location.pathname;
  path = path.split("/");
  const info = resource.read();
  const members = info.members;
  members.sort(function (a, b) {
    return b[1] - a[1];
  });
  const maxPage = Math.ceil(members.length / 10);
  const [page, setPage] = useState(1);
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
      {members.slice(10 * (page - 1), 10 * (page - 1) + 10).map((e) => {
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
          />
        </>
      ) : (
        <></>
      )}
    </div>
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
      style={info[0] === props ? { display: "none" } : {}}
    >
      <p>{info[0] === props ? <TbCrown size={25} color="orange" /> : ""}</p>
      <p onClick={() => GoInfo(info[0])}>{info[0]}</p>
      <p>{info[1]}</p>
    </div>
  );
};

const LeaveOrDelete = ({ resource }) => {
  var path = window.location.pathname;
  const info = resource.read();
  const leader = info.leader;
  path = path.split("/");
  const userInfo = useAppSelector((state) => state.loginState);
  const userID = userInfo.id;

  const navigate = useNavigate();

  const onDeleteHandler = (group_id) => {
    let val = window.confirm("정말 스터디룸을 삭제하시겠습니까?");
    if (val === true) {
      axios // 여기 api 주소만 바꾸면 끝
        .post("http://127.0.0.1:8000/group/delete_group/", {
          group_id: group_id,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data === false) {
            alert("이미 삭제된 스터디룸입니다");
          } else if (res.data === true) {
            alert(`스터디룸을 삭제하였습니다`);
            navigate("/group");
          }
        })
        .catch(() => {
          alert("스터디룸 삭제에 실패하였습니다");
        });
    } else {
    }
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
