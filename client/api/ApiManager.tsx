import axios from "axios";

const BACKEND_URL = "https://13d8-176-29-227-114.ngrok-free.app";
const ApiManager = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  responseType: "json",
  withCredentials: true,
  validateStatus: (status) => {
    return status >= 200 || status <= 500;
  },
});

export default ApiManager;
