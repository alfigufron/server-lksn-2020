import { http } from "./config-http";

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

async function AuthLogout() {
  try {
    await http.post("auth/logout");

    clearToken();
    return 200;
  } catch (err) {
    console.log(err.response);
  }
}

function setToken(token) {
  http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  localStorage.setItem("AuthToken", token);
}

function clearToken() {
  localStorage.removeItem("AuthToken");
  http.defaults.headers.common["Authorization"] = "";
}

export { AuthLogin, AuthLogout };
