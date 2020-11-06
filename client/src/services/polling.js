import { http } from "./config-http";

async function Create(data) {
  try {
    await http.post("poll", data);

    return 200;
  } catch (err) {
    let status = err.response.status;

    if (status == 422 || status == 401) return status;
    alert("There is an error");
  }
}

export { Create };
