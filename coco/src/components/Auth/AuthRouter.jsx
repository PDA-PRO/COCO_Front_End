import axios from "axios";
import { checkToken } from "../../app/authentication";
import { useAppSelector } from "../../app/store";
import { useNavigate } from "react-router-dom";
import { Login } from "../../components/Login/Login";
import { useState } from "react";

export const AuthRouter = ({ role, children }) => {
  const userInfo = useAppSelector((state) => state.loginState);
  const navigate = useNavigate();
  const [state, setstate] = useState("pending");
  console.log(children);

  if (checkToken(userInfo.access_token)) {
    //토큰이 유효하다면
    axios
      .get("http://127.0.0.1:8000/auth", {
        headers: { Authorization: "Bearer " + userInfo.access_token },
      })
      .then(function (response) {
        if (response.status == 200) {
          console.log(response.data.role);
          console.log(role);
          if (response.data.role >= role) {
            setstate("pass");
            console.log("된건가");
          } else {
            setstate("error");
          }
        }
      })
      .catch((err) => {
        setstate("error");
        alert("권한부족");
        console.log("안된건가");
      });
    console.log("왜안돼");
  } else {
    return <Login />;
  }
  return state == "pending" ? <></> : state == "pass" ? children : <Login />;
};
