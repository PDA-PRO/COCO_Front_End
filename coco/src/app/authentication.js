import jwt_decode from "jwt-decode";

export const checkToken = (token) => {
  try {
    let exp = jwt_decode(token).exp * 1000;
    let nowdate = new Date();

    if (exp > nowdate.getTime()) {
      return true; //유효한 토큰
    } else {
      return false; //유효하지 않은 토큰
    }
  } catch (err) {
    return false; //유효하지 않은 토큰
  }
};
