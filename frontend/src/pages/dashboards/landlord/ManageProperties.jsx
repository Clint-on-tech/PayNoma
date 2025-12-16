import React, { useState } from "react";

const initialProperties = [
  { name: "Sunset Apartments", address: "Nairobi CBD", units: 10 },
  { name: "Hilltop Villas", address: "Karen", units: 5 },
];

export default function ManageProperties() {
  const [properties, setProperties] = useState(initialProperties);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Manage Properties</h1>
      <table className="w-full bg-white rounded-xl shadow-sm border">
        <thead>
          <tr className="border-b text-slate-600">
            <th className="py-3">Property Name</th>
            <th>Address</th>
            <th>Units</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((p, i) => (
            <tr key={i} className="border-b">
              <td className="py-2">{p.name}</td>
              <td>{p.address}</td>
              <td>{p.units}</td>
              <td>
                <button onClick={() => setProperties(properties.filter((_, idx) => idx !== i))} className="text-red-600 hover:underline">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
