import axios from "axios";

const ApiManager = axios.create({
    baseURL: "https://633c-176-57-13-66.ngrok-free.app/api",
    responseType:"json",
    withCredentials:true,
    timeout:3000
})

export default ApiManager