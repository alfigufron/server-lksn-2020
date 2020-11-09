import axios from "axios";
import NProgress from "nprogress";

const http = axios.create({
  baseURL: "http://server.test/api/"
});

http.interceptors.request.use(
  config => {
    NProgress.start();
    return config;
  },
  err => {
    NProgress.done();
    return Promise.reject(err);
  }
);

http.interceptors.response.use(
  res => {
    NProgress.done();
    return res;
  },
  err => {
    NProgress.done();
    return Promise.reject(err);
  }
);

function getStatusCode(data) {
  return data.response.status;
}

function setToken(token) {
  http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export { http, getStatusCode, setToken };
