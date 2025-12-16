import React from "react";

const data = [
  { name: "Grace M.", role: "Property Manager", quote: "Paynoma cut our late payments by 70%. The reports are brilliant." },
  { name: "Alan K.", role: "Landlord", quote: "Easy to use, great support. Mpesa integration just works." },
  { name: "Ruth N.", role: "Finance Officer", quote: "ETIMS export saved hours every month. Highly recommended." },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-gradient-to-b from-paynomaBlue/5 to-white relative overflow-hidden">
      {/* Decorative blurred circles */}
      <div className="absolute -top-16 -left-16 w-64 h-64 bg-paynomaBlue/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-paynomaBlue/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6 text-center space-y-8">
        <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900">
          See why others are making the switch
        </h3>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
          Landlords and property managers who trust PayNoma share their experiences.
        </p>

        <div className="mt-12 grid md:grid-cols-3 gap-8">
          {data.map((t, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-3xl shadow-lg border border-white/20 flex flex-col gap-4 hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-paynomaBlue/10 flex items-center justify-center text-paynomaBlue font-bold text-lg">
                  {t.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-slate-900">{t.name}</div>
                  <div className="text-slate-500 text-sm">{t.role}</div>
                </div>
              </div>
              <p className="mt-2 text-slate-700 text-md leading-relaxed">"{t.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
