import axios from "axios";

const BACKEND_URL = "http://jqk0dp-ip-176-29-149-1.tunnelmole.net";
const ApiManager = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  responseType: "json",
  withCredentials: true,
  validateStatus: (status) => {
    return status >= 200 || status <= 500;
  }
});

export default ApiManager;
