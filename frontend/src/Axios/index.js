import axios from "axios";

const url = "http://localhost:8080";

export const Axios = axios.create({
  baseURL: url,
});
