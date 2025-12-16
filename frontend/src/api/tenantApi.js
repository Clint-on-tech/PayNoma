// src/api/tenantApi.js
import { api } from "./axios";

export const fetchTenantStats = async () => {
  const resp = await api.get("tenant/stats/");
  return resp.data;
};

export const fetchTenantPayments = async () => {
  const resp = await api.get("tenant/payments/");
  return resp.data;
};
