import React from "react";
import { ShieldCheck, Clock, Zap, Layers, CheckCircle2 } from "lucide-react";

const items = [
  {
    icon: <ShieldCheck size={26} />,
    title: "Your Payments, Always Protected",
    text: "We understand how sensitive rent money is, that’s why PayNoma is built with enterprise-grade security. Every transaction is encrypted, every record is protected, and you stay in full control."
  },
  {
    icon: <Clock size={26} />,
    title: "No More Late Payments",
    text: "Tenants get smart reminders, seamless mobile payment options, and instant confirmations. You get predictable cashflow without chasing anyone ever again."
  },
  {
    icon: <Zap size={26} />,
    title: "Manage More With Less Effort",
    text: "Whether you manage a few units or an entire portfolio, PayNoma keeps everything running smoothly. Scale without the stress, complexity, or paperwork."
  },
  {
    icon: <Layers size={26} />,
    title: "Everything in One Clear Dashboard",
    text: "Track tenants, leases, arrears, reports, and payments all from one clean, beautifully designed dashboard. No more switching apps or digging through spreadsheets."
  }
];

// Central last point combining previous two
const centralItem = {
  icon: <CheckCircle2 size={30} />,
  title: "Rent Collection That Runs on Autopilot",
  text: "PayNoma automates everything that wastes your time: reminders, receipts, reconciliation, and reporting. Focus on growth while PayNoma handles the routine tasks silently in the background."
};

export default function WhyChoose() {
  return (
    <section id="why" className="py-16 bg-blue-50 relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute -top-10 -left-10 w-48 h-48 bg-blue-200/40 rounded-full blur-2xl"></div>
      <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-blue-200/40 rounded-full blur-2xl"></div>

      <div className="relative max-w-5xl mx-auto text-center space-y-8 px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
          Why Property Managers Are Choosing <span className="text-blue-800">PayNoma</span>
        </h2>

        <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto">
          PayNoma isn’t just another property tool, it’s the system that makes your entire rent
          process faster, clearer, and stress-free. Designed for real landlords, real tenants, and
          real challenges in the market today.
        </p>

        {/* Grid for first 4 points */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-12 max-w-4xl mx-auto">
          {items.map((it, idx) => (
            <div key={idx} className="flex flex-col items-center text-center gap-3">
              <div className="w-14 h-14 rounded-full bg-blue-200 flex items-center justify-center text-blue-800 shadow">
                {it.icon}
              </div>
              <h3 className="text-xl font-semibold text-blue-800">{it.title}</h3>
              <p className="text-slate-700 text-sm md:text-base max-w-sm">{it.text}</p>
            </div>
          ))}
        </div>

        {/* Central last point */}
        <div className="mt-12 flex flex-col items-center text-center gap-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-blue-300 flex items-center justify-center text-blue-800 shadow-lg">
            {centralItem.icon}
          </div>
          <h3 className="text-2xl font-bold text-blue-800">{centralItem.title}</h3>
          <p className="text-slate-700 text-base">{centralItem.text}</p>
        </div>
      </div>
    </section>
  );
}
