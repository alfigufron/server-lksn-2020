import { http, setToken, clearToken } from "./config-http";

async function AuthLogin(data) {
  try {
    const res = await http.post("auth/login", data);

    setToken(res.data.access_token);
    return res.status;
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
    if (err.response.status === 422) return 422;
    if (err.response.status === 401) return 401;
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
    console.log(err.response);
  }
}

export { AuthLogin, Profile, ResetPassword, AuthLogout };
