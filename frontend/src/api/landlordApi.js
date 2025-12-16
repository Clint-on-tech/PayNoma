// src/api/landlordApi.js
import { api } from "./axios";

export const fetchLandlordStats = async () => {
  const resp = await api.get("landlord/stats/");
  return resp.data;
};
