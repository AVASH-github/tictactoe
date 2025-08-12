/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        neon: "0 0 10px 2px #4F46E5, 0 0 20px 5px #6366F1",
      },
      dropShadow: {
        neon: "0 0 10px #818CF8",
      },
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
      },
    },
  },
  plugins: [],
};
