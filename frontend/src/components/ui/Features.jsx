import React from "react";
import { Zap, Grid, Users } from "lucide-react";

const features = [
  {
    icon: <Zap size={28} />,
    title: "Effortless Rent Collection",
    text: "Collect rent automatically via Mpesa or bank integrations — simple, on-time, and stress-free."
  },
  {
    icon: <Grid size={28} />,
    title: "Centralized Dashboard",
    text: "Track tenants, units, and payments all in one friendly, easy-to-use interface."
  },
  {
    icon: <Users size={28} />,
    title: "Share & Earn",
    text: "Invite friends and refer landlords — earn rewards while spreading the goodness of PayNoma."
  }
];

export default function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-12">
        <h2 className="text-4xl font-extrabold text-slate-900">Why PayNoma?</h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
          PayNoma makes rent collection simple, reliable, and rewarding — built for landlords, managers, and tenants.
        </p>

        <div className="grid md:grid-cols-3 gap-12 mt-10">
          {features.map((f, idx) => (
            <div key={idx} className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-paynomaBlue/10 flex items-center justify-center text-paynomaBlue">
                {f.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-900">{f.title}</h3>
              <p className="text-slate-600">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
