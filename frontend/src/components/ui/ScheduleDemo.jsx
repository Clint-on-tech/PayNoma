import { CalendarCheck } from "lucide-react";

export default function ScheduleDemo() {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-paynomaBlue drop-shadow-lg">
          Schedule a Demo
        </h2>
        <p className="text-gray-700 text-lg md:text-xl mb-12">
          Discover how <span className="font-semibold text-paynomaBlue">PayNoma</span> can transform
          your rent management. Fill out the form below, and one of our friendly experts will guide you through a live demo tailored to your business needs.
        </p>

        <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-gray-200 transition-transform hover:scale-105 mx-auto max-w-md">
          {/* Decorative top icon */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl rotate-12 shadow-lg opacity-90 flex items-center justify-center">
            <CalendarCheck size={36} className="text-white" />
          </div>

          {/* Form */}
          <form className="flex flex-col space-y-4 mt-8">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 rounded-xl border border-gray-300 bg-white placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-paynomaBlue"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-3 rounded-xl border border-gray-300 bg-white placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-paynomaBlue"
            />
            <input
              type="text"
              placeholder="Company Name"
              className="w-full p-3 rounded-xl border border-gray-300 bg-white placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-paynomaBlue"
            />
            <button
              type="submit"
              className="w-full bg-paynomaBlue text-white font-semibold p-3 rounded-xl shadow-lg hover:bg-blue-600 transition"
            >
              Book My Demo
            </button>
          </form>

          <p className="text-gray-600 text-sm mt-4">
            No commitments. Just a personalized walkthrough to show how PayNoma can save you time and simplify rent collection.
          </p>
        </div>
      </div>
    </section>
  );
}
