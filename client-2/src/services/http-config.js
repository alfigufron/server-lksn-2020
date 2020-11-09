import axios from "axios";

const http = axios.create({
  baseURL: "http://server.test/api/"
});

function getStatusCode(data) {
  return data.response.status;
}

export { http, getStatusCode };
