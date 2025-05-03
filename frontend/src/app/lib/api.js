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
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("API Error:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
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
