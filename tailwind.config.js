/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-gray': '#1d1c1c',
        'deep-black': '#080e0f',
        'background': '#060606',
        'primary': '#01f5f5',
        'primary-container': '#00ffff',
        'secondary': '#003c54',
        'secondary-container': '#066684',
        'secondary-variant': '#00506f',
        'secondary-variantus': '#00263b',
        'on-secondary': '#014a67',
        'on-secondary-container': '#4eeefe',
        'on-secondary-variant': '#2ba9ba',
        'tertiary-container': '#023f52',
      },
    },
  },
  plugins: [],
}

