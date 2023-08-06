/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif']
      },
      width: {
        '700': '700px',
        '250': '250px'
      },
      height: {
        '450': '450px',
        '400': '350px'
      }
    },
  },
  plugins: [],
}

