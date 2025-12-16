// C:\Users\USER\paynoma-frontend\src\pages\dashboards\AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Building2, Wallet, ArrowUpRight } from "lucide-react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import { useAuth } from "../../contexts/AuthContext";
import { fetchAdminStats, fetchTransactions, fetchRevenueData } from "../../api/adminApi";

/**
 * AdminDashboard - upgraded to match Paynoma style (Option 1)
 * - Uses useAuth safely
 * - Shows loading states
 * - Defensive API calls
 * - Chart container has min height to avoid Recharts width/height warning
 */

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      // if no user (not logged in) we stop loading; protected route should block access
      setLoading(false);
      return;
    }

    const loadAll = async () => {
      setLoading(true);
      setError("");
      try {
        // The fetch* functions should return usable defaults (arrays/objects) or throw
        const adminStats = (await fetchAdminStats()) || {};
        const recentTransactions = (await fetchTransactions()) || [];
        const revenueChartData = (await fetchRevenueData()) || [];

        setStats([
          {
            name: "Total Tenants",
            value: adminStats.tenants ?? 0,
            icon: <Users size={22} />,
            color: "bg-blue-50 text-blue-600",
          },
          {
            name: "Total Properties",
            value: adminStats.properties ?? 0,
            icon: <Building2 size={22} />,
            color: "bg-emerald-50 text-emerald-600",
          },
          {
            name: "Total Revenue",
            value:
              typeof adminStats.revenue === "number"
                ? `Ksh ${adminStats.revenue.toLocaleString()}`
                : "Ksh 0",
            icon: <Wallet size={22} />,
            color: "bg-purple-50 text-purple-600",
          },
          {
            name: "Pending Payments",
            value: adminStats.pendingPayments ?? 0,
            icon: <ArrowUpRight size={22} />,
            color: "bg-orange-50 text-orange-600",
          },
        ]);

        setTransactions(recentTransactions);
        setRevenueData(revenueChartData);
      } catch (err) {
        console.error("Failed to load admin dashboard data:", err);
        setError("Unable to load dashboard data. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadAll();
  }, [user]);

  // If user not present, prompt to log in (guard should normally redirect)
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Please sign in to view admin dashboard.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-slate-800"
      >
        Admin Dashboard
      </motion.h1>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 text-red-700 p-3 rounded">
          {error}
        </div>
      )}

      {/* Metric cards */}
      <div className="grid md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-4 rounded-xl shadow-sm border">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${s.color}`}>
                {s.icon}
              </div>
              <div>
                <p className="text-sm text-slate-500">{s.name}</p>
                <p className="text-2xl font-bold text-slate-800">{s.value}</p>
              </div>
            </div>
            <div className="mt-3 text-sm text-emerald-600 flex items-center gap-2">
              <ArrowUpRight size={14} /> <span>+{Math.floor(Math.random() * 12)}% (mo)</span>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-slate-700">Revenue Overview</h2>
          <div className="text-sm text-slate-500">Last 6 months</div>
        </div>

        <div className="h-64 min-h-[250px]">
          {revenueData && revenueData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="4 4" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke="#2563eb" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400">
              No revenue data available.
            </div>
          )}
        </div>
      </div>

      {/* Recent transactions */}
      <div className="bg-white p-6 rounded-xl shadow-sm border overflow-x-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-slate-700">Recent Transactions</h2>
          <div className="text-sm text-slate-500">Latest payments</div>
        </div>

        {transactions && transactions.length > 0 ? (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-slate-600">
                <th className="py-3">Tenant</th>
                <th className="py-3">Property</th>
                <th className="py-3">Unit</th>
                <th className="py-3">Amount</th>
                <th className="py-3">Status</th>
                <th className="py-3">Landlord</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, i) => (
                <tr key={i} className="border-b">
                  <td className="py-3">{t.tenant || "—"}</td>
                  <td>{t.property || "—"}</td>
                  <td>{t.unit || "—"}</td>
                  <td>{typeof t.amount === "number" ? `Ksh ${t.amount.toLocaleString()}` : (t.amount || "Ksh 0")}</td>
                  <td>
                    <span
                      className={
                        t.status === "Paid"
                          ? "text-emerald-600 font-medium"
                          : t.status === "Pending"
                          ? "text-orange-500 font-medium"
                          : "text-red-500 font-medium"
                      }
                    >
                      {t.status}
                    </span>
                  </td>
                  <td>{t.landlord || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-slate-500">No recent transactions.</div>
        )}
      </div>
    </div>
  );
}
