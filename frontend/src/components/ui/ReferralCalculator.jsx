// src/components/ui/ReferralCalculator.jsx
import React, { useState } from "react";

export default function ReferralCalculator({ defaultRent = 50000, defaultPlatformPercent = 2, defaultRefPercent = 23 }) {
  const [rent, setRent] = useState(defaultRent);
  const [platformPercent, setPlatformPercent] = useState(defaultPlatformPercent);
  const [refPercent, setRefPercent] = useState(defaultRefPercent);

  const platformFee = (rent * (platformPercent / 100));
  const refAmount = Math.round(platformFee * (refPercent / 100));

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border max-w-xl">
      <h4 className="font-semibold text-lg">Referral calculator</h4>
      <p className="text-sm text-slate-500 mt-1">See how much you earn when you refer a client.</p>

      <div className="mt-4 grid grid-cols-1 gap-3">
        <label className="text-sm text-slate-600">Rent (Ksh)</label>
        <input type="number" value={rent} onChange={(e)=>setRent(Number(e.target.value))} className="w-full border rounded px-3 py-2" />

        <div className="flex gap-2">
          <div className="flex-1">
            <label className="text-sm text-slate-600">Platform fee (%)</label>
            <input type="number" value={platformPercent} onChange={(e)=>setPlatformPercent(Number(e.target.value))} className="w-full border rounded px-3 py-2" />
          </div>
          <div className="flex-1">
            <label className="text-sm text-slate-600">Your share (%)</label>
            <input type="number" value={refPercent} onChange={(e)=>setRefPercent(Number(e.target.value))} className="w-full border rounded px-3 py-2" />
          </div>
        </div>

        <div className="mt-4 bg-slate-50 p-4 rounded">
          <div className="text-sm text-slate-500">Platform fee:</div>
          <div className="text-xl font-bold">Ksh {platformFee.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
          <div className="text-sm text-slate-500 mt-2">Your referral cut ({refPercent}%):</div>
          <div className="text-2xl text-paynomaBlue font-extrabold">Ksh {refAmount.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}
