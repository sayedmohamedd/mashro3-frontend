/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primray: '#131921',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'], // Adjust as needed
      },
    },
  },

  plugins: [],
};
