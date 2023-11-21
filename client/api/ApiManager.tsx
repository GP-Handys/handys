import axios from "axios";

const BACKEND_URL = " https://3701-2a01-9700-1364-7f00-c024-8b9c-ce56-a1e6.ngrok-free.app";
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
