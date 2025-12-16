import React, { useState } from "react";

const initialTenants = [
  { name: "John Mwangi", unit: "A-101", status: "Active", monthlyRent: 25000 },
  { name: "Sarah K", unit: "A-202", status: "Pending", monthlyRent: 25000 },
];

export default function ManageTenants() {
  const [tenants, setTenants] = useState(initialTenants);

  const toggleStatus = (index) => {
    const updated = [...tenants];
    updated[index].status = updated[index].status === "Active" ? "Pending" : "Active";
    setTenants(updated);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Manage Tenants</h1>
      <table className="w-full bg-white rounded-xl shadow-sm border">
        <thead>
          <tr className="border-b text-slate-600">
            <th className="py-3">Tenant</th>
            <th>Unit</th>
            <th>Status</th>
            <th>Monthly Rent</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tenants.map((t, i) => (
            <tr key={i} className="border-b">
              <td className="py-2">{t.name}</td>
              <td>{t.unit}</td>
              <td className={t.status === "Active" ? "text-emerald-600" : "text-orange-500"}>{t.status}</td>
              <td>Ksh {t.monthlyRent.toLocaleString()}</td>
              <td>
                <button onClick={() => toggleStatus(i)} className="text-blue-600 hover:underline mr-2">Toggle Status</button>
                <button onClick={() => setTenants(tenants.filter((_, idx) => idx !== i))} className="text-red-600 hover:underline">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
