// src/api/mockData.js
export const adminStats = {
  tenants: 245,
  properties: 48,
  revenue: 1200000,
};

export const recentTransactions = [
  { tenant: "John Mwangi", property: "Sunshine Apartments", amount: 25000, status: "Paid", date: "2025-10-01" },
  { tenant: "Sarah K.", property: "Blue Haven Tower", amount: 18000, status: "Pending", date: "2025-10-02" },
  { tenant: "Peter O.", property: "Hilltop Residency", amount: 22000, status: "Overdue", date: "2025-10-05" },
];

export const revenueData = [
  { month: "Jan", amount: 90000 },
  { month: "Feb", amount: 110000 },
  { month: "Mar", amount: 136000 },
  { month: "Apr", amount: 130000 },
  { month: "May", amount: 150000 },
  { month: "Jun", amount: 180000 },
];
