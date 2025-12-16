/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paynomaBlue: "#1E40AF",
        paynomaGold: "#FACC15",
      },
    },
  },
  plugins: [],
};
