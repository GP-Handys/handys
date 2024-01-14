import axios from "axios";

const BACKEND_URL = "https://220e-2a01-9700-10b6-3600-fd28-c63d-555d-b7d2.ngrok-free.app";
const ApiManager = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  responseType: "json",
  withCredentials: true,
  validateStatus: (status) => {
    return status >= 200 || status <= 500;
  }
});

export default ApiManager;
