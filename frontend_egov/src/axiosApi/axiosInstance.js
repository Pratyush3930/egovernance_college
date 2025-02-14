import axios from "axios";

const axiosApi = axios.create({
  baseURL: "http://localhost:5288/api",
  withCredentials: true, // ✅ Allow sending session cookies
});

export default axiosApi;
