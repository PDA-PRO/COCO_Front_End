const BASE_URL = "http://localhost:8000";

export const API = {
  BASE_URL: BASE_URL,

  //유저 관련 api
  USER: `${BASE_URL}/user`,
  PERMISSION: `${BASE_URL}/user/permission`,
  FINDID: `${BASE_URL}/user/findid`,
  CHECKID: `${BASE_URL}/user/checkid`,
  UPDATEPW: `${BASE_URL}/user/pw`,
  ALARM: `${BASE_URL}/user/alarm`,
  LEVEL: `${BASE_URL}/user/level`,

  //인증 관련 api
  AUTHROUTER: `${BASE_URL}/auth`,
  LOGIN: `${BASE_URL}/auth/login`,
  SIGNUP: `${BASE_URL}/auth/signup`,

  //게시판 관련 api
  BOARD: `${BASE_URL}/boards/:board_id`,
  BOARDPATH: `${BASE_URL}/boards/:board_id`,
  BAORDLIKE: `${BASE_URL}/boards/:board_id/likes`,
  COMMENT: `${BASE_URL}/boards/:board_id/comments/:comment_id`,
  COMMENTLIKE: `${BASE_URL}/boards/:board_id/comments/:comment_id/likes`,
  IMAGE: `${BASE_URL}/image`,

  //studyroom 관련 api
  ROOM: `${BASE_URL}/rooms/:room_id`,
  ROOMQUESTION: `${BASE_URL}/rooms/:room_id/questions`,
  ROOMANSWER: `${BASE_URL}/rooms/:room_id/answer`,
  SELECTANSWER: `${BASE_URL}/rooms/:room_id/select-answer`,
  ROOMMYROOM: `${BASE_URL}/rooms/myroom`,
  ROOMMEMBER: `${BASE_URL}/rooms/:room_id/member`,
  ROOMROADMAP: `${BASE_URL}/rooms/:room_id/roadmaps/:roadmap_id`,

  //문제 풀이 관련 api
  TASK: `${BASE_URL}/tasks/:task_id`,
  CATEGORY: `${BASE_URL}/tasks/category`,
  SUBMISSION: `${BASE_URL}/submission`,
  STATUS: `${BASE_URL}/status`,
  RESULT: `${BASE_URL}/result`,

  //플러그인 관련 api
  PLUGINSTATUS: `${BASE_URL}/plugin/status`,
  LINT: `${BASE_URL}/lint`,
  WPC: `${BASE_URL}/wpc/main`,

  //그 외
  NOTICE: `${BASE_URL}/notice`,
  MYSTATUS: `${BASE_URL}/my_status/:user_id`,
  HOT: `${BASE_URL}/hot`,
  MYTASK: `${BASE_URL}/mytask`,
  MYPAGE: `${BASE_URL}/mypage/:user_id`,
  REQUESTTUTOR: `${BASE_URL}/request-tutor`,
};
