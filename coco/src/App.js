// 여기서 path 변경해서 사용 -- minsu
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { Home } from "./components/Home/Home";
import { SignUp } from "./components/Login/SignUp";
import { Login } from "./components/Login/Login";
import { Counter } from "./components/Login/counter";
// import { Goods } from './components/Goods';
// import { About } from './components/About';
// import {Service} from './components/Service';
// import {Personal} from './components/Personal';

function App() {
  return (
      <Router>
        <div className="App">
          <Routes>
            <Route path="/counter" element={<Counter/>}></Route>
            <Route path="/" element={<Home />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/login" element={<Login />}></Route>
            {/* <Route path="/goods" element={<Goods/>}></Route>
          <Route path="/about" element={<About/>}></Route>
          <Route path="/personal" element={<Personal/>}></Route>
          <Route path="/service" element={<Service/>}></Route> */}
          </Routes>
        </div>
      </Router>
  );
}

export default App;
