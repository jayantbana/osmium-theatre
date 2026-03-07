/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#0f0f0f', // example, adjust as needed
      },
      fontFamily: {
        body: ['Inter', 'sans-serif'], // example
      },
    },
  },
  plugins: [],
}