import axios from "axios";

const url = "http://localhost:8080/api";

export const Axios = axios.create({
  baseURL: url,
});
