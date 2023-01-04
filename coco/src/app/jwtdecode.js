import jwt_decode from "jwt-decode";

function jwtdecode(token) {
  var decoded = jwt_decode(token);
  return decoded;
}

export default jwtdecode;
