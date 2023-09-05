const BASE_URL = "http://127.0.0.1:1000";

export const API = {
  AUTHROUTER: `${BASE_URL}/auth`,
  COMMENTLIKE: `${BASE_URL}/board/comment/likes/`,
  COMMENT: `${BASE_URL}/board/comment/`,
  BOARD: `${BASE_URL}/board/`,
  BAORDLIKE: `${BASE_URL}/board/likes/`,
  IMAGEUPLOAD: `${BASE_URL}/image/upload-temp/`,
  IMAGEDELETE: `${BASE_URL}/image/delete-image/`,
  IMAGEDOWNLOAD: `${BASE_URL}/image/download/`,
  ROOMQUESTION: `${BASE_URL}/room/question/`,
  ROOMANSWER: `${BASE_URL}/room/answer/`,
  ROOM: `${BASE_URL}/room/`,
  ROOMMYROOM: `${BASE_URL}/room/myroom/`,
  ROOMSEARCHUSER: `${BASE_URL}/room/search_user/`,
  ROOMMEMBER: `${BASE_URL}/room/member/`,
  ROOMROADMAP: `${BASE_URL}/room/roadmap/`,
  NOTICE: `${BASE_URL}/manage/notice/`,
  MYSTATUS: `${BASE_URL}/my_status/`,
  LOGIN: `${BASE_URL}/login/`,
  PWUPDATE: `${BASE_URL}/pw/`,
  EMAILUPDATE: `${BASE_URL}/email/`,
  FINDID: `${BASE_URL}/findid/`,
  CHECKID: `${BASE_URL}/checkids/`,
  SIGNUP: `${BASE_URL}/signup/`,
  MANAGEPOST: `${BASE_URL}/manage/post/`,
  MANAGETASK: `${BASE_URL}/manage/tasklist/`,
  MANAGEUSER: `${BASE_URL}/manage/user/`,
  MANAGEMANAGER: `${BASE_URL}/manage/manager/`,
  MANAGEROLE: `${BASE_URL}/manage/role/`,
  TASK: `${BASE_URL}/task/`,
  CATEGORY: `${BASE_URL}/task/category`,
  ONE: `${BASE_URL}/myPageOne/`,
  TWO: `${BASE_URL}/myPageTwo/`,
  THREE: `${BASE_URL}/myPageThree/`,
  MYTASK: `${BASE_URL}/mytask/`,
  SUBMISSION: `${BASE_URL}/submission/`,
  RESULT: `${BASE_URL}/result/`,
  STATUS: `${BASE_URL}/status/`,
  TUTORREQUEST: `${BASE_URL}/room/tutor-request`,
  VIEWTUTORREQUEST: `${BASE_URL}/manage/tutor-request`,
  TUTOR: `${BASE_URL}/manage/tutor`,
};
