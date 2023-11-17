import axios from "axios";

const BACKEND_URL = " https://f037-2a01-9700-1364-7f00-61b7-27a5-796b-a0d.ngrok-free.app";
const ApiManager = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  responseType: "json",
  withCredentials: true,
  timeout: 3000,
  validateStatus: (status) => {
    return status >= 200 || status <= 500;
  },
});

export default ApiManager;
