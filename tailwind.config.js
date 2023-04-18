/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {
      colors: {
        yellow: {
          300: '#F3F36D'
        },
        gray: {
          300: '#BDBDBD'
        }
      }
    },
  },
  plugins: [],
}
