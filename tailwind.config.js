/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-black': '#060606',
        'dark-gray': '#1d1c1c',
        'deep-black': '#080e0f',
        'bright-blue': '#01f5f5',
      },
    },
  },
  plugins: [],
}

