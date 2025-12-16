// src/api/adminApi.js
import { api } from "./axios";

// Fetch revenue data
export const fetchRevenueData = async () => {
  const response = await api.get("admin/revenue/");
  return response.data;
};

// Fetch transactions
export const fetchTransactions = async () => {
  const response = await api.get("admin/transactions/");
  return response.data;
};

// Fetch admin stats
export const fetchAdminStats = async () => {
  const response = await api.get("admin/stats/");
  return response.data;
};
