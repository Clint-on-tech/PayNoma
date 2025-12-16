// src/components/ui/Etims.jsx
import React from "react";
import { FileText } from "lucide-react";

export default function Etims() {
  return (
    <section id="etims" className="py-20">
      <div className="max-w-5xl mx-auto px-6 text-center space-y-6">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-50">
          <FileText size={18} className="text-paynomaBlue" />
          <span className="font-medium">KRA ETIMS automation</span>
        </div>

        <h3 className="text-3xl font-extrabold">Make tax compliance effortless</h3>
        <p className="text-slate-600 max-w-3xl mx-auto">
          Paynoma auto-generates ETIMS records, invoices and payment logs. Export KRA-ready records and give your accounts
          team the correct data with one click. Reduce time spent on compliance and avoid penalties.
        </p>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {[
            { title: "Auto ETIMS export", text: "Download compliant transaction files for KRA." },
            { title: "Monthly summaries", text: "Detailed monthly reports for your accountant." },
            { title: "Secure records", text: "All documents stored and auditable for up to 7 years." },
          ].map((it, i) => (
            <div key={i} className="bg-white p-6 rounded-lg border shadow-sm text-left">
              <h4 className="font-semibold text-lg">{it.title}</h4>
              <p className="mt-2 text-slate-600">{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
