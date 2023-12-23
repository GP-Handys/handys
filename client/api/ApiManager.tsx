import axios from "axios";

const BACKEND_URL = "http://tkj87i-ip-94-249-80-87.tunnelmole.net";
const ApiManager = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  responseType: "json",
  withCredentials: true,
  validateStatus: (status) => {
    return status >= 200 || status <= 500;
  }
});

export default ApiManager;
