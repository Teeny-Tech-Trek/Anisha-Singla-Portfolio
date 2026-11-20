/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,jsx}"],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        gold: '#FFFFFF',
        'gold-light': 'rgba(255,255,255,0.88)',
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
