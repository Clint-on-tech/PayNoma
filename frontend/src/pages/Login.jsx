// src/pages/Login.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const profile = await login({ email: form.email, password: form.password });

      if (!profile?.role) {
        setError("Login failed. No role found.");
        return;
      }

      // Redirect based on role
      switch (profile.role) {
        case "admin":
          navigate("/dashboard/admin");
          break;
        case "landlord":
          navigate("/dashboard/landlord");
          break;
        case "tenant":
          navigate("/dashboard/tenant");
          break;
        case "support":
          navigate("/dashboard/support");
          break;
        default:
          navigate("/dashboard/tenant");
      }
    } catch (err) {
      console.error(err.response?.data || err);
      setError(err.response?.data?.error || "Login failed. Check credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">PayNoma</h1>
        <h2 className="text-xl font-semibold text-slate-700 text-center mb-4">Sign in</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition-colors"
          >
            Sign In
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Don’t have an account? <Link to="/register" className="text-blue-700">Create one</Link>
        </p>
      </motion.div>
    </div>
  );
}
