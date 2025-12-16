import React, { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = scrolled
    ? "text-slate-800 hover:text-paynomaBlue transition"
    : "text-white hover:text-paynomaBlue transition";

  return (
    <header
      className={`fixed w-full z-30 transition-all ${
        scrolled
          ? "backdrop-blur bg-white/80 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-extrabold">
            P
          </div>
          <div>
            <div className={`${scrolled ? "text-paynomaBlue" : "text-white"} font-bold text-lg`}>PayNoma</div>
            <div className={`${scrolled ? "text-gray-600" : "text-white"} text-xs -mt-0.5`}>Pay Smart. Live Easy.</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#why" className={linkClass}>Why PayNoma</a>
          <a href="#pricing" className={linkClass}>Pricing</a>
          <a href="#refer" className={linkClass}>Refer & Earn</a>
          <a href="#etims" className={linkClass}>ETIMS</a>
          <a href="#partners" className={linkClass}>Partners</a>
          <Link
            to="/login"
            className={`px-4 py-2 border rounded-md ${scrolled ? "border-gray-700 text-gray-700 hover:bg-gray-200 hover:text-paynomaBlue" : "border-white text-white hover:bg-white hover:text-paynomaBlue"}`}
          >
            Sign in
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-paynomaBlue text-white rounded-md shadow hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
        </nav>

        <div className="md:hidden">
          <button className={`${scrolled ? "text-gray-800 border-gray-700" : "text-white border-white"} p-2 rounded-md border`}>
            <Menu size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
