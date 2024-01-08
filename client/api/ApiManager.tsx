import axios from "axios";

const BACKEND_URL = "http://sog74y-ip-37-220-118-53.tunnelmole.net";

const ApiManager = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  responseType: "json",
  withCredentials: true,
  validateStatus: (status) => {
    return status >= 200 || status <= 500;
  }
});

export default ApiManager;
