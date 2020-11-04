import axios from "axios";

const http = axios.create({
  baseURL: process.env.VUE_APP_HTTP_SERVER
});

function setToken(token, guard) {
  http.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  localStorage.setItem("access_token", token);
  localStorage.setItem("access_guard", guard);
}

function clearToken() {
  http.defaults.headers.common["Authorization"] = "";
  localStorage.removeItem("access_token");
  localStorage.removeItem("access_guard");
}

export { http, setToken, clearToken };
