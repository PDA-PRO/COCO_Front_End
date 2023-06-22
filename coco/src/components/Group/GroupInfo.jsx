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
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import {
  BsFillEyeFill,
  BsChatSquareTextFill,
  BsHeartFill,
  BsFillLightbulbFill,
  BsMegaphoneFill,
  BsQuestionLg,
} from "react-icons/bs";
import { useEffect, useState } from "react";
import { TbCrown } from "react-icons/tb";
import { TfiPencil } from "react-icons/tfi";
import { ImBooks } from "react-icons/im";
import { FiUserPlus } from "react-icons/fi";
import { RiUserAddLine } from "react-icons/ri";
import { IoChatbubblesOutline } from "react-icons/io5";
import {
  TiBatteryCharge,
  TiBatteryLow,
  TiBatteryMid,
  TiBatteryHigh,
  TiBatteryFull,
} from "react-icons/ti";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { GiExitDoor } from "react-icons/gi";
import { MdClear } from "react-icons/md";
import { BsTrash } from "react-icons/bs";

const InviteNewMember = (props) => {
  const [search, setSearch] = useState("");
  const [userList, setUserList] = useState([]);

  const onSearchHandler = (e) => {
    setSearch(e.target.value);
  };

  const onSubmitHandler = (e) => {
    console.log(search);
    axios
      .post("http://127.0.0.1:8000/group/search_user/", {
        user_id: search,
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
      .post("http://127.0.0.1:8000/group/invite_member/", {
        group_id: props.group_id,
        user_id: id,
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
    navigate(`/group/board/write`, { state: id });
  };

  return (
    <>
      <Header />
      <div className="groupInfo">
        <div className="gi">
          <Suspense fallback={<Spinner />}>
            <GiHeader
              resource={fetchData(
                `http://127.0.0.1:8000/group/${path.at(-1)}/`
              )}
            />
          </Suspense>

          <div id="gi-B">
            <div className="gi-GB">
              <div className="gb-header">
                {page === 1 ? (
                  <div id="he1" onClick={() => moveWorkbook()}>
                    <ImBooks size={25} color="green" />
                    <p>그룹 문제집열기</p>
                  </div>
                ) : (
                  <div id="he1" onClick={() => moveBoard()}>
                    <IoChatbubblesOutline size={25} color="green" />
                    <p>그룹 게시판 열기</p>
                  </div>
                )}
                {page === 1 ? (
                  <div id="he1" onClick={() => moveWrite(path.at(-1))}>
                    <TfiPencil size={25} />
                    <p>글쓰기</p>
                  </div>
                ) : (
                  <p></p>
                )}
              </div>

              {page == 1 ? (
                <Suspense fallback={<Spinner />}>
                  <GroupBoard
                    resource={fetchData(
                      `http://127.0.0.1:8000/group/board/${path.at(-1)}/`
                    )}
                  />
                </Suspense>
              ) : (
                <Suspense fallback={<Spinner />}>
                  <GroupTasks
                    resource={fetchData(
                      `http://127.0.0.1:8000/group/group_workbooks/${path.at(
                        -1
                      )}/`
                    )}
                  />
                </Suspense>
              )}
            </div>

            <div className="gi-ML">
              <Suspense fallback={<Spinner />}>
                <MemberList
                  resource={fetchData(
                    `http://127.0.0.1:8000/group/${path.at(-1)}/`
                  )}
                />
              </Suspense>

              <Suspense fallback={<Spinner />}>
                <Apply
                  resource={fetchData(
                    `http://127.0.0.1:8000/group/group_apply/${path.at(-1)}/`
                  )}
                  userID={userID}
                />
              </Suspense>

              <Suspense fallback={<Spinner />}>
                <LeaveOrDelete
                  resource={fetchData(
                    `http://127.0.0.1:8000/group/${path.at(-1)}/`
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

const GiHeader = ({ resource }) => {
  const info = resource.read();
  return (
    <div className="gi-head">
      <img src="\image\group.png" />
      <div className="headOne">
        <div>
          <h2>{info.name}</h2>
        </div>

        <div>
          <p>전체 그룹 랭킹 : 3위</p>
          <p>현재 그룹원 수 : {info.members.length}명</p>
        </div>
      </div>
      <div className="headTwo">
        <p>{info.desc}</p>
        <p>그룹 장 : {info.leader}님</p>
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
      <h3>Group Members</h3>

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
              멤버 초대
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
    navigate(`/group/${e}`);
  };

  return (
    <div className="oneMember">
      <p>{info[0] === props ? <TbCrown size={25} color="orange" /> : ""}</p>
      <p>{info[0]}</p>
      <p>{info[1]}</p>
    </div>
  );
};

const Apply = ({ resource, userID }) => {
  const info = resource.read();
  const leader = info.leader;
  const apply = info.apply;

  const onAcceptHandler = (user_id, group_id) => {
    console.log(user_id, group_id);
    axios
      .post("http://127.0.0.1:8000/group/invite_member/", {
        group_id: group_id,
        user_id: user_id,
        apply: true,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data === false) {
          alert("이미 초대된 아이디입니다");
        } else if (res.data === true) {
          alert(`${user_id}님을 초대하였습니다`);
        }
      })
      .catch(() => {
        alert("초대에 실패하였습니다");
      });
  };

  const onRejectHandler = (user_id, group_id) => {
    axios
      .post("http://127.0.0.1:8000/group/reject_apply/", {
        group_id: group_id,
        user_id: user_id,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data === false) {
          alert("이미 초대된 아이디입니다");
        } else if (res.data === true) {
          alert(`${user_id}님의 초대를 거절하였습니다`);
        }
      })
      .catch(() => {
        alert("초대 거절에 실패하였습니다");
      });
  };

  return (
    <>
      {userID === leader ? (
        <div className="apply">
          <h5>가입 처리</h5>
          <div className="usersTop">
            <p>ID</p>
            <p>Name</p>
            <p>Exp</p>
            <p>Lv</p>
          </div>
          {apply.map((e) => {
            return (
              <>
                <div className="users">
                  <p>{e.user_id}</p>
                  <p>{e.name}</p>
                  <p>{e.exp}</p>
                  <p>{e.level}</p>
                  <p>{e.message}</p>
                  <div className="check">
                    <p>
                      <AiOutlineCheck
                        size={25}
                        color="green"
                        onClick={() => onAcceptHandler(e.user_id, e.group_id)}
                      />
                    </p>
                    <p>
                      <AiOutlineClose
                        size={25}
                        color="red"
                        onClick={() => onRejectHandler(e.user_id, e.group_id)}
                      />
                    </p>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

const GroupBoard = ({ resource }) => {
  const info = resource.read();

  return (
    <div className="gb-body">
      {info.map((e) => {
        return <GroupPost props={e} key={e.id} />;
      })}
    </div>
  );
};

const GroupPost = ({ props }) => {
  const navigate = useNavigate();
  const moveDetail = (e) => {
    navigate(`/board/${e}`);
  };
  const [category, setCategory] = useState("");
  const [bgColor, setBgColor] = useState("white");
  const [cateIcon, setCateIcon] = useState();
  const [date, setDate] = useState("");

  useEffect(() => {
    const chCate = (e) => {
      if (e === 1) {
        setCategory("Notice");
        setBgColor("rgb(231, 255, 211)");
        setCateIcon(<BsMegaphoneFill size={25} color="#00ff00" />);
      } else if (e === 2) {
        setCategory("Help");
        setBgColor("rgb(255, 248, 211)");
        setCateIcon(<BsQuestionLg size={25} color="rgb(255, 200, 101)" />);
      } else if (e === 3) {
        setCategory("자유");
        setBgColor("rgb(237, 251, 255)");
        setCateIcon(
          <BsFillLightbulbFill size={25} color="rgb(111, 101, 255)" />
        );
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

    chCate(props.category);
    var originTime = props.time;
    setDate(timeForToday(originTime));
  }, []);

  return (
    <div
      className="gPost"
      style={{ backgroundColor: bgColor }}
      onClick={() => {
        moveDetail(props.id);
      }}
    >
      <div className="gPostInner">
        <div className="un">
          <p>{category}</p>
          {cateIcon}
        </div>

        <div className="gPostTitle">
          <h2>{props.title}</h2>
        </div>

        <div className="un">
          <h4>{props.user_id}</h4>
          <h4>{date}</h4>
        </div>

        <div className="un">
          <div className="un2">
            <BsFillEyeFill color="rgb(112, 112, 112)" />
            <p>{props.views}</p>
            <BsChatSquareTextFill
              color="rgb(112, 112, 112)"
              style={{ marginLeft: "10px" }}
            />
            <p>{props.comments}</p>
          </div>
          <div className="un2">
            <BsHeartFill color="gray" />
            <p>{props.likes}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const GroupTasks = ({ resource }) => {
  const info = resource.read();
  const maxPage = Math.ceil(info.length / 10);
  const [page, setPage] = useState(1);

  const handlePage = (event) => {
    if (
      event.target.innerHTML ===
      '<path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>'
    ) {
      setPage(page - 1);
    } else if (
      event.target.innerHTML ===
      '<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>'
    ) {
      setPage(page + 1);
    } else {
      setPage(parseInt(event.target.outerText));
    }
  };

  return (
    <div className="group-tasks">
      <div className="task-top">
        <p>No</p>
        <p>문제 제목</p>
        <p>난이도</p>
        <p>정답률</p>
        <p>언어</p>
      </div>

      {info.slice(20 * (page - 1), 20 * (page - 1) + 20).map((e) => {
        return <GroupTask props={e} key={e.id} />;
      })}

      <div className="leftBottom">
        <Pagination
          count={maxPage}
          variant="outlined"
          shape="rounded"
          defaultPage={1}
          onChange={(e) => handlePage(e)}
        />
      </div>
    </div>
  );
};

const GroupTask = ({ props }) => {
  console.log(props)
  const navigate = useNavigate();
  const goDetail = (e) => {
    navigate(`/problems/${e}`);
  };

  const setLevel = (e) => {
    switch (e) {
      case 1:
        return <TiBatteryLow size={35} color="rgb(98, 148, 255)" />;
      case 2:
        return <TiBatteryMid size={35} color="#9DD84B" />;
      case 3:
        return <TiBatteryHigh size={35} color="#ff7e00" />;
      case 4:
        return <TiBatteryFull size={35} color="red" />;
      case 5:
        return <TiBatteryCharge size={35} color="#7d1b7e" />;
    }
  };

  const lan = (e1, e2) => {
    if (e1 === 1 && e2 === 1) {
      return (
        <div>
          <img src="/image/lan_c.png" height="30px" alt="" />
          <img
            src="/image/python.png"
            height="30px"
            style={{ paddingRight: "10px" }}
            alt=""
          />
        </div>
      );
    } else if (e1 === 1 && e2 === 0) {
      return (
        <div>
          <img src="/image/lan_c.png" height="30px" alt="" />
        </div>
      );
    } else if (e1 === 0 && e2 === 1) {
      return (
        <div>
          <img src="/image/python.png" height="30px" alt="" />
        </div>
      );
    }
  };

  const deleteTask = (e) => {
    const del = window.confirm(`${e}번 문제를 문제집에서 삭제하시겠습니까?`);
    if(del === true){
      axios
      .post("http://127.0.0.1:8000/group/delete_problem", {
        group_id: props.group_id,
        task_id: e,
      })
      .then((res) => {
        if(res.data === true){
          alert(`${e}번 문제를 문제집에서 삭제하였습니다`);
          navigate(`/group/${props.group_id}`);
        }
        else{
          alert(`문제 삭제에 실패하였습니다`);
        }
      })
      .catch(() => {
        alert(`${e}번 문제를 그룹 문제집에서 삭제하였습니다`);
      });
    }
  };

  return (
    <div className="groupProblem">
      <h4 onClick={() => goDetail(props.id)}>No.{props.id}</h4>
      <h4 onClick={() => goDetail(props.id)}>{props.title}</h4>
      <h4 onClick={() => goDetail(props.id)}>{setLevel(props.diff)}</h4>
      <h4
        onClick={() => goDetail(props.id)}
        style={{
          color:
            props.rate == 0
              ? "gray"
              : props.rate >= 40
              ? "skyblue"
              : "rgb(218, 55, 55)",
        }}
      >
        {props.rate}%
      </h4>

      <h4 onClick={() => goDetail(props.id)}>
        {lan(props.lan_c, props.lan_py)}
      </h4>
      <p style={{ margin: "0", textAlign: "center" }}>
        <BsTrash onClick={() => deleteTask(props.id)} size={19} color="red" />
      </p>
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

  const onLeaveHandler = (group_id, user_id) => {
    let val = window.confirm("정말 그룹을 탈퇴하시겠습니까?");
    if (val === true) {
      axios
        .post("http://127.0.0.1:8000/group/leave_group/", {
          group_id: group_id,
          user_id: user_id,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data === false) {
            alert("이미 탈퇴처리된 그룹입니다");
          } else if (res.data === true) {
            alert(`그룹을 탈퇴하였습니다`);
            navigate("/group");
          }
        })
        .catch(() => {
          alert("그룹 탈퇴에 실패하였습니다");
        });
    } else {
    }
  };

  const onDeleteHandler = (group_id) => {
    let val = window.confirm("정말 그룹을 삭제하시겠습니까?");
    if (val === true) {
      axios // 여기 api 주소만 바꾸면 끝
        .post("http://127.0.0.1:8000/group/delete_group/", {
          group_id: group_id,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data === false) {
            alert("이미 삭제된 그룹입니다");
          } else if (res.data === true) {
            alert(`그룹을 삭제하였습니다`);
            navigate("/group");
          }
        })
        .catch(() => {
          alert("그룹 삭제에 실패하였습니다");
        });
    } else {
    }
  };

  return (
    <>
      {leader === userID ? (
        <div className="explode" onClick={() => onDeleteHandler(path.at(-1))}>
          <p>그룹 삭제</p>
          <MdClear size={28} color="red" />
        </div>
      ) : (
        <div
          className="exit"
          onClick={() => onLeaveHandler(path.at(-1), userID)}
        >
          <p>그룹 탈퇴</p>
          <GiExitDoor size={26} color="lightgreen" />
        </div>
      )}
    </>
  );
};
