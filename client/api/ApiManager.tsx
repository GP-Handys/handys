import axios from "axios";

const BACKEND_URL = "https://82e7-109-107-242-168.ngrok-free.app";
const ApiManager = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  responseType: "json",
  withCredentials: true,
  validateStatus: (status) => {
    return status >= 200 || status <= 500;
  }
});

export default ApiManager;
