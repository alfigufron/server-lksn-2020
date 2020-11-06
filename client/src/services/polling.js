import { http } from "./config-http";

async function Data() {
  try {
    const res = await http.get("poll");

    return res.data;
  } catch (err) {
    let status = err.response.status;

    if (status == 422 || status == 401) return status;
    alert("There is an error");
  }
}

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

async function Delete(id) {
  try {
    await http.delete(`poll/${id}`);

    return 200;
  } catch (err) {
    let status = err.response.status;

    if (status == 401 && status == 404) return status;
    alert("There is an error");
  }
}

export { Create, Data, Delete };
