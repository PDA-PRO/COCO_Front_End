const BASE_URL = "http://localhost:1000";

export const API = {
  USER: `${BASE_URL}/user/`,
  PERMISSION: `${BASE_URL}/user/permission`,
  FINDID: `${BASE_URL}/user/findid/`,
  CHECKID: `${BASE_URL}/user/checkid/`,
  AUTHROUTER: `${BASE_URL}/auth`,
  LOGIN: `${BASE_URL}/auth/login/`,
  SIGNUP: `${BASE_URL}/auth/signup/`,
  BOARD: `${BASE_URL}/board/`,
  BAORDLIKE: `${BASE_URL}/board/likes/`,
  COMMENT: `${BASE_URL}/board/comment/`,
  COMMENTLIKE: `${BASE_URL}/board/comment/likes/`,
  IMAGEUPLOAD: `${BASE_URL}/image/upload-temp/`,
  IMAGEDELETE: `${BASE_URL}/image/delete-image/`,
  IMAGEDOWNLOAD: `${BASE_URL}/image/download/`,
  ROOM: `${BASE_URL}/room/`,
  ROOMQUESTION: `${BASE_URL}/room/question/`,
  ROOMANSWER: `${BASE_URL}/room/answer/`,
  SELECTANSWER: `${BASE_URL}/room/select-answer`,
  ROOMMYROOM: `${BASE_URL}/room/myroom/`,
  ROOMMEMBER: `${BASE_URL}/room/member/`,
  ROOMROADMAP: `${BASE_URL}/room/roadmap/`,
  NOTICE: `${BASE_URL}/notice/`,
  MYSTATUS: `${BASE_URL}/my_status/`,
  TASK: `${BASE_URL}/task/`,
  CATEGORY: `${BASE_URL}/task/category`,
  ONE: `${BASE_URL}/myPageOne/`,
  TWO: `${BASE_URL}/myPageTwo/`,
  THREE: `${BASE_URL}/myPageThree/`,
  MYTASK: `${BASE_URL}/mytask/`,
  SUBMISSION: `${BASE_URL}/submission/`,
  RESULT: `${BASE_URL}/result/`,
  STATUS: `${BASE_URL}/status/`,
  REQUESTTUTOR: `${BASE_URL}/request-tutor`,
  SELECTANSWER: `${BASE_URL}/room/select-answer`,
  LINT: `${BASE_URL}/lint`,
  ALARM: `${BASE_URL}/user/alarm`,
};
