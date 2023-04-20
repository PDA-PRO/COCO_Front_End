import React, { useEffect } from "react";
import "./MakeGroup.css";
import { Header } from "../Home/Header";
import { Footer } from "../Home/Footer";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { GoSearch } from "react-icons/go";
import { Suspense, useState } from "react";
import Spinner from "react-bootstrap/esm/Spinner";
import fetchData from "../../api/fetchTask";
import { Pagination } from "@mui/material";
import { HiUserPlus, HiUserMinus, HiUserGroup } from "react-icons/hi2";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { useAppDispatch, useAppSelector } from "../../app/store";

export const MakeGroup = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [users, setUsers] = useState([]);

  const onNameHandler = (e) => {
    setName(e.currentTarget.value);
  };

  const onDescHandler = (e) => {
    setDesc(e.currentTarget.value);
  };

  const onSearchHandler = (info) => {
    axios
      .post("http://127.0.0.1:8000/group/search_user/", {
        info: info,
      })
      .then((res) => {
        setUsers(res.data);
      });
  };

  const onCreateHanlder = (members) => {
    axios
      .post("http://127.0.0.1:8000/group/makegroup/", {
        name: name,
        desc: desc,
        members: members,
      })
      .then((res) => {
        alert("그룹을 생성하였습니다");
      });
  };

  useEffect(() => {}, [name, desc]);

  return (
    <>
      <Header />
      <div className="mGroup">
        <div className="mGroup-Body">
          <div className="mG-Header">
            <HiUserGroup size={28} color="#553830" />
            <h2>그룹 만들기</h2>
          </div>

          <div className="mG-Body">
            <div className="mG-inputs">
              <div className="Gname">
                <p>그룹 명</p>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="ex) CBNU 소프트웨어학과"
                    onChange={onNameHandler}
                  />
                </InputGroup>
              </div>

              <div className="Gname">
                <p>그룹 설명</p>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="ex) FE 개발자 그룹 #React #CSS"
                    onChange={onDescHandler}
                  />
                </InputGroup>
              </div>

              <div className="mG-tips">
                <p>- 그룹 생성 후, 그룹 게시판을 이용할 수 있습니다.</p>
                <p>
                  - 그룹 문제집을 통해 그룹원들과 풀 문제를 선정할 수 있습니다.
                </p>
                <p style={{ whiteSpace: "pre" }}>
                  - 그룹점수는 구성원들의 점수 합산을 통해 배점되며,
                  <br /> <u00A0 /> <u00A0 /> 이를 통해 그룹랭킹을 산정합니다.
                </p>
                <p>
                  - 유해한 그룹이라 판단되는 경우, 강제로 그룹이 삭제될 수
                  있습니다.
                </p>
              </div>
            </div>

            {/* 여기부터 오른쪽 */}
            <div className="mG-right">
              <div className="mG-invite">
                <SearchBar search={onSearchHandler} />

                <div className="userTop">
                  <p>Lv</p>
                  <p>ID</p>
                  <p>Name</p>
                  <p>pt.</p>
                </div>

                {/* 검색결과
                여기서 멤버추가하고 만들기 버튼 누르면
                MakeGroup에서 api 호출해서 생성 */}
                <SearchResult users={users} create={onCreateHanlder} />
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
  const [page, setPage] = useState(1);
  const maxPage = Math.ceil(data.length / 10);

  const addMembers = (e) => {
    if (members.includes(e)) {
      alert("이미 초대된 인원입니다.");
    } else {
      alert(`id : ${e.id}님을 그룹에 추가하였습니다.`);
      setMembers([...members, e]);
    }
  };

  const deleteMembers = (e) => {
    if (e === userInfo.id) {
      alert("그룹장은 그룹에서 제거할 수 없습니다.");
    } else {
      alert(`id : ${e}님을 그룹에서 제거하였습니다.`);
      setMembers(members.filter((member) => member.id !== e));
    }
  };

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
      {data.slice(20 * (page - 1), 20 * (page - 1) + 20).map((e) => {
        return <UserBox info={e} key={e.id} addMembers={addMembers} />;
      })}
      <div className="leftBottom" style={{ marginTop: "20px" }}>
        <Pagination
          count={maxPage}
          variant="outlined"
          shape="rounded"
          defaultPage={1}
          onChange={(e) => handlePage(e)}
        />
      </div>

      {/* 추가한 멤버 보여줌 */}
      <div className="mG-now">
        <h4>추가된 그룹원</h4>

        {members.map((e) => {
          return <NowMems info={e} key={e.id} deleteMembers={deleteMembers} />;
        })}
      </div>

      <Button id="btn-mG" variant="outline-warning" onClick={onCreateHanlder}>
        그룹 생성
      </Button>
    </>
  );
};

const SearchBar = ({ search }) => {
  const onSearchHandler = (e) => {
    var info = document.getElementById("SV").value;
    search(info);
  };

  return (
    <div className="searchBar">
      <input type="text" placeholder="유저 검색" id="SV" />
      <GoSearch
        size={23}
        color="brown"
        id="goSearch"
        onClick={() => onSearchHandler()}
      />
    </div>
  );
};

const UserBox = (info) => {
  return (
    <div className="userBox">
      <p>Lv.{info.info.level}</p>
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
      <p>Lv.{info.info.level}</p>
      <p>{info.info.id}</p>
      <p>{info.info.name}</p>
      <p>{info.info.exp}</p>
      <p onClick={() => info.deleteMembers(info.info.id)}>
        <HiUserMinus size={21} color="brown" />
      </p>
    </div>
  );
};
