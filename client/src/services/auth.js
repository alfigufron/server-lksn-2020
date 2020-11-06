import { http, setToken, clearToken } from "./config-http";
import jwt_decode from "jwt-decode";

async function AuthLogin(data) {
  try {
    const res = await http.post("auth/login", data);

    const token = res.data.access_token;
    const payload = jwt_decode(token);
    setToken(token, payload.grd);

    const result = {
      status: res.status,
      def_pass: payload.def_pass
    };

    return result;
  } catch (err) {
    if (err.response.status == 401) return 401;
    alert("There is an error");
  }
}

async function Profile() {
  try {
    const res = await http.post("auth/me");

    return res;
  } catch (err) {
    if (err.response.status === 401) {
      clearToken();
      return 401;
    }
    alert("There is an error");
  }
}

async function ResetPassword(data) {
  try {
    const res = await http.post("auth/reset_password", data);

    return res.status;
  } catch (err) {
    let status = err.response.status;

    if (status == 422 || status == 401) return status;
    alert("There is an error");
  }
}

async function AuthLogout() {
  try {
    const res = await http.post("auth/logout");

    clearToken();
    return res.status;
  } catch (err) {
    if (err.response.status === 401) {
      clearToken();
      return 401;
    }
    alert("There is an error");
  }
}

export { AuthLogin, Profile, ResetPassword, AuthLogout };
