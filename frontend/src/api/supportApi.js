// src/api/supportApi.js
import { api } from "./axios";

// Fetch all tickets
export const fetchTickets = async () => {
  const response = await api.get("support/tickets/");
  return response.data;
};

// Fetch support statistics
export const fetchSupportStats = async () => {
  const response = await api.get("support/stats/");
  return response.data;
};

// Add other support-related API calls here if needed
