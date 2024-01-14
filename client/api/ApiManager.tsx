import axios from "axios";

const BACKEND_URL = "https://5727-2a01-9700-10b6-3600-809d-82c0-6918-9ca4.ngrok-free.app";
const ApiManager = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  responseType: "json",
  withCredentials: true,
  validateStatus: (status) => {
    return status >= 200 || status <= 500;
  }
});

export default ApiManager;
