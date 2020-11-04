import { http, setToken, clearToken } from "./config-http";

async function AuthLogin(data) {
  try {
    let res = await http.post("auth/login", data);

    setToken(res.data.access_token);
    return 200;
  } catch (err) {
    if (err.response.status == 401) return 401;
    alert("There is an error");
  }
}

async function Profile() {
  try {
    let res = await http.post("auth/me");

    return res;
  } catch (err) {
    if (err.response.status === 401) {
      clearToken();
      return 401;
    }
    alert("There is an error");
  }
}

async function AuthLogout() {
  try {
    await http.post("auth/logout");

    clearToken();
    return 200;
  } catch (err) {
    if (err.response.status === 401) {
      clearToken();
      return 401;
    }
    console.log(err.response);
  }
}

export { AuthLogin, Profile, AuthLogout };
