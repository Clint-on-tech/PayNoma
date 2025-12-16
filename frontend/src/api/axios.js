// src/api/axios.js
import axios from "axios";

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/users/",
});

export const getLocalTokens = () => {
  try {
    const tokens = JSON.parse(localStorage.getItem("tokens"));
    return tokens;
  } catch {
    return null;
  }
};

// Attach token to every request
api.interceptors.request.use((config) => {
  const tokens = getLocalTokens();
  if (tokens?.access) {
    config.headers.Authorization = `Bearer ${tokens.access}`;
  }
  return config;
});
