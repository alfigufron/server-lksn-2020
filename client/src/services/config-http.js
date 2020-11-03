import axios from "axios";

const http = axios.create({
  baseURL: "http://server.test/api/"
});

export { http };
