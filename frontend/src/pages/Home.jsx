import React from "react";
import Navbar from "../components/ui/Navbar";
import Hero from "../components/ui/Hero";
import WhyChoose from "../components/ui/WhyChoose";
import Pricing from "../components/ui/Pricing";
import TestimonialsSection from "../components/ui/TestimonialsSection";
import BankingPartners from "../components/ui/BankingPartners";
import ScheduleDemo from "../components/ui/ScheduleDemo";
import FAQ from "../components/ui/FAQ";
import Footer from "../components/ui/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Navbar />
      <main className="max-w-7xl mx-auto">
        <Hero />
        <WhyChoose />
        <Pricing description="PayNoma platform fee is negotiable from 2% depending on number of units managed. Simple, transparent, and tailored for your property business." />
        <TestimonialsSection />
        <BankingPartners />
        <ScheduleDemo />
        <FAQ /> {/* <-- Added FAQ here */}
      </main>
      <Footer />
    </div>
  );
}
