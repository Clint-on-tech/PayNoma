import React from "react";

const metrics = [
  {
    number: "KES 500M+",
    text: "Projected monthly rent we aim to streamline with PayNoma — making collections simple and worry-free."
  },
  {
    number: "10k+",
    text: "Tenants we envision helping stay on top of their payments with reminders and easy tracking."
  },
  {
    number: "200+",
    text: "Properties that can be managed effortlessly using our intuitive dashboard and automated reports."
  },
  {
    number: "100k+",
    text: "Invoices PayNoma will help generate automatically — keeping everything organized and compliant."
  }
];

export default function Metrics() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8 text-center">
        {metrics.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className="text-3xl md:text-4xl font-extrabold text-paynomaBlue">{item.number}</div>
            <p className="mt-2 text-slate-600 text-sm md:text-base">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
