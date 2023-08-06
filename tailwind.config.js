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
        '300': '300px'
      },
      height: {
        '500': '500px',
        '450': '450px'
      }
    },
  },
  plugins: [],
}

