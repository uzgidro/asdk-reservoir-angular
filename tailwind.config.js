/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        darkGray: '#1d1c1c',
        deepBlack: '#080e0f',
        brightBlue: '#01f5f5',
      },
    },
  },
  plugins: [],
}

