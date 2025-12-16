import React, { useState } from "react";

export default function AddProperty() {
  const [property, setProperty] = useState({ name: "", address: "", units: "" });

  const handleChange = (e) => setProperty({ ...property, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Property:", property);
    alert("Property added! (Simulated)");
    setProperty({ name: "", address: "", units: "" });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Add Property</h1>
      <form className="bg-white p-6 rounded-xl shadow-sm border flex flex-col gap-4" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Property Name" value={property.name} onChange={handleChange} className="p-2 border rounded" required />
        <input type="text" name="address" placeholder="Address" value={property.address} onChange={handleChange} className="p-2 border rounded" required />
        <input type="number" name="units" placeholder="Number of Units" value={property.units} onChange={handleChange} className="p-2 border rounded" required />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Add Property</button>
      </form>
    </div>
  );
}
