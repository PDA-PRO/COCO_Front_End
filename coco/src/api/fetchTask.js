import axios from "axios";
import wrapPromise from "./wrapPromise";

function fetchTask(url) {
    const promise = axios.get(url).then(({data}) => data);
  
    return wrapPromise(promise);
  }
  
  export default fetchTask;