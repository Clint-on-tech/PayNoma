import React from "react";

// Logos paths — make sure they exist in /public/logos/
const partners = [
  { name: "Co‑op Bank", src: "/logos/coop-bank.png" },
  { name: "DTB", src: "/logos/dtb-bank.png" },
  { name: "Equity Bank", src: "/logos/equity-bank.png" },
  { name: "KCB", src: "/logos/kcb-bank.png" },
  { name: "MPESA", src: "/logos/mpesa.png" },
  { name: "Stanbic Bank", src: "/logos/stanbic-bank.png" },
  { name: "I&M Bank", src: "/logos/im-bank.png" },
  { name: "ABSA Bank", src: "/logos/absa-bank.png" },
  { name: "Standard Chartered", src: "/logos/standard-chartered.png" },
  { name: "Gulf African Bank", src: "/logos/gulf-african-bank.png" },
  { name: "Prime Bank", src: "/logos/prime-bank.png" },
  { name: "Housing Finance", src: "/logos/housing-finance.png" },
];

export default function BankingPartners() {
  return (
    <section id="partners" className="py-20 bg-blue-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Title */}
        <h4 className="text-4xl md:text-5xl font-extrabold text-paynomaBlue mb-6 drop-shadow-lg">
          Our Trusted Payment & Banking Partners
        </h4>

        {/* Description */}
        <p className="text-gray-200 max-w-3xl mx-auto text-lg md:text-xl mb-16">
          PayNoma works with top banks and mobile platforms to make rent collection effortless, secure, and flexible. Each partner is trusted by thousands of landlords and property managers across the country.
        </p>

        {/* Floating logos container */}
        <div className="relative w-full h-[450px] mx-auto">
          {partners.map((p, i) => {
            const top = Math.random() * 75 + 5; // avoid top 0%
            const left = Math.random() * 80 + 5; // avoid left 0%
            const size = 60 + Math.random() * 40; // uniform bigger logos
            return (
              <div
                key={i}
                className="absolute bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 shadow-lg flex items-center justify-center p-3 cursor-pointer hover:scale-110 transition-transform duration-500"
                style={{
                  top: `${top}%`,
                  left: `${left}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                }}
                title={p.name}
              >
                {p.src ? (
                  <img
                    src={p.src}
                    alt={p.name}
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <span className="text-white font-semibold">{p.name}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
