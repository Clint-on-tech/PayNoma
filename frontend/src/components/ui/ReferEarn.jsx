// src/components/ui/ReferEarn.jsx
import React from "react";
import ReferralCalculator from "./ReferralCalculator";

export default function ReferEarn() {
  return (
    <section id="refer" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-4xl font-extrabold">Refer & Earn</h2>
          <p className="text-slate-600 max-w-lg">
            Earn by referring landlords. When a tenant pays rent, Paynoma charges a platform fee — you get a portion
            of that fee as commission. Example: if our platform fee is <strong>2%</strong> and your referral share is <strong>23%</strong>,
            you earn 23% of the 2% platform fee on each rent payment made.
          </p>

          <div className="space-y-4 text-lg text-slate-700">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center font-bold">1</div>
              <div>
                <div className="font-semibold">Landlord subscribes</div>
                <div className="text-slate-500">Client signs up and links Mpesa/bank for collections.</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center font-bold">2</div>
              <div>
                <div className="font-semibold">Tenants pay rent</div>
                <div className="text-slate-500">Paid via Mpesa or bank — recorded automatically.</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center font-bold">3</div>
              <div>
                <div className="font-semibold">You receive your share</div>
                <div className="text-slate-500">We transfer your referral commission to your account per agreement.</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <ReferralCalculator defaultRent={25000} defaultPlatformPercent={2} defaultRefPercent={23} />
        </div>
      </div>
    </section>
  );
}
