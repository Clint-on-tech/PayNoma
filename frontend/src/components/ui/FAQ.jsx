import React, { useState } from "react";

const faqs = [
  {
    q: "Who is PayNoma?",
    a: "PayNoma is a modern rent management platform designed for landlords, property managers, and finance teams. We help you automate rent collection, track payments, and manage tenants effortlessly saving you time and stress while increasing transparency and reliability."
  },
  {
    q: "How does PayNoma charge?",
    a: "We charge a simple percentage per payment typically 2%. This means you only pay when rent is collected. No hidden fees or monthly subscriptions. Enterprise plans allow configurable rates for larger portfolios."
  },
  {
    q: "Can tenants pay from anywhere?",
    a: "Absolutely! Tenants can pay via MPESA, bank transfers, or card payments. We also plan to roll out USSD payments for added convenience. Your tenants get flexibility, and you get on-time payments."
  },
  {
    q: "Is my data secure?",
    a: "Yes. PayNoma uses industry-standard encryption and secure cloud storage. Tenant data, payment history, and financial reports are fully protected. We prioritize privacy and security so you can focus on your business."
  },
  {
    q: "What if a landlord stops using PayNoma?",
    a: "Referral earnings stop if the client cancels. We provide pro-rated billing for landlords, and all historical payment data can be exported before account closure. Transition is smooth and transparent."
  },
  {
    q: "What support can I expect?",
    a: "Our friendly support team is available to guide you at every step. Whether you need help with setup, troubleshooting, or understanding reports, we’re here to ensure your experience is seamless."
  },
  {
    q: "Can I manage multiple properties easily?",
    a: "Yes! PayNoma’s dashboard consolidates all your units, tenants, and payments in one place. You can track performance, view detailed reports, and automate reminders even across large portfolios."
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <h3 className="text-4xl font-extrabold mb-8 text-paynomaBlue text-center">
          Frequently Asked Questions
        </h3>
        <p className="text-gray-700 text-center mb-12 text-lg">
          Have questions? We've compiled answers to the most common concerns our clients have. If you still need help, our team is just a click away!
        </p>

        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="bg-white rounded-xl border shadow-sm">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex justify-between items-center p-5 focus:outline-none"
              >
                <div className="text-left">
                  <div className="font-semibold text-gray-900 text-lg">{f.q}</div>
                </div>
                <div className="text-paynomaBlue text-xl">
                  {open === i ? "▲" : "▼"}
                </div>
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-gray-700 leading-relaxed text-base">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
