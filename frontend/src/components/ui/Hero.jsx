import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import heroImg from "../../assets/hero-illustration.png";

const slides = [
  "PayNoma collects rent smoothly, ensuring you never have to chase late payments again.",
  "Track tenants, units, and payments effortlessly all from one clear and intuitive dashboard.",
  "Forget the paperwork headache: automated receipts, reconciliations, and reporting keep your cashflow predictable.",
  "Invite colleagues and refer landlords easily. Sharing PayNoma is simple and rewarding for everyone.",
  "Focus on growth while PayNoma handles reminders, receipts, and reporting silently in the background."
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${heroImg})` }}
      ></div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>

      {/* Text content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6 md:px-0">
        
        {/* Headline - vertical stacking */}
        <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-snug text-white">
          <span className="text-paynomaBlue block">PayNoma</span>
          <span className="block">Collect Rent Like a</span>
          <span className="block">Pro Effortlessly</span>
        </h1>

        {/* Sliding descriptive text */}
        <div className="relative w-full max-w-2xl h-32 overflow-hidden mt-4">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={current}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-full"
            >
              <p className="text-lg md:text-xl text-white font-medium leading-relaxed bg-black/30 p-4 rounded-lg shadow-lg">
                {slides[current]}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Action buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <a
            href="/register"
            className="inline-block px-6 py-3 rounded-lg bg-paynomaBlue text-white font-semibold shadow-lg hover:bg-blue-700 transition"
          >
            Get Started with Free Trial
          </a>
          <a
            href="#refer"
            className="inline-block px-6 py-3 rounded-lg border border-white text-white font-semibold hover:bg-white hover:text-paynomaBlue transition"
          >
            Refer & Earn
          </a>
        </div>

        {/* Slide indicators */}
        <div className="flex gap-2 mt-6">
          {slides.map((_, idx) => (
            <span
              key={idx}
              className={`w-3 h-3 rounded-full ${current === idx ? "bg-paynomaBlue" : "bg-white/50"}`}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
}
