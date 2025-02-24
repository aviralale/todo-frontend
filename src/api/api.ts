import axios from "axios";
import { LoginUserData, RegisterUserData } from "../lib/types";

export const API_URL = "http://127.0.0.1:8000/api/";

export const registerUser = async (user: RegisterUserData) => {
  try {
    const response = await axios.post(`${API_URL}auth/users/`, user);
    localStorage.setItem("name", response?.data.name);
    localStorage.setItem("username", response?.data.username);
    localStorage.setItem("email", response?.data.email);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (user: LoginUserData) => {
  try {
    const response = await axios.post(`${API_URL}auth/jwt/create/`, user);
    localStorage.setItem("token", response?.data.access);
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
  } catch (error: any) {
    console.log(error.message || error);
  }
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const isAuthenticated = () => {
  return getToken() !== null;
};

export const getName = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}auth/users/me/`);

    if (response.data) {
      return response.data.username || "Unknown User";
    } else {
      return "Unknown User";
    }
  } catch (error) {
    // Handle API request errors
    console.error("Error fetching user data:", error);
    return "Unknown User";
  }
};
export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${getToken()}`,
  },
});

axiosInstance.interceptors.response.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
