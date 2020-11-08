import axios from "axios";
import jwt_decode from "jwt-decode";

const http = axios.create({
  baseURL: process.env.VUE_APP_HTTP_SERVER
});

function setToken(token, guard = null, store = true) {
  http.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  if (store) localStorage.setItem("access_token", token);

  if (guard != null) setGuard(guard);
}

function setGuard(guard) {
  localStorage.setItem("access_guard", guard);
}

function getToken() {
  return localStorage.getItem("access_token");
}

function getGuard() {
  let payload = jwt_decode(getToken());

  return payload.grd;
}

function defaultPassword() {
  let payload = jwt_decode(getToken());

  return payload.def_pass;
}

function clearToken() {
  http.defaults.headers.common["Authorization"] = "";
  localStorage.removeItem("access_token");
  localStorage.removeItem("access_guard");
}

export {
  http,
  setToken,
  setGuard,
  getToken,
  getGuard,
  clearToken,
  defaultPassword
};
