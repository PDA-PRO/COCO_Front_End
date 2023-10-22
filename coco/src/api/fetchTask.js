import wrapPromise from "./wrapPromise";
import axios from "axios";

function fetchTask(url, header = null) {
  let promise = null;
  var flag = 0;
  if (header == null) {
    promise = axios.get(url).then(({ data }) => {
      flag = 0;
      return data;
    }).catch((e) => {
      console.log('qewrqwerqw', e.response.status)
      flag = e.response.status;
    })
  } else {
    promise = axios.get(url, header).then(({ data }) => {
      flag = 0;
      return data;
    }).catch((e) => {
      console.log('adfadfadsf', e.response.status)
      flag = e.response.status;
    });
  }
  return wrapPromise(flag, promise);
}

export default fetchTask;
