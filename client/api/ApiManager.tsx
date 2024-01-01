import axios from "axios";

const BACKEND_URL = "http://uqf1ys-ip-46-185-169-29.tunnelmole.net";

const ApiManager = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  responseType: "json",
  withCredentials: true,
  validateStatus: (status) => {
    return status >= 200 || status <= 500;
  }
});

export default ApiManager;
