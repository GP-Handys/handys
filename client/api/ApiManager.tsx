import axios from "axios";

const BACKEND_URL = "https://22d7-176-57-13-66.ngrok-free.app";
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