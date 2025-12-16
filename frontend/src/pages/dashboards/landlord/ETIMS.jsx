import React from "react";

const taxReminder = 0.1; // 10%

export default function ETIMS() {
  const tenants = [
    { name: "John Mwangi", monthlyRent: 25000 },
    { name: "Sarah K", monthlyRent: 25000 },
  ];

  const totalRent = tenants.reduce((acc, t) => acc + t.monthlyRent, 0);
  const taxDue = totalRent * taxReminder;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">ETIMS Tax Reminder</h1>
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <p>Total Rent Collected: <strong>Ksh {totalRent.toLocaleString()}</strong></p>
        <p>Estimated Tax Due (10%): <strong>Ksh {taxDue.toLocaleString()}</strong></p>
        <p className="mt-4 text-sm text-slate-600">
          This is a reminder only. Landlords must file tax using ETIMS portal.
        </p>
      </div>
    </div>
  );
}
