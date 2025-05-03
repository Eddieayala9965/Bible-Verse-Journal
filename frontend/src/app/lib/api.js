// src/lib/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

API.interceptors.request.use(
  (config) => {
    const cookies = document.cookie.split(";");
    const authCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("auth=")
    );
    if (authCookie) {
      const token = authCookie.split("=")[1];
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("API Error Response:", {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      });
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Request setup error:", error.message);
    }
    return Promise.reject(error);
  }
);

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

export const registerUser = (userData) => API.post("/register", userData);
export const loginUser = (credentials) => API.post("/login", credentials);
export const getCurrentUser = () => API.get("/me");

export const createJournal = (entryData) =>
  API.post("/create_journal", entryData);
export const getAllJournals = () => API.get("/get_all_journal");
export const searchJournals = (query) =>
  API.get(`/search_journal`, { params: { query } });
export const updateJournal = (entryId, updateData) =>
  API.put(`/journal/${entryId}`, updateData);
export const deleteJournal = (entryId) => API.delete(`/journal/${entryId}`);

export default API;
