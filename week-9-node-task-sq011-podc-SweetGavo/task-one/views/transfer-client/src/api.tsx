import axios, { AxiosError, AxiosResponse } from "axios";

interface BalanceResponse {
  success: boolean;
  balance: string;
  accountNumber: string;
  userId: string;
  currency?: string;
}

interface ErrorResponse {
  success: boolean;
  message: string;
}

const API = axios.create({
  baseURL: "http://localhost:5000/api/balances",
  withCredentials: true,
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor for auth tokens
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
API.interceptors.response.use(
  (response: AxiosResponse<BalanceResponse>) => response,
  (error: AxiosError<ErrorResponse>) => {
    if (error.response) {
      // Server responded with error status (4xx, 5xx)
      console.error("API Error:", error.response.data.message);
      return Promise.reject({
        message: error.response.data.message || "Request failed",
        status: error.response.status,
      });
    } else if (error.request) {
      // Request was made but no response received
      console.error("Network Error:", error.message);
      return Promise.reject({
        message: "Network error. Please check your connection.",
        status: 0,
      });
    } else {
      // Something happened in setting up the request
      console.error("Request Error:", error.message);
      return Promise.reject({
        message: "Request configuration error",
        status: -1,
      });
    }
  },
);

export default API;
