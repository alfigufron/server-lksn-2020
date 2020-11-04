import axios from "axios";

const http = axios.create({
  baseURL: process.env.VUE_APP_HTTP_SERVER
});

function setToken(token) {
  http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  localStorage.setItem("access_token", token);
}

function clearToken() {
  http.defaults.headers.common["Authorization"] = "";
  localStorage.removeItem("access_token");
}

export { http, setToken, clearToken };
