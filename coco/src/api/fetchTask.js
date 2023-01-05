import axios from "axios";
import wrapPromise from "./wrapPromise";

function fetchTask(url, header = null) {
  const promise = null;
  if (header == null) {
    promise = axios.get(url).then(({ data }) => data);
  } else {
    promise = axios.get(url, header).then(({ data }) => data);
  }

  return wrapPromise(promise);
}

export default fetchTask;
