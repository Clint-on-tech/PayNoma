import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Wallet, Home, Bell } from "lucide-react";
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
import {
  fetchTenantStats,
  fetchTenantPayments,
} from "../../api/tenantApi";

export default function TenantDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [recentPayments, setRecentPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return setLoading(false);

    const loadData = async () => {
      try {
        const tenantStats = await fetchTenantStats(user.id);
        const history = await fetchTenantPayments(user.id);

        setStats([
          {
            name: "Rent Due",
            value: tenantStats.rentDue
              ? `Ksh ${tenantStats.rentDue.toLocaleString()}`
              : "Ksh 0",
            icon: <Wallet size={26} />,
            color: "bg-red-100 text-red-600",
          },
          {
            name: "Unit",
            value: tenantStats.unit || "-",
            icon: <Home size={26} />,
            color: "bg-blue-100 text-blue-600",
          },
          {
            name: "Notifications",
            value: tenantStats.notifications
              ? `${tenantStats.notifications} New`
              : "0 New",
            icon: <Bell size={26} />,
            color: "bg-yellow-100 text-yellow-600",
          },
        ]);

        setPaymentHistory(history.chartData || []);
        setRecentPayments(history.recentPayments || []);
      } catch (err) {
        console.error("Error loading tenant data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Please log in to view your dashboard.
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
    <div className="space-y-8">
      {/* Title */}
      <motion.h1
        className="text-3xl font-bold text-slate-900"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Welcome back, {user?.name || "Tenant"}
      </motion.h1>

      {/* STAT CARDS */}
      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((item, index) => (
          <motion.div
            key={index}
            className="bg-gradient-to-br from-white to-slate-50 p-6 rounded-2xl border shadow-md hover:shadow-lg transition"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.color}`}
              >
                {item.icon}
              </div>
              <div>
                <p className="text-slate-500 text-sm">{item.name}</p>
                <p className="text-2xl font-semibold text-slate-900">
                  {item.value}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* PAYMENT HISTORY CHART */}
      <div className="bg-white p-6 rounded-2xl border shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-slate-800">
            Payment History
          </h2>
          <p className="text-sm text-slate-500">Last 12 months</p>
        </div>

        <div className="h-64">
          {paymentHistory.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={paymentHistory}>
                <CartesianGrid strokeDasharray="4 4" opacity={0.3} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400">
              No payment history available.
            </div>
          )}
        </div>
      </div>

      {/* RECENT PAYMENTS TABLE */}
      <div className="bg-white p-6 rounded-2xl border shadow-md overflow-x-auto">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          Recent Payments
        </h2>

        {recentPayments.length > 0 ? (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-slate-600">
                <th className="py-3">Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Landlord</th>
                <th>Unit</th>
              </tr>
            </thead>
            <tbody>
              {recentPayments.map((t, i) => (
                <tr key={i} className="border-b text-slate-700">
                  <td className="py-3">{t.date}</td>
                  <td>Ksh {t.amount.toLocaleString()}</td>
                  <td
                    className={
                      t.status === "Paid"
                        ? "text-emerald-600 font-medium"
                        : t.status === "Pending"
                        ? "text-orange-500 font-medium"
                        : "text-red-500 font-medium"
                    }
                  >
                    {t.status}
                  </td>
                  <td>{t.landlord}</td>
                  <td>{t.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-slate-500">No recent payments.</p>
        )}
      </div>
    </div>
  );
}
