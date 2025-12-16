// src/pages/Register.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { registerUser } from "../utils/auth";

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    confirm_password: "",
    role: "tenant",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm_password) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // 1) Register user (backend creates the user)
      await registerUser({
        full_name: form.full_name,
        email: form.email,
        password: form.password,
        confirm_password: form.confirm_password,
        role: form.role,
      });

      // 2) Immediately log the user in to get tokens & profile
      const profile = await login({
        email: form.email,
        password: form.password,
      });

      // 3) If backend didn't return role, fallback to tenant and warn
      if (!profile || !profile.role) {
        console.warn("Role missing from response — using safe fallback.");
        // show friendly message and redirect to tenant area
        setError("Account created — redirecting to tenant dashboard...");
        navigate("/dashboard/tenant");
        return;
      }

      // 4) Navigate to role-specific dashboard
      navigate(`/dashboard/${profile.role}`);
    } catch (err) {
      console.error(err.response?.data || err);

      // Backend sent validation errors
      if (err.response?.data) {
        // If it's an object with fields, flatten it
        const messages = Object.entries(err.response.data)
          .map(([key, val]) => {
            if (Array.isArray(val)) return `${key}: ${val.join(", ")}`;
            return `${key}: ${val}`;
          })
          .join(" | ");
        setError(messages);
      } else {
        setError("Registration failed. Please check your details.");
      }
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
        <h2 className="text-xl font-semibold text-slate-700 text-center mb-4">Create your account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="text-red-600 text-sm">{error}</div>}

          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-slate-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirm_password"
                value={form.confirm_password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-2 text-slate-500"
              >
                {showConfirm ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="tenant">Tenant</option>
              <option value="landlord">Landlord</option>
              <option value="admin">Admin</option>
              <option value="support">Support</option>
            </select>
          </div>

          <button type="submit" className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition-colors">
            Register
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-700 hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
