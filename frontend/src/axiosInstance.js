import axios from "axios";

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: "https://blood-ofxk.onrender.com/api", // Replace with your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("login_token"); // Get token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
