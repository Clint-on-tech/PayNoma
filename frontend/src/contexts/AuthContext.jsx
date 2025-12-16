// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { loginUser } from "../utils/auth";
import { api, getLocalTokens } from "../api/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ---------------------------
  // HYDRATE USER ON PAGE LOAD
  // ---------------------------
  useEffect(() => {
  const hydrateUser = async () => {
    try {
      const tokens = getLocalTokens();

      if (!tokens?.access) {
        setLoading(false);
        return;
      }

      const resp = await api.get("profile/");
      setUser(resp.data);

    } catch (err) {
      console.error("AUTH HYDRATE ERROR:", err?.response?.data || err);
      localStorage.removeItem("tokens");
      setUser(null);

    } finally {
      // THIS IS THE FIX FOR STUCK LOADING
      setLoading(false);
    }
  };

  hydrateUser();
}, []);

  // ---------------------------
  // LOGIN HANDLER
  // ---------------------------
  const login = async (credentials) => {
    const data = await loginUser(credentials); // expected: { access, refresh, user }

    if (!data) return null;

    const { access, refresh, user: profile } = data;

    if (access && refresh) {
      localStorage.setItem("tokens", JSON.stringify({ access, refresh }));
    }

    if (profile) {
      setUser(profile);
    }

    return profile;
  };

  // ---------------------------
  // LOGOUT
  // ---------------------------
  const logout = () => {
    localStorage.removeItem("tokens");
    setUser(null);
  };

  // ---------------------------
  // SAFE CONTEXT VALUE
  // ---------------------------
  const value = { user, login, logout, loading };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// SAFER HOOK
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
