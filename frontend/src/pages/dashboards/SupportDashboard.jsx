import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Users, Headphones, ArrowUpRight } from "lucide-react";
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
import { fetchSupportStats, fetchTickets } from "../../api/supportApi";

export default function SupportDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState([]);
  const [ticketData, setTicketData] = useState([]);
  const [recentTickets, setRecentTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return setLoading(false);

    const loadData = async () => {
      const supportStats = await fetchSupportStats(user.id);
      const tickets = await fetchTickets(user.id);

      setStats([
        {
          name: "Open Tickets",
          value: supportStats.open,
          icon: <MessageCircle size={24} />,
          color: "bg-blue-50 text-blue-600",
        },
        {
          name: "Resolved Today",
          value: supportStats.resolvedToday,
          icon: <Headphones size={24} />,
          color: "bg-emerald-50 text-emerald-600",
        },
        {
          name: "Active Users",
          value: supportStats.activeUsers,
          icon: <Users size={24} />,
          color: "bg-purple-50 text-purple-600",
        },
      ]);

      setTicketData(supportStats.ticketVolume);
      setRecentTickets(tickets);
      setLoading(false);
    };

    loadData();
  }, [user]);

  if (!user) return null;

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.h1
        className="text-3xl font-bold text-slate-800"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Support Dashboard
      </motion.h1>

      {/* Metrics Cards (Admin Style) */}
      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white p-5 rounded-xl shadow-sm border hover:shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center ${item.color}`}
            >
              {item.icon}
            </div>

            <h2 className="text-lg text-slate-600 mt-2">{item.name}</h2>
            <p className="text-2xl font-bold text-slate-800">{item.value}</p>

            {/* Growth % (Optional but matching Admin design) */}
            <p className="text-sm text-emerald-600 flex items-center gap-1">
              <ArrowUpRight size={14} /> +{Math.floor(Math.random() * 20)}%
            </p>
          </motion.div>
        ))}
      </div>

      {/* Ticket Volume Chart (Exact Admin Style) */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-xl font-semibold text-slate-700 mb-4">
          Ticket Volume
        </h2>
        <div className="h-64 min-h-[250px]">
          {ticketData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ticketData}>
                <CartesianGrid strokeDasharray="4 4" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="tickets"
                  stroke="#2563eb"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400">
              No data available.
            </div>
          )}
        </div>
      </div>

      {/* Recent Tickets Table (Admin Table Style) */}
      <div className="bg-white p-6 rounded-xl shadow-sm border overflow-x-auto">
        <h2 className="text-xl font-semibold text-slate-700 mb-4">
          Recent Tickets
        </h2>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-slate-600">
              <th className="py-3">Tenant</th>
              <th className="py-3">Issue</th>
              <th className="py-3">Status</th>
              <th className="py-3">Date</th>
              <th className="py-3">Assigned To</th>
            </tr>
          </thead>

          <tbody>
            {recentTickets.map((t, i) => (
              <tr key={i} className="border-b">
                <td className="py-3">{t.tenant}</td>
                <td>{t.issue}</td>
                <td
                  className={
                    t.status === "Resolved"
                      ? "text-emerald-600 font-medium"
                      : t.status === "In Progress"
                      ? "text-orange-500 font-medium"
                      : "text-red-500 font-medium"
                  }
                >
                  {t.status}
                </td>
                <td>{t.date}</td>
                <td>{t.agent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
