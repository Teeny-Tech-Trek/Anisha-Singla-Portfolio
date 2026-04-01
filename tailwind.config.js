/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        gold: '#C9A84C',
        'gold-light': '#E8C97A',
      },
      fontFamily: {
        title: ['"Bebas Neue"', 'sans-serif'],
        body:  ['"DM Sans"', 'sans-serif'],
        script:['"Dancing Script"', 'cursive'],
      },
    },
  },
  plugins: [],
}
