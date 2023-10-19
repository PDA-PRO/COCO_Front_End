import { checkToken } from "../../app/authentication";
import { useAppSelector } from "../../app/store";
import { useNavigate } from "react-router-dom";
import { Login } from "../../components/Login/Login";
import { useState } from "react";
import { useAppDispatch } from "../../app/store";
import { API } from "api/config";
import axios from "axios";

export const AuthRouter = ({ role, children }) => {
  const userInfo = useAppSelector((state) => state.loginState);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [state, setstate] = useState("pending");

  if (checkToken(userInfo.access_token)) {
    //토큰이 유효하다면
    axios
      .get(API.AUTHROUTER, {
        headers: { Authorization: "Bearer " + userInfo.access_token },
      })
      .then(function (response) {
        if (response.status == 200) {
          if (response.data.role >= role) {
            setstate("pass");
          } else {
            alert("권한부족");
            navigate("/");
            setstate("error");
          }
        }
      })
      .catch((err) => {
        setstate("error");
        dispatch({
          type: "loginSlice/logout",
        });
      });
  } else {
    return <Login />;
  }
  return state == "pending" ? <></> : state == "pass" ? children : <Login />;
};
