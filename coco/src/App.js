// // 여기서 path 변경해서 사용 -- minsu
// import "./App.css";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// import { useAppDispatch, useAppSelector } from "./app/store";
// import { checkToken } from "./app/authentication";

// import { AuthRouter } from "./components/Auth/AuthRouter";
// import { Home } from "./components/Home/Home";
// import { Login } from "./components/Login/Login";
// import { Problems } from "./components/Problems/Problems";
// import { PBD } from "./components/ProblemDetail/PBD";
// import { Result } from "./components/Result/Result";
// import { Manage } from "./components/Manage/Manage";
// import { Board } from "./components/Board/Board";
// import { BoardDetail } from "./components/Board/BoardDetail/BoardDetail";
// import { WriteGeul } from "./components/Board/WriteGeul/WriteGuel";
// import { StatusList } from "./components/StatusList/StatusList";

// function App() {
//   const dispatch = useAppDispatch();
//   const userInfo = useAppSelector((state) => state.loginState);
//   if (!checkToken(userInfo.access_token)) {
//     dispatch({
//       type: "loginSlice/logout",
//     });
//   }
//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/problems" element={<Problems />} />
//           <Route path="/problems/:id" element={<PBD />} />
//           <Route
//             path="/result/:id"
//             element={
//               <AuthRouter role={0}>
//                 <Result />
//               </AuthRouter>
//             }
//           />
//           <Route path="/board" element={<Board />} />
//           <Route path="/board/:id" element={<BoardDetail />} />
//           <Route path="/manage" element={<Manage />} />
//           <Route
//             path="/write"
//             element={
//               <AuthRouter role={0}>
//                 <WriteGeul />
//               </AuthRouter>
//             }
//           />
//           <Route path="/status" element={<StatusList />} />
//           <Route path="*" element={<div>없는 페이지입니다.</div>} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

// 여기서 path 변경해서 사용 -- minsu
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
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/room" element={<Group />} />
          <Route path="/room/:id" element={<GroupInfo />} />
          <Route path="/makeroom" element={<MakeGroup />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/problems/:id" element={<PBD />} />
          <Route
            path="/result/:id"
            element={
              <AuthRouter role={0}>
                <Result />
              </AuthRouter>
            }
          />
          <Route path="/board" element={<Board />} />
          <Route path="/room/board/write" element={<GroupBoard />} />
          <Route path="/board/:id" element={<BoardDetail />} />
          <Route path="/board_modify/:id" element={<ModifyBoard />} />
          <Route path="/mypage/:id" element={<MyPage />} />
          <Route path="/manage" element={<Manage />} />
          <Route
            path="/write"
            element={
              <AuthRouter role={0}>
                <WriteGeul />
              </AuthRouter>
            }
          />
          <Route path="/status" element={<StatusList />} />
          <Route path="*" element={<div>없는 페이지입니다.</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
