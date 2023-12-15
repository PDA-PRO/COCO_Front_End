import axios from "axios";
import { API } from "api/config";
//create your instance
const axiosInstance = axios.create({
  baseUrl: API.BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  if (!config.url) {
    return config;
  }
  const currentUrl = new URL(config.url, config.baseURL);
  // parse pathName to implement variables
  Object.entries(config.urlParams || {}).forEach(([k, v]) => {
    currentUrl.pathname = currentUrl.pathname.replace(
      `:${k}`,
      encodeURIComponent(v)
    );
  });
  let lastPathPara = currentUrl.pathname.lastIndexOf(":");
  if (lastPathPara > -1) {
    currentUrl.pathname = currentUrl.pathname.slice(0, lastPathPara - 1);
  }

  const authPart =
    currentUrl.username && currentUrl.password
      ? `${currentUrl.username}:${currentUrl.password}`
      : "";
  return {
    ...config,
    baseURL: `${currentUrl.protocol}//${authPart}${currentUrl.host}`,
    url: currentUrl.pathname,
  };
});

export default axiosInstance;
