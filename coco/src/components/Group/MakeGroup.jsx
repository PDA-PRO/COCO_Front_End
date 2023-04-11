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

export const MakeGroup = () => {
  return (
    <>
      <Header />
      <div className="mGroup">
        <div className="mGroup-Body">
          <div className="mG-Header">
            <h2>그룹 만들기</h2>
          </div>

          <div className="mG-Body">
            <div className="mG-inputs">
              <div className="Gname">
                <p>그룹 명</p>
                <InputGroup className="mb-3">
                  <Form.Control placeholder="Group-Name" />
                </InputGroup>
              </div>

              <div className="Gname">
                <p>그룹 설명</p>
                <InputGroup className="mb-3">
                  <Form.Control placeholder="FE 개발자 그룹 #React #CSS" />
                </InputGroup>
              </div>

              <div className="mG-invite">
                <SearchBar />

                <div className="userTop">
                  <p>Lv</p>
                  <p>ID</p>
                  <p>Name</p>
                  <p>pt.</p>
                </div>

                <Suspense fallback={<Spinner />}>
                  <GetUsers
                    resource={fetchData(
                      `http://127.0.0.1:8000/group/all_groups`
                    )}
                    op={1}
                  />
                </Suspense>
              </div>
            </div>

            {/* 여기부터 오른쪽 */}
            <div className="mG-right">
              <div className="nowMembers">
                <div className="mG-rTop">
                  <HiUserGroup size={23} color="brown" />
                  <h2>그룹 멤버</h2>
                </div>

                <Suspense fallback={<Spinner />}>
                  <GetUsers
                    resource={fetchData(
                      `http://127.0.0.1:8000/group/all_groups`
                    )}
                    op={2}
                  />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

const SearchBar = ({ search }) => {
  const onSearchHandler = (e) => {
    var info = document.getElementById("SV").value;
    search(info);
    console.log(info);
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

const GetUsers = ({ resource, op }) => {
  const GroupList = resource.read();
  const maxPage = Math.ceil(GroupList.length / 10);
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

  var [members, setMembers] = useState([]);
  const addMembers = (e) => {
    if (members.includes(e)) {
      alert("이미 초대된 인원입니다.");
    } else {
      alert(`id : ${e}님을 그룹에 추가하였습니다.`);
      setMembers((members) => [...members, e]);
    }

    // api 연결해서 추가될 때마다 api 호출해서 인원 넣는 식으로 ㄱㄱ
  };

  const deleteMembers = (e) => {
    let arr = members;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === e) {
        arr.splice(i, 1);
      }
    }

    alert(`id : ${e}님을 그룹에서 제거하였습니다.`);
    setMembers(arr);

    // api 연결해서 추가될 때마다 api 호출해서 인원 넣는 식으로 ㄱㄱ
  };

  useEffect(() => {}, [members]);

  if (op === 1) {
    return (
      <>
        {GroupList.slice(20 * (page - 1), 20 * (page - 1) + 20).map((e) => {
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
      </>
    );
  } else {
    return (
      <>
        {members.map((e) => {
          console.log(e);
          return <NowMems info={e} key={e.id} deleteMembers={deleteMembers} />;
        })}
      </>
    );
  }
};

const UserBox = (info) => {
  return (
    <div className="userBox">
      <p>Lv.1</p>
      <p>{info.info.id}</p>
      <p>조민수</p>
      <p>150</p>
      <p onClick={() => info.addMembers(info.info.id)}>
        <HiUserPlus size={21} color="brown" />
      </p>
    </div>
  );
};

const NowMems = (info) => {
  console.log(info.length);

  return (
    <div className="mems">
      <p>Lv.1</p>
      <p>{info.info.id}</p>
      <p>조민수</p>
      <p>150</p>
      <p onClick={() => info.deleteMembers(info.info.id)}>
        <HiUserMinus size={21} color="brown" />
      </p>
    </div>
  );
};
