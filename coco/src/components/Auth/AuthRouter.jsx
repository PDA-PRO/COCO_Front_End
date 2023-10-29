import { checkToken } from "../../app/authentication";
import { useAppSelector } from "../../app/store";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/store";
import { API } from "api/config";
import axios from "axios";

export const AuthRouter = ({ role, children }) => {
  const userInfo = useAppSelector((state) => state.loginState);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  if (role >= 1) {
    axios
      .get(API.AUTHROUTER, {
        headers: { Authorization: "Bearer " + userInfo.access_token },
      })
      .then(function (response) {
        if (response.data.role < role) {
          alert("권한부족");
          navigate("/");
        }
      })
      .catch((err) => {
        alert("권한부족");
        dispatch({
          type: "loginSlice/logout",
        });
        navigate("/");
      });
    return children;
  } else {
    if (userInfo.access_token == "") {
      return children;
    } else {
      if (checkToken(userInfo.access_token)) {
        return children;
      } else {
        alert("로그인 유효기간이 만료됐습니다.");
        dispatch({
          type: "loginSlice/logout",
        });
        return children;
      }
    }
  }
};
