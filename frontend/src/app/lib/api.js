import axios from "axios";

const API = axios.create({
  baseURL: "backendurl",
  headers: {
    "Content-Type": "application/json",
  },
});

//set toekn if logged in

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

export default API;
