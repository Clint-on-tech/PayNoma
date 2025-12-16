import React from "react";
import { Shield, Clock, Bell, FileText } from "lucide-react";

const features = [
  { title: "Secure Payments", desc: "PCI-level security and bank integrations", icon: <Shield /> },
  { title: "Auto Reminders", desc: "SMS & email rent reminders before due date", icon: <Bell /> },
  { title: "Flexible Billing", desc: "Monthly / Quarterly / Annual rent cycles", icon: <Clock /> },
  { title: "Compliance & Reports", desc: "Export KRA-ready invoices & financials", icon: <FileText /> },
];

export default function FeatureGrid() {
  return (
    <section id="features" className="py-12">
      <h3 className="text-2xl font-bold text-slate-800 mb-6">Everything landlords and tenants need</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="w-12 h-12 rounded-lg bg-paynomaBlue/10 text-paynomaBlue flex items-center justify-center mb-3">
              {f.icon}
            </div>
            <h4 className="font-semibold text-slate-800">{f.title}</h4>
            <p className="text-sm text-slate-500 mt-2">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
