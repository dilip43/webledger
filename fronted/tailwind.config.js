/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      screens: {
        '1000px': '1050px',
        '1100px': '1110px',
        '800px': '808px',
        '1300px': '1300px',
        '400px': '400px',
      },
    },
  },
  plugins: [],
};
