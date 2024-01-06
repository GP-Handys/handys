import axios from "axios";

const BACKEND_URL = "http://c6jnjl-ip-176-57-17-156.tunnelmole.net";
const ApiManager = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  responseType: "json",
  withCredentials: true,
  validateStatus: (status) => {
    return status >= 200 || status <= 500;
  }
});

export default ApiManager;
