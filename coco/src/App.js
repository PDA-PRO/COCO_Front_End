import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { useAppDispatch, useAppSelector } from "./app/store";
import { checkToken } from "./app/authentication";

import { AuthRouter } from "./components/Auth/AuthRouter";
import { Home } from "./components/Home/Home";
import { Login } from "./components/Login/Login";
import { Problems } from "./components/Problems/Problems";
import { PBD } from "./components/ProblemDetail/PBD";
import { Result } from "./components/Result/Result";
import { Board } from "./components/Board/Board";
import { BoardDetail } from "./components/Board/BoardDetail/BoardDetail";
import { WriteGeul } from "./components/Board/WriteGeul/WriteGuel";
import { StatusList } from "./components/StatusList/StatusList";
import { MyPage } from "./components/MyPage/MyPage";
import { Manage } from "./components/Manage/Manage";
import { ModifyBoard } from "./components/MyPage/ModifyBoard";
import { Group } from "./components/Group/Group";
import { MakeGroup } from "./components/Group/MakeGroup";
import { GroupInfo } from "./components/Group/GroupInfo";
import { GroupBoard } from "./components/Group/BoardWrite/GroupBoard";
import { TaskModify } from "./components/Manage/manageComponents/TaskModify";
import { MakeRoadMap } from "./components/Group/RoadMap/MakeRoadMap";
import { ModifyRoadMap } from "./components/Group/RoadMap/ModifyRoadMap";
import { Inside } from "./components/Group/RoadMap/Inside";
import { Tutor } from "components/Group/Tutor/Tutor";
import { Alarm } from "components/Alarm/Alarm";

function App() {
  /* 토큰이 유효하지 않으면 토큰 초기화*/
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.loginState);
  if (!checkToken(userInfo.access_token)) {
    dispatch({
      type: "loginSlice/logout",
    });
  }
  /* --------------------------------------- */
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <AuthRouter role={0}>
                <Home />
              </AuthRouter>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/room"
            element={
              <AuthRouter role={0}>
                <Group />
              </AuthRouter>
            }
          />
          <Route
            path="/room/:id"
            element={
              <AuthRouter role={0}>
                <GroupInfo />
              </AuthRouter>
            }
          />
          <Route
            path="/tutor"
            element={
              <AuthRouter role={0}>
                <Tutor />
              </AuthRouter>
            }
          />
          <Route
            path="/makeroom"
            element={
              <AuthRouter role={0}>
                <MakeGroup />
              </AuthRouter>
            }
          />
          <Route
            path="/problems"
            element={
              <AuthRouter role={0}>
                <Problems />
              </AuthRouter>
            }
          />
          <Route
            path="/problems/:id"
            element={
              <AuthRouter role={0}>
                <PBD />
              </AuthRouter>
            }
          />
          <Route
            path="/result/:id"
            element={
              <AuthRouter role={0}>
                <Result />
              </AuthRouter>
            }
          />
          <Route
            path="/board"
            element={
              <AuthRouter role={0}>
                <Board />
              </AuthRouter>
            }
          />
          <Route
            path="/room/qa/write"
            element={
              <AuthRouter role={0}>
                <GroupBoard />
              </AuthRouter>
            }
          />
          <Route
            path="/room/roadmap/:room_id/:id"
            element={
              <AuthRouter role={0}>
                <Inside />
              </AuthRouter>
            }
          />
          <Route
            path="/room/createRoadmap/:id"
            element={
              <AuthRouter role={0}>
                <MakeRoadMap />
              </AuthRouter>
            }
          />
          <Route
            path="/room/modifyRoadmap/:room_id/:id"
            element={<ModifyRoadMap />}
          />
          <Route
            path="/board/:id"
            element={
              <AuthRouter role={0}>
                <BoardDetail />
              </AuthRouter>
            }
          />
          <Route
            path="/board_modify/:id"
            element={
              <AuthRouter role={0}>
                <ModifyBoard />
              </AuthRouter>
            }
          />
          <Route
            path="/mypage/:id"
            element={
              <AuthRouter role={0}>
                <MyPage />
              </AuthRouter>
            }
          />
          <Route
            path="/alarm"
            element={
              <AuthRouter role={0}>
                <Alarm />
              </AuthRouter>
            }
          />
          <Route
            path="/manage"
            element={
              <AuthRouter role={1}>
                <Manage />
              </AuthRouter>
            }
          />
          <Route path="/manage/modify/:id" element={<TaskModify />} />
          <Route
            path="/write"
            element={
              <AuthRouter role={0}>
                <WriteGeul />
              </AuthRouter>
            }
          />
          <Route
            path="/status"
            element={
              <AuthRouter role={0}>
                <StatusList />
              </AuthRouter>
            }
          />
          <Route path="*" element={<div>없는 페이지입니다.</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
