import React, { useEffect, useRef } from "react";
import "./MakeGroup.css";
import { Header } from "../Home/Header";
import { Footer } from "../Home/Footer";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { GoSearch } from "react-icons/go";
import { Suspense, useState } from "react";
import { Pagination } from "@mui/material";
import { HiUserPlus, HiUserMinus, HiUserGroup } from "react-icons/hi2";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "api/config";
import Spinner from "react-bootstrap/Spinner";

export const MakeGroup = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(null);
  const seachbar = useRef();
  const navigate = useNavigate();

  const onNameHandler = (e) => {
    setName(e.currentTarget.value);
  };

  const onDescHandler = (e) => {
    setDesc(e.currentTarget.value);
  };

  const onCreateHanlder = (members) => {
    if (name === "" || desc === "") {
      alert("스터디룸명과 스터디룸 설명을 모두 작성해주세요");
    } else {
      axios
        .post(API.ROOM, {
          name: name,
          desc: desc,
          leader: members[0],
          members: members,
        })
        .then((res) => {
          console.log(res);
          alert("스터디룸을 생성하였습니다");
          navigate(`/room/${res.data}`);
        });
    }
  };

  useEffect(() => {
    axios
      .get(API.USER, {
        params: { keyword: query, size: 5, page: page },
      })
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      });
  }, [page, query]);

  return (
    <>
      <Header />
      <div className="mGroup">
        <div className="mGroup-Body">
          <div className="mG-Header">
            <HiUserGroup size={28} color="#553830" />
            <h2>STUDY 개설</h2>
          </div>

          <div className="mG-Body">
            <div className="mG-inputs">
              <div className="Gname">
                <p>스터디룸 명</p>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="ex) CBNU 소프트웨어학과"
                    onChange={onNameHandler}
                  />
                </InputGroup>
              </div>

              <div className="Gname">
                <p>스터디룸 설명</p>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="ex) FE 개발자 그룹 #React #CSS"
                    onChange={onDescHandler}
                  />
                </InputGroup>
              </div>

              <div className="mG-tips">
                <p>- 스터디룸 생성 후, 질문 보드를 이용할 수 있습니다.</p>
                <p>- 튜터는 튜티를 초대 및 강퇴할 권한을 가집니다.</p>
                <p>
                  - 튜터는 자신만의 학습 로드맵을 만들어 튜티를 학습시킬 수
                  있습니다.
                </p>
                <p style={{ whiteSpace: "pre" }}>
                  - STUDY pt 는 튜티들의 점수 합산을 통해 배점되며,
                  <br /> <u00A0 /> <u00A0 /> 이를 통해 스터디 랭킹을 산정합니다.
                </p>
                <p>
                  - 유해한 스터디라 판단되는 경우, 강제로 스터디룸이 삭제될 수
                  있습니다.
                </p>
                <p>
                  - 스터디룸 명과 설명은 반드시 작성해야 스터디룸을 생성할 수
                  있습니다.
                </p>
              </div>
            </div>

            {/* 여기부터 오른쪽 */}
            <div className="mG-right">
              <div className="mG-invite">
                <div className="searchBar">
                  <input
                    ref={seachbar}
                    type="text"
                    placeholder="튜티 검색"
                    id="SV"
                  />
                  <GoSearch
                    size={23}
                    color="brown"
                    id="goSearch"
                    onClick={() => setQuery(seachbar.current.value)}
                  />
                </div>

                <div className="userTop">
                  <p>Lv</p>
                  <p>ID</p>
                  <p>Name</p>
                  <p>pt.</p>
                </div>

                {/* 검색결과
                여기서 멤버추가하고 만들기 버튼 누르면
                MakeGroup에서 api 호출해서 생성 */}
                {loading ? (
                  <Spinner />
                ) : (
                  <SearchResult
                    users={users}
                    create={onCreateHanlder}
                    setPage={setPage}
                    page={page}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

//유저 검색한 결과보여주는 컴포넌트
const SearchResult = (props) => {
  const data = props.users;
  const userInfo = useAppSelector((state) => state.loginState);

  const [members, setMembers] = useState([userInfo]);

  const addMembers = (e) => {
    if (e === userInfo.id || members.includes(e)) {
      alert("이미 초대된 인원입니다.");
    } else {
      alert(`id : ${e.id}님을 스터디에 추가하였습니다.`);
      setMembers([...members, e]);
    }
  };

  const deleteMembers = (e) => {
    if (e === userInfo.id) {
      alert("튜터를 스터디에서 제거할 수 없습니다.");
    } else {
      alert(`id : ${e}님을 스터디에서 제거하였습니다.`);
      setMembers(members.filter((member) => member.id !== e));
    }
  };

  const onCreateHanlder = () => {
    let memberList = [];
    for (let i = 0; i < members.length; i++) {
      memberList.push(members[i].id);
    }
    props.create(memberList);
  };

  useEffect(() => {}, [members]);

  return (
    <>
      {/* 검색 결과 리스트 */}
      {data.userlist.map((e) => {
        return <UserBox info={e} key={e.id} addMembers={addMembers} />;
      })}
      <div className="leftBottom" style={{ marginTop: "20px" }}>
        <Pagination
          count={Math.ceil(data.total / data.size)}
          variant="outlined"
          shape="rounded"
          defaultPage={1}
          page={props.page}
          onChange={(e, value) => props.setPage(value)}
        />
      </div>

      {/* 추가한 멤버 보여줌 */}
      <div className="mG-now">
        <h4>추가된 튜티</h4>

        {members.map((e) => {
          return <NowMems info={e} key={e.id} deleteMembers={deleteMembers} />;
        })}
      </div>

      <Button id="btn-mG" variant="outline-warning" onClick={onCreateHanlder}>
        스터디 생성
      </Button>
    </>
  );
};

const UserBox = (info) => {
  return (
    <div className="userBox">
      <p>Lv.</p>
      <p>{info.info.id}</p>
      <p>{info.info.name}</p>
      <p>{info.info.exp}</p>
      <p onClick={() => info.addMembers(info.info)}>
        <HiUserPlus size={21} color="brown" />
      </p>
    </div>
  );
};

const NowMems = (info) => {
  return (
    <div className="mems">
      <p>Lv.</p>
      <p>{info.info.id}</p>
      <p>{info.info.name}</p>
      <p>{info.info.exp}</p>
      <p onClick={() => info.deleteMembers(info.info.id)}>
        <HiUserMinus size={21} color="brown" />
      </p>
    </div>
  );
};
