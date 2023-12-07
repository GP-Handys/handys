import axios from "axios";

const BACKEND_URL = "https://2477-176-57-19-108.ngrok-free.app";
const ApiManager = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  responseType: "json",
  withCredentials: true,
  validateStatus: (status) => {
    return status >= 200 || status <= 500;
  },
});

export default ApiManager;
