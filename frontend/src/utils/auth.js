// src/utils/auth.js
import { api } from "../api/axios";

// Register — backend creates user (doesn't return tokens in your current Django view)
export const registerUser = async (payload) => {
  const resp = await api.post("register/", payload);
  return resp.data; // likely user representation (no tokens)
};

// Login — backend returns { access, refresh, user }
export const loginUser = async ({ email, password }) => {
  const resp = await api.post("login/", { email, password });
  const data = resp.data;

  // save tokens for future API calls
  if (data?.access && data?.refresh) {
    localStorage.setItem(
      "tokens",
      JSON.stringify({ access: data.access, refresh: data.refresh })
    );
  }

  // return the full response object (access, refresh, user)
  return data;
};

// Logout
export const logoutUser = () => {
  localStorage.removeItem("tokens");
};
