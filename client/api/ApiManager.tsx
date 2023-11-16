import axios from "axios";

const BACKEND_URL = "https://8ef2-2a01-9700-1364-7f00-d169-b7f8-c711-a10d.ngrok-free.app";
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
