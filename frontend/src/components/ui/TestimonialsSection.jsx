import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const staticTestimonials = [
  {
    name: "Grace M.",
    role: "Property Manager",
    quote: `Before PayNoma, managing multiple properties felt overwhelming. Tracking late payments, reconciling reports, and reminding tenants manually was exhausting. 
    After switching to PayNoma, our workflow transformed. Payments are processed automatically, tenants get reminders, and the reporting is accurate and effortless. We now have time to focus on expanding our portfolio instead of chasing payments.`
  },
  {
    name: "Alan K.",
    role: "Landlord",
    quote: `PayNoma has changed the way I manage rent collection entirely. The integration with mobile payments is seamless. 
    Tenants love the simplicity, and I love that I no longer have to worry about delays or missing funds. 
    The dashboard gives me complete transparency. I can see exactly what's happening in real-time, which builds trust with my tenants and my own team.`
  },
  {
    name: "Ruth N.",
    role: "Finance Officer",
    quote: `Our finance processes used to take hours every month. Manually exporting reports, reconciling payments, and following up on arrears was frustrating. 
    With PayNoma, ETIMS exports and automated reconciliation save us hours each month. The team can focus on strategic work instead of administrative busywork. I highly recommend it to anyone managing multiple properties.`
  },
];

const sliderTestimonials = [
  {
    quote: `PayNoma makes rent collection effortless. The dashboard is friendly and intuitive, and I can monitor all properties in one place. 
    The reporting is detailed yet easy to understand, and tenants appreciate the automated reminders.`,
    name: "Alice W.",
    role: "Property Manager"
  },
  {
    quote: `No more chasing late payments! Our tenants now pay on time thanks to automated reminders, and every transaction is recorded automatically. 
    PayNoma gives me peace of mind and lets me focus on growing my rental portfolio instead of admin tasks.`,
    name: "Brian K.",
    role: "Landlord"
  },
  {
    quote: `The referral program is a game-changer. Sharing PayNoma with fellow landlords is easy, and earning rewards motivates our team. 
    It's refreshing to use a platform that rewards collaboration while keeping all rent management seamless and professional.`,
    name: "Catherine M.",
    role: "Finance Officer"
  }
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliderTestimonials.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-12">
        <h3 className="text-3xl md:text-5xl font-extrabold text-paynomaBlue">
          What Our Clients Say
        </h3>
        <p className="text-gray-700 max-w-3xl mx-auto text-lg md:text-xl">
          Hear directly from property managers, landlords, and finance officers who trust <span className="text-paynomaBlue font-semibold">PayNoma</span>. Each story illustrates how our platform transforms property management, automates rent collection, and frees up valuable time.
        </p>

        {/* Static testimonial cards */}
        <div className="mt-12 flex flex-col md:flex-row gap-6 justify-center">
          {staticTestimonials.map((t, i) => (
            <div
              key={i}
              className="flex-1 bg-gray-50 p-8 rounded-3xl shadow-lg flex flex-col gap-4 hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-paynomaBlue flex items-center justify-center text-white font-bold text-lg">
                  {t.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">{t.name}</div>
                  <div className="text-gray-500 text-sm">{t.role}</div>
                </div>
              </div>
              <div className="text-gray-800 text-base leading-relaxed overflow-y-auto max-h-72 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {t.quote}
              </div>
            </div>
          ))}
        </div>

        {/* Animated testimonial slider */}
        <div className="mt-16 max-w-3xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 1 }}
              className="bg-gray-100 p-8 rounded-3xl shadow-lg text-left"
            >
              <div className="text-gray-900 text-base md:text-lg leading-relaxed overflow-y-auto max-h-72 scrollbar-thin scrollbar-thumb-paynomaBlue scrollbar-track-gray-200">
                "{sliderTestimonials[current].quote}"
              </div>
              <div className="mt-4 text-left">
                <div className="font-semibold text-paynomaBlue">{sliderTestimonials[current].name}</div>
                <div className="text-gray-500 text-sm">{sliderTestimonials[current].role}</div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation dots */}
          <div className="flex justify-center gap-3 mt-6">
            {sliderTestimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-3 h-3 rounded-full ${
                  idx === current ? 'bg-paynomaBlue' : 'bg-gray-400/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
