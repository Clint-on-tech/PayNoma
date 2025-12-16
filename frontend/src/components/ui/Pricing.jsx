import React from "react";
import { CheckCircle, TrendingUp, Wallet, BarChart3 } from "lucide-react";
import ReferralCalculator from "./ReferralCalculator";

export default function Pricing({ description }) {
  return (
    <section
      id="pricing"
      className="relative py-28 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden"
    >
      {/* Decorative blurred shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl animate-pulse-slow"></div>

      <div className="relative max-w-5xl mx-auto px-6 text-center space-y-16">
        {/* Headline */}
        <h2 className="text-5xl font-extrabold tracking-tight drop-shadow-lg">
          Pricing for <span className="text-blue-300">PayNoma</span>
        </h2>

        {/* Core Description */}
        <p className="text-white text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
          {description}
        </p>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 gap-10 mt-12">
          {[{
            icon: <CheckCircle size={28} />,
            title: "Simple 2% Performance Fee",
            text: "PayNoma charges 2% of what tenants actually pay. No rent received means no fee. It's a fair model that grows with your revenue  ideal for landlords, agents, and property managers."
          },
          {
            icon: <TrendingUp size={28} />,
            title: "Scales With Your Units",
            text: "Whether you manage 1 unit or 500+, PayNoma automatically calculates cost based on portfolio activity. The more tenants pay on time, the more value you gain."
          },
          {
            icon: <Wallet size={28} />,
            title: "No Subscriptions. No Lock-ins.",
            text: "Unlike traditional systems, we don’t force expensive monthly packages. You get the full platform immediately pay only when tenants pay."
          },
          {
            icon: <BarChart3 size={28} />,
            title: "Transparent Cost Formula",
            text: "Total Monthly Fee: 2% × (Total Rent Paid by All Tenants). It's predictable, audit-friendly, and tailored to real-world property workflows."
          }].map((item, idx) => (
            <div
              key={idx}
              className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-xl text-left space-y-4 hover:bg-white/20 transition duration-300"
            >
              <div className="flex items-center gap-3 text-blue-200">
                {item.icon}
                <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
              </div>
              <p className="text-white leading-relaxed">
                {item.text.split("—").map((part, i) =>
                  i === 1 ? <span key={i} className="text-blue-300 font-semibold">—{part}</span> : part
                )}
              </p>
            </div>
          ))}
        </div>

        {/* Refer & Earn */}
        <div id="refer" className="mt-20 text-center">
          <h3 className="text-4xl font-extrabold text-white drop-shadow-lg mb-4">
            Refer & Earn, Grow With Us
          </h3>
          <p className="text-white text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            Earn passive income every month by referring landlords to PayNoma. Each time their
            tenants pay rent, you receive <strong className="text-blue-300">30% of PayNoma’s platform fee</strong>. Simple, scalable, and designed for long-term rewards.
          </p>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-xl mx-auto shadow-2xl hover:bg-white/20 transition duration-300">
            <ReferralCalculator
              defaultRent={25000}
              defaultPlatformPercent={2}
              defaultRefPercent={30} // Updated to 30%
            />
          </div>
        </div>
      </div>
    </section>
  );
}
