// src/pages/dashboards/landlord/LandlordDashboard.jsx
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Home, Users, Wallet, Calendar as CalIcon, Trash2, Plus } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as ReTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useAuth } from "../../../contexts/AuthContext";

/*
  Landlord Dashboard (interactive)
  - Profile + role title
  - Interactive calendar (add/edit/delete events)
  - Recent activities (auto-add + auto-expire)
  - Monthly revenue (bar chart)
  - Task summary (small boxes)
  - Properties donut (ring) with legend and total
*/

// --- Helpers for calendar ---
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const STORAGE_EVENTS = "paynoma:landlord:events";
const STORAGE_ACTIVITIES = "paynoma:landlord:activities";

// color palette (PayNoma)
const COLORS = {
  blue: "#1D4ED8", // blue-700
  blueLight: "#DBEAFE", // blue-100
  green: "#10B981",
  greenLight: "#ECFDF5",
  red: "#EF4444",
  redLight: "#FEF2F2",
  slateText: "text-slate-800",
  cardBg: "bg-white",
};

// sample revenue months (replace with API)
const sampleRevenue = [
  { month: "Jul", amount: 420000 },
  { month: "Aug", amount: 480000 },
  { month: "Sep", amount: 530000 },
  { month: "Oct", amount: 490000 },
  { month: "Nov", amount: 560000 },
  { month: "Dec", amount: 610000 },
];

// default properties counts (replace with API)
const sampleProperties = {
  occupied: 38,
  vacant: 10,
  maintenance: 8,
};

// small utility
const uid = () => Math.random().toString(36).slice(2, 9);

// formatting date
const fmtDate = (d) =>
  new Date(d).toLocaleString("en-KE", { dateStyle: "medium", timeStyle: "short" });

// load/save to localStorage
const loadJson = (k, fallback) => {
  try {
    const raw = localStorage.getItem(k);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};
const saveJson = (k, v) => localStorage.setItem(k, JSON.stringify(v));

export default function LandlordDashboard() {
  const { user } = useAuth();
  const [events, setEvents] = useState(() => loadJson(STORAGE_EVENTS, []));
  const [activities, setActivities] = useState(() =>
    loadJson(STORAGE_ACTIVITIES, [])
  );

  // calendar state
  const today = useMemo(() => new Date(), []);
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", time: "10:00", notes: "" });
  const [editingEventId, setEditingEventId] = useState(null);

  // task summary counts (replace with API data)
  const [taskSummary, setTaskSummary] = useState({
    newCount: 6,
    assignedCount: 12,
    closedCount: 24,
  });

  // properties (donut)
  const [properties, setProperties] = useState(sampleProperties);

  // monthly revenue
  const [revenue, setRevenue] = useState(sampleRevenue);

  // Recent activities: ensure newest first
  useEffect(() => {
    // keep only latest 50
    const trimmed = activities.slice(0, 50);
    setActivities(trimmed);
    saveJson(STORAGE_ACTIVITIES, trimmed);
  }, []); // run once on mount to normalize

  // persist events
  useEffect(() => saveJson(STORAGE_EVENTS, events), [events]);
  useEffect(() => saveJson(STORAGE_ACTIVITIES, activities), [activities]);

  // Add a new activity (appears as newest). auto-expire after `msToLive`.
  const pushActivity = (text, msToLive = 30_000) => {
    const act = { id: uid(), text, ts: Date.now() };
    setActivities((prev) => [act, ...prev]);
    // persist handled by effect
    if (msToLive) {
      setTimeout(() => {
        setActivities((prev) => prev.filter((a) => a.id !== act.id));
      }, msToLive);
    }
  };

  // Simulated external updates — for demo only:
  useEffect(() => {
    // push a Kenyan-style activity after mount
    const starter = [
      "New rent payment from Mwangi · Ksh 25,000",
      "Maintenance ticket: leaky roof (B-105)",
      "New tenant application: A-303 — review required",
    ];
    const timers = starter.map((t, i) =>
      setTimeout(() => pushActivity(t, 60_000 + i * 10_000), 2_000 + i * 1000)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  // --------- Calendar helpers ----------
  const firstOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
  const lastOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0);
  const startDay = firstOfMonth.getDay();
  const daysInMonth = lastOfMonth.getDate();

  const prevMonth = () => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  const nextMonth = () => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));

  const openAddForm = (date) => {
    setSelectedDate(date);
    setFormData({ title: "", time: "10:00", notes: "" });
    setEditingEventId(null);
    setShowEventForm(true);
  };

  const onSaveEvent = () => {
    if (!formData.title) return;
    const isoDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      ...formData.time.split(":")
    ).toISOString();

    if (editingEventId) {
      setEvents((prev) =>
        prev.map((ev) =>
          ev.id === editingEventId ? { ...ev, title: formData.title, time: formData.time, notes: formData.notes, dateISO: isoDate } : ev
        )
      );
      pushActivity(`Updated schedule: ${formData.title} — ${fmtDate(isoDate)}`, 25_000);
    } else {
      const newEv = { id: uid(), title: formData.title, time: formData.time, notes: formData.notes, dateISO: isoDate };
      setEvents((prev) => [newEv, ...prev]);
      pushActivity(`Scheduled: ${formData.title} — ${fmtDate(isoDate)}`, 25_000);

      // simulate reminder dispatch (demo)
      const msUntil = Math.max(10000, new Date(isoDate).getTime() - Date.now());
      setTimeout(() => {
        pushActivity(`Reminder: ${newEv.title} happening now!`, 15_000);
      }, Math.min(msUntil, 30_000)); // cap for demo
    }

    setShowEventForm(false);
    setEditingEventId(null);
  };

  const onEditEvent = (ev) => {
    setSelectedDate(new Date(ev.dateISO));
    setFormData({ title: ev.title, time: ev.time, notes: ev.notes || "" });
    setEditingEventId(ev.id);
    setShowEventForm(true);
  };

  const deleteEvent = (id) => {
    const ev = events.find((e) => e.id === id);
    setEvents((prev) => prev.filter((e) => e.id !== id));
    pushActivity(`Cancelled: ${ev?.title || "Event"}`, 10_000);
  };

  // events grouped by day for quick lookup
  const eventsByDay = useMemo(() => {
    const map = {};
    events.forEach((ev) => {
      const key = new Date(ev.dateISO).toDateString();
      map[key] = map[key] || [];
      map[key].push(ev);
    });
    return map;
  }, [events]);

  // properties donut data
  const propData = [
    { name: "Occupied", value: properties.occupied, color: COLORS.blue },
    { name: "Vacant", value: properties.vacant, color: COLORS.green },
    { name: "Maintenance", value: properties.maintenance, color: COLORS.red },
  ];

  // ---------- Render ----------
  return (
    <div className="space-y-6">
      {/* Header: profile */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            {user?.full_name || "Clinton Juma"}, <span className="text-slate-500 text-lg font-medium">{(user?.role || "landlord").toUpperCase()}</span>
          </h1>
          <p className="text-slate-500 mt-1">Welcome back — here’s what’s happening with your properties.</p>
        </div>

        <div className="flex gap-3 items-center">
          <div className="text-sm text-slate-600">Local time</div>
          <div className="px-3 py-2 rounded bg-slate-100 text-slate-800">
            {new Date().toLocaleString("en-KE", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
          </div>
        </div>
      </motion.div>

      {/* Top summary + small widgets */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* left: calendar card */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blueLight flex items-center justify-center text-blue-700">
                <CalIcon size={18} />
              </div>
              <div>
                <div className="text-sm text-slate-500">Calendar</div>
                <div className="font-semibold">{viewDate.toLocaleString("en-KE", { month: "long", year: "numeric" })}</div>
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={prevMonth} className="px-3 py-1 rounded bg-slate-100 hover:bg-slate-200">Prev</button>
              <button onClick={nextMonth} className="px-3 py-1 rounded bg-slate-100 hover:bg-slate-200">Next</button>
            </div>
          </div>

          {/* mini calendar grid */}
          <div className="grid grid-cols-7 gap-1 text-xs text-slate-500 mb-2">
            {WEEKDAYS.map((wd) => <div key={wd} className="text-center py-1">{wd}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {/* blank cells before first day */}
            {Array.from({ length: startDay }).map((_, i) => <div key={`b-${i}`} className="h-16"></div>)}

            {/* days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const d = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
              const key = d.toDateString();
              const dayEvents = eventsByDay[key] || [];
              const isToday = d.toDateString() === new Date().toDateString();
              return (
                <div
                  key={key}
                  className={`border rounded p-2 h-24 flex flex-col justify-between ${isToday ? "border-blue-300 bg-blue-50" : ""}`}
                >
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium">{day}</div>
                    <button
                      onClick={() => openAddForm(d)}
                      className="text-xs bg-blue-600 text-white rounded px-2 py-0.5 hover:bg-blue-700"
                    >
                      + Add
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto mt-1">
                    {dayEvents.slice(0, 3).map((ev) => (
                      <div key={ev.id} className="mb-1 bg-slate-100 rounded px-2 py-1 text-xs flex items-center justify-between">
                        <div>
                          <div className="font-medium">{ev.title}</div>
                          <div className="text-[10px] text-slate-500">{ev.time}</div>
                        </div>
                        <div className="flex flex-col gap-1 ml-2">
                          <button onClick={() => onEditEvent(ev)} className="text-slate-600 text-[12px]">Edit</button>
                          <button onClick={() => deleteEvent(ev.id)} className="text-red-500 text-[12px]">Del</button>
                        </div>
                      </div>
                    ))}

                    {dayEvents.length > 3 && (
                      <div className="text-xs text-slate-400 mt-1">+{dayEvents.length - 3} more</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* event form modal (simple inline) */}
          {showEventForm && (
            <div className="mt-4 border-t pt-4">
              <div className="text-sm text-slate-600 mb-2">Add / Edit event — {selectedDate?.toDateString()}</div>
              <div className="grid gap-2">
                <input
                  placeholder="Title (e.g. Add new tenant)"
                  value={formData.title}
                  onChange={(e) => setFormData((s) => ({ ...s, title: e.target.value }))}
                  className="w-full px-3 py-2 border rounded"
                />
                <div className="flex gap-2">
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData((s) => ({ ...s, time: e.target.value }))}
                    className="px-3 py-2 border rounded"
                  />
                  <input
                    placeholder="Notes"
                    value={formData.notes}
                    onChange={(e) => setFormData((s) => ({ ...s, notes: e.target.value }))}
                    className="flex-1 px-3 py-2 border rounded"
                  />
                </div>

                <div className="flex gap-2 justify-end">
                  <button onClick={() => { setShowEventForm(false); setEditingEventId(null); }} className="px-3 py-2 rounded border">Cancel</button>
                  <button onClick={onSaveEvent} className="px-3 py-2 rounded bg-blue-600 text-white">Save</button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* mid: monthly revenue */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border col-span-1 md:col-span-1">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-sm text-slate-500">Monthly Revenue</div>
              <div className="text-lg font-semibold">Last 6 months</div>
            </div>
            <div className="text-slate-500 text-sm">Ksh</div>
          </div>

          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenue} margin={{ top: 8, right: 8, left: -12, bottom: 8 }}>
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v)} />
                <ReTooltip formatter={(v) => `Ksh ${v.toLocaleString()}`} />
                <Bar dataKey="amount" fill={COLORS.blue}>
                  {revenue.map((_, idx) => <Cell key={idx} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-3 text-sm text-slate-500">Total last 6 months: <span className="font-semibold text-slate-800">Ksh {revenue.reduce((s, r) => s + r.amount, 0).toLocaleString()}</span></div>
        </div>

        {/* right: tasks + properties */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-sm text-slate-500">Task Summary</div>
              <div className="text-lg font-semibold">Overview</div>
            </div>
            <div className="text-slate-400 text-sm">• Live</div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="p-3 rounded-lg bg-blueLight text-blue-700">
              <div className="text-xs">New</div>
              <div className="text-2xl font-bold">{taskSummary.newCount}</div>
            </div>
            <div className="p-3 rounded-lg bg-greenLight text-green-700">
              <div className="text-xs">Assigned</div>
              <div className="text-2xl font-bold">{taskSummary.assignedCount}</div>
            </div>
            <div className="p-3 rounded-lg bg-redLight text-red-700">
              <div className="text-xs">Closed</div>
              <div className="text-2xl font-bold">{taskSummary.closedCount}</div>
            </div>
          </div>

          <div className="mb-4">
            <div className="text-sm text-slate-600 mb-2">Properties</div>
            <div className="flex items-center gap-4">
              <div style={{ width: 120, height: 120 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={propData}
                      dataKey="value"
                      innerRadius={36}
                      outerRadius={54}
                      paddingAngle={3}
                    >
                      {propData.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ReTooltip formatter={(v) => v} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div>
                <div className="text-sm text-slate-500">Total units</div>
                <div className="text-2xl font-bold">{properties.occupied + properties.vacant + properties.maintenance}</div>

                <div className="mt-3 text-sm">
                  <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-blue-700 inline-block"></span> Occupied: {properties.occupied}</div>
                  <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-green-600 inline-block"></span> Vacant: {properties.vacant}</div>
                  <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-red-500 inline-block"></span> Maintenance: {properties.maintenance}</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm text-slate-600 mb-2">Quick Actions</div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  // example quick action
                  pushActivity("Reminder sent to tenant Mwangi", 8000);
                }}
                className="px-3 py-2 rounded bg-blue-600 text-white flex items-center gap-2"
              >
                <Plus size={14} /> Send Reminder
              </button>
              <button
                onClick={() => {
                  // toggle a sample vacancy change
                  setProperties((p) => ({ ...p, vacant: Math.max(0, p.vacant - 1), occupied: p.occupied + 1 }));
                  pushActivity("Unit A-204 marked occupied", 8000);
                }}
                className="px-3 py-2 rounded border"
              >
                Mark Occupied
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities (bottom) */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-sm text-slate-500">Recent Activities</div>
            <div className="text-lg font-semibold">Live feed</div>
          </div>
          <div>
            <button onClick={() => { setActivities([]); saveJson(STORAGE_ACTIVITIES, []); }} className="text-xs text-red-500">Clear</button>
          </div>
        </div>

        <div className="space-y-3 max-h-56 overflow-y-auto">
          {activities.length === 0 && <div className="text-slate-400">No recent activities.</div>}
          {activities.map((a) => (
            <div key={a.id} className="flex items-center justify-between border-b pb-2">
              <div>
                <div className="text-sm font-medium text-slate-800">{a.text}</div>
                <div className="text-xs text-slate-500">{new Date(a.ts).toLocaleString("en-KE")}</div>
              </div>
              <div className="text-xs text-slate-400">{/* placeholder for actions */}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
