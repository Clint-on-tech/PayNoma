import React from "react";
import { Facebook, Twitter, Instagram, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-3 gap-6">
        <div>
          <div className="font-bold text-lg">Paynoma</div>
          <div className="text-sm text-slate-300 mt-2">Pay Smart. Live Easy.</div>
          <div className="mt-4 flex items-center gap-3">
            <a href="#" aria-label="whatsapp" className="bg-green-500 px-3 py-2 rounded">WhatsApp</a>
            <a href="#" className="text-slate-300">support@olnet.co.ke</a>
          </div>
        </div>

        <div className="text-sm text-slate-300">
          <div className="font-semibold">Company</div>
          <ul className="mt-2 space-y-1">
            <li>About</li>
            <li>Careers</li>
            <li>Blog</li>
          </ul>
        </div>

        <div className="text-sm text-slate-300">
          <div className="font-semibold">Legal</div>
          <ul className="mt-2 space-y-1">
            <li>Terms</li>
            <li>Privacy</li>
            <li>Tax & Compliance</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-8 border-t border-slate-800 pt-6 flex items-center justify-between text-sm text-slate-400">
        <div>© {new Date().getFullYear()} Paynoma — Developed by Olnet Technologies. All rights reserved.</div>
        <div className="flex items-center gap-4">
          <Facebook size={18} />
          <Twitter size={18} />
          <Instagram size={18} />
        </div>
      </div>
    </footer>
  );
}
