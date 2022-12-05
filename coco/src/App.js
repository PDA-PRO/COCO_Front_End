// 여기서 path 변경해서 사용 -- minsu
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { Home } from "./components/Home/Home";
import { SignUp } from "./components/Login/SignUp";
import { Login } from "./components/Login/Login";
import { Problems } from "./components/Problems/Problems";
import { PBD } from "./components/ProblemDetail/PBD";
import { Result } from "./components/Result/Result";
import { Manage } from "./components/Manage/Manage";
import { Board } from "./components/Board/Board";
import { BoardDetail } from "./components/Board/BoardDetail/BoardDetail";
import { StatusList } from "./components/StatusList/StatusList";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/problems" element={<Problems />} />
          <Route path="/problems/:id" element={<PBD />} />
          <Route path="/result/:id" element={<Result />} />
          <Route path="/board" element={<Board />} />
          <Route path="/board/:id" element={<BoardDetail />} />
          <Route path="/manage" element={<Manage />} />
          <Route path="/status" element={<StatusList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
