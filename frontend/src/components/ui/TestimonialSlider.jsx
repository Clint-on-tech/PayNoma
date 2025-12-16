import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    quote: "PayNoma makes rent collection effortless. The dashboard is friendly and easy to use.",
    name: "Alice W.",
    role: "Property Manager"
  },
  {
    quote: "Our tenants love the reminders. No more late payments, and everything is recorded automatically.",
    name: "Brian K.",
    role: "Landlord"
  },
  {
    quote: "Referring friends was easy, and the referral rewards are a great bonus for our team.",
    name: "Catherine M.",
    role: "Finance Officer"
  }
];

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000); // change every 5s
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-6 text-center relative">
        <h4 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
          What Our Clients Say
        </h4>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="bg-paynomaBlue/5 p-8 rounded-2xl shadow-md"
          >
            <p className="text-slate-700 text-lg md:text-xl leading-relaxed mb-4">
              "{slides[current].quote}"
            </p>
            <div className="text-left">
              <div className="font-semibold text-slate-900">{slides[current].name}</div>
              <div className="text-slate-500 text-sm">{slides[current].role}</div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation dots */}
        <div className="flex justify-center gap-3 mt-6">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-3 h-3 rounded-full ${idx === current ? 'bg-paynomaBlue' : 'bg-slate-300'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
