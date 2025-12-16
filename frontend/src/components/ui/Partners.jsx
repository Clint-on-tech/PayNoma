import React from "react";

const logos = [
  "/assets/mpesa-logo.png",
  "/assets/ncb-logo.png",
  "/assets/equity-logo.png",
  // add actual logos in /public/assets
];

export default function Partners() {
  return (
    <section id="partners" className="py-12">
      <h3 className="text-2xl font-bold mb-6">Banking & integration partners</h3>
      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <div className="flex gap-6 items-center justify-around flex-wrap">
          {logos.map((l, i) => (
            <img key={i} src={l} alt={`partner-${i}`} className="h-12 object-contain opacity-90" />
          ))}
        </div>
        <div className="mt-4 text-sm text-slate-500">MPESA, bank payouts, and direct integrations available. Custom bank integrations on enterprise plan.</div>
      </div>
    </section>
  );
}
