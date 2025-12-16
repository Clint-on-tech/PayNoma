import React, { useState } from "react";

export default function AddTenant() {
  const [tenant, setTenant] = useState({ name: "", unit: "", monthlyRent: "" });

  const handleChange = (e) => {
    setTenant({ ...tenant, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Tenant:", tenant);
    alert("Tenant added! (Simulated)");
    setTenant({ name: "", unit: "", monthlyRent: "" });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Add Tenant</h1>
      <form className="bg-white p-6 rounded-xl shadow-sm border flex flex-col gap-4" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Tenant Name" value={tenant.name} onChange={handleChange} className="p-2 border rounded" required />
        <input type="text" name="unit" placeholder="Unit" value={tenant.unit} onChange={handleChange} className="p-2 border rounded" required />
        <input type="number" name="monthlyRent" placeholder="Monthly Rent (Ksh)" value={tenant.monthlyRent} onChange={handleChange} className="p-2 border rounded" required />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Add Tenant</button>
      </form>
    </div>
  );
}
