import axios from "axios";


const BACKEND_URL = "https://8088-2a01-9700-1008-c900-1df-c3f6-80ef-2f4b.ngrok-free.app";

const ApiManager = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  responseType: "json",
  withCredentials: true,
  validateStatus: (status) => {
    return status >= 200 || status <= 500;
  }
});

export default ApiManager;
