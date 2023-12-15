import wrapPromise from "./wrapPromise";
import axiosInstance from "api/axiosWithPathParameter";

function fetchTask(url, header = null) {
  let promise = null;
  var flag = 0;
  if (header == null) {
    promise = axiosInstance
      .get(url)
      .then(({ data }) => {
        flag = 0;
        return data;
      })
      .catch((e) => {
        flag = e.response.status;
      });
  } else {
    promise = axiosInstance
      .get(url, header)
      .then(({ data }) => {
        flag = 0;
        return data;
      })
      .catch((e) => {
        flag = e.response.status;
      });
  }
  return wrapPromise(flag, promise);
}

export default fetchTask;
